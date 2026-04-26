/**
 * Vision quality gate for sneaker catalog photos — backed by a remote
 * Ollama server running a vision-capable model (default qwen2.5vl:7b on
 * the EC2 VM at 10.134.9.223:11434).
 *
 * Categories:
 *   - catalog-good:  clear shot of a shoe, clean background, hangtags fine
 *   - in-box:        shoes inside an open box with packing tissue / box edges
 *   - receipt:       paper packing slip / order printout / shipping label
 *   - unusable:      blurry, dark, or not a sneaker
 *
 * Configure via env (in .env.local or process env):
 *   OLLAMA_URL=http://10.134.9.223:11434   (default)
 *   OLLAMA_MODEL=qwen2.5vl:7b              (default)
 *
 * No API keys, no daily quota — runs on our own VM.
 *
 * Usage:
 *   import { classifyView, classifyFolder } from "./lib/classify-view";
 *   const r = await classifyView("/path/to/img.jpg");
 *
 * CLI:
 *   npx tsx scripts/lib/classify-view.ts <folder>
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const raw of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const line = raw.replace(/\r/g, "");
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) {
      process.env[m[1].trim()] = m[2].trim();
    }
  }
}
loadEnv();

const OLLAMA_URL =
  process.env.OLLAMA_URL?.replace(/\/$/, "") || "http://10.134.9.223:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5vl:7b";
const REQUEST_TIMEOUT_MS = 240_000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ViewCategory = "catalog-good" | "in-box" | "receipt" | "unusable";

export interface ClassificationResult {
  category: ViewCategory;
  confidence: number; // 0-1 (estimated — Ollama doesn't return one)
  reason: string;
  view?: "side" | "three-quarter" | "top" | "heel" | "sole" | "other";
}

// ---------------------------------------------------------------------------
// Image helpers — convert HEIC, downscale, base64 encode
// ---------------------------------------------------------------------------
function toBase64Jpeg(imagePath: string, maxWidth = 384): string {
  const ext = path.extname(imagePath).toLowerCase();
  if (![".heic", ".jpg", ".jpeg", ".png"].includes(ext)) {
    throw new Error(`Unsupported image type: ${ext}`);
  }
  const tmp = `/tmp/classify-${path.basename(imagePath, ext)}.jpg`;
  if (!fs.existsSync(tmp)) {
    execSync(
      `sips -s format jpeg "${imagePath}" --out "${tmp}" --resampleWidth ${maxWidth} 2>/dev/null`
    );
  }
  return fs.readFileSync(tmp).toString("base64");
}

// ---------------------------------------------------------------------------
// Prompt — tuned to avoid the brand-new-hangtag false positive that bit us
// ---------------------------------------------------------------------------
const PROMPT = `Classify this sneaker product photo into ONE of:
- catalog-good: clear shot of a shoe/pair, clean background (white or plain). Brand-new shoes may have small white hangtags or price tags ATTACHED to the shoe — that is NORMAL and still catalog-good.
- in-box: shoes sitting INSIDE an open shoe box with cardboard box edges visible, packing paper STUFFED INSIDE the shoes, or a box label/SKU sticker.
- receipt: paper packing slip, order printout, or shipping label.
- unusable: blurry, dark, or not a sneaker.

If catalog-good, also identify the camera angle: side / three-quarter / top / heel / sole / other.

Reply with strict JSON only:
{"category":"<one of the four>","reason":"under 10 words","view":"<angle if catalog-good>"}`;

// ---------------------------------------------------------------------------
// Single classification via Ollama
// ---------------------------------------------------------------------------
export async function classifyView(
  imagePath: string
): Promise<ClassificationResult> {
  const base64 = toBase64Jpeg(imagePath);

  const body = {
    model: OLLAMA_MODEL,
    prompt: PROMPT,
    images: [base64],
    stream: false,
    format: "json",
    options: { temperature: 0 },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Ollama ${res.status}: ${text}`);
    }
    const data = (await res.json()) as { response?: string };
    const text = data.response ?? "";
    // Tolerate prose around the JSON
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`No JSON in response: ${text}`);
    const parsed = JSON.parse(match[0]) as Partial<ClassificationResult>;
    return {
      category: (parsed.category ?? "unusable") as ViewCategory,
      confidence: parsed.confidence ?? 0.85,
      reason: parsed.reason ?? "",
      view: parsed.view,
    };
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Folder classification
// ---------------------------------------------------------------------------
export interface FolderReport {
  folder: string;
  total: number;
  good: { file: string; view?: string }[];
  inBox: { file: string }[];
  receipts: { file: string }[];
  unusable: { file: string; reason: string }[];
}

const IMAGE_EXTS = new Set([".heic", ".jpg", ".jpeg", ".png"]);

export async function classifyFolder(
  folder: string,
  options: { verbose?: boolean } = {}
): Promise<FolderReport> {
  const abs = path.resolve(folder);
  const files = fs
    .readdirSync(abs)
    .filter(
      (f) =>
        IMAGE_EXTS.has(path.extname(f).toLowerCase()) && !f.startsWith(".")
    )
    .sort();

  const report: FolderReport = {
    folder: abs,
    total: files.length,
    good: [],
    inBox: [],
    receipts: [],
    unusable: [],
  };

  for (const file of files) {
    const imgPath = path.join(abs, file);
    try {
      const r = await classifyView(imgPath);
      if (options.verbose) {
        console.log(
          `  ${file}  →  ${r.category}${r.view ? " (" + r.view + ")" : ""}  ${r.reason}`
        );
      }
      switch (r.category) {
        case "catalog-good":
          report.good.push({ file, view: r.view });
          break;
        case "in-box":
          report.inBox.push({ file });
          break;
        case "receipt":
          report.receipts.push({ file });
          break;
        case "unusable":
          report.unusable.push({ file, reason: r.reason });
          break;
      }
    } catch (err) {
      console.error(
        `  ${file}: classification failed: ${(err as Error).message}`
      );
      report.unusable.push({ file, reason: "classification failed" });
    }
  }

  return report;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error("Usage: npx tsx scripts/lib/classify-view.ts <folder>");
    process.exit(1);
  }

  console.log(
    `\nClassifying images in ${target}\nUsing Ollama at ${OLLAMA_URL} model=${OLLAMA_MODEL}\n`
  );
  const report = await classifyFolder(target, { verbose: true });

  console.log(`\n=== Report ===`);
  console.log(`  Total: ${report.total}`);
  console.log(`  ✓ Catalog-good: ${report.good.length}`);
  console.log(`  📦 In-box (reject): ${report.inBox.length}`);
  console.log(`  🧾 Receipts: ${report.receipts.length}`);
  console.log(`  ✗ Unusable: ${report.unusable.length}`);

  if (report.good.length) {
    console.log(`\n  Catalog-good:`);
    for (const g of report.good)
      console.log(`    ${g.file}${g.view ? "  (" + g.view + ")" : ""}`);
  }
  if (report.inBox.length) {
    console.log(`\n  In-box (rejected):`);
    for (const f of report.inBox) console.log(`    ${f.file}`);
  }
  if (report.receipts.length) {
    console.log(`\n  Receipts:`);
    for (const f of report.receipts) console.log(`    ${f.file}`);
  }
  if (report.unusable.length) {
    console.log(`\n  Unusable:`);
    for (const f of report.unusable) console.log(`    ${f.file} — ${f.reason}`);
  }
}

const isDirectRun = process.argv[1]?.includes("classify-view");
if (isDirectRun) {
  main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
  });
}
