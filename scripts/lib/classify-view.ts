/**
 * Phase 1a — Vision quality gate for sneaker catalog photos.
 *
 * Classifies each input image into one of:
 *   - catalog-good:  side / three-quarter / heel / sole / top-of-shoe
 *                    (no packing material, no box, shoe fills frame)
 *   - in-box:        shoe still inside packaging, tissue paper visible,
 *                    or box visibly framing the shot
 *   - receipt:       paper packing slip / order printout / box label only
 *   - unusable:      blurry, too dark, not a sneaker, multiple unrelated objects
 *
 * Backend: Google Gemini 2.5 Flash. Free tier (~250 req/day) covers our scale.
 * Get a key at https://aistudio.google.com/apikey and put it in .env.local
 * as GEMINI_API_KEY=...
 *
 * Usage as module:
 *     import { classifyView, classifyFolder } from "./lib/classify-view";
 *     const result = await classifyView("/path/to/img.jpg");
 *
 * Usage as CLI:
 *     npx tsx scripts/lib/classify-view.ts <folder>
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// ---------------------------------------------------------------------------
// Load .env.local for GEMINI_API_KEY
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

const GEMINI_MODEL = "gemini-2.5-flash-lite";
// Free-tier rate limit for flash-lite is 15 req/min. Sleep ~4s between calls
// so we stay safely under it even with retries.
const REQUEST_DELAY_MS = 4500;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ViewCategory = "catalog-good" | "in-box" | "receipt" | "unusable";

export interface ClassificationResult {
  category: ViewCategory;
  confidence: number; // 0-1
  reason: string; // short explanation
  view?: "side" | "three-quarter" | "top" | "heel" | "sole" | "other";
}

// ---------------------------------------------------------------------------
// Image helpers — convert HEIC, downscale, base64 encode
// ---------------------------------------------------------------------------
function toBase64Jpeg(
  imagePath: string,
  maxWidth = 768
): { base64: string; mediaType: "image/jpeg" } {
  const ext = path.extname(imagePath).toLowerCase();
  if (![".heic", ".jpg", ".jpeg", ".png"].includes(ext)) {
    throw new Error(`Unsupported image type: ${ext}`);
  }
  // Always re-encode through sips at maxWidth so we don't burn tokens on
  // multi-MB photos and HEICs become JPEG.
  const tmp = `/tmp/classify-${path.basename(imagePath, ext)}.jpg`;
  if (!fs.existsSync(tmp)) {
    execSync(
      `sips -s format jpeg "${imagePath}" --out "${tmp}" --resampleWidth ${maxWidth} 2>/dev/null`
    );
  }
  const buf = fs.readFileSync(tmp);
  return { base64: buf.toString("base64"), mediaType: "image/jpeg" };
}

// ---------------------------------------------------------------------------
// Single classification via Gemini
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are a quality gate for a sneaker e-commerce catalog. Classify each photo into ONE of these categories:

- catalog-good: a clean shot of a sneaker (or pair) suitable for a product listing. The shoe fills most of the frame. Side, three-quarter, top-of-shoe, heel, or sole views all count, as long as packing material/tissue/box is NOT visibly framing or filling the shot. A small box edge in the corner is fine. **Hangtags, price tags, and SKU stickers attached to brand-new shoes are FINE and expected — do NOT reject for these.**

- in-box: the shoes are sitting inside their open box with tissue paper, packing stuffing, box flaps, or box label visibly occupying significant frame area. These should be REJECTED for catalog.

- receipt: paper packing slip, order printout, box-label only (no shoes), or any document.

- unusable: blurry, too dark, not a sneaker, hand/foot wearing the shoe, action shot, or otherwise unsuitable.

Also identify the camera angle if catalog-good: side / three-quarter / top / heel / sole / other.`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    category: {
      type: "string",
      enum: ["catalog-good", "in-box", "receipt", "unusable"],
    },
    confidence: { type: "number" },
    reason: { type: "string" },
    view: {
      type: "string",
      enum: ["side", "three-quarter", "top", "heel", "sole", "other"],
    },
  },
  required: ["category", "confidence", "reason"],
};

export async function classifyView(
  imagePath: string
): Promise<ClassificationResult> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY not set. Get one at https://aistudio.google.com/apikey and add to .env.local"
    );
  }
  const { base64, mediaType } = toBase64Jpeg(imagePath);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      {
        role: "user",
        parts: [
          { inline_data: { mime_type: mediaType, data: base64 } },
          { text: "Classify this catalog photo." },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API ${res.status}: ${text}`);
  }
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    JSON.stringify(data);
  return JSON.parse(text) as ClassificationResult;
}

// ---------------------------------------------------------------------------
// Folder classification with a printable report
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

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imgPath = path.join(abs, file);
    if (i > 0) await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
    try {
      const r = await classifyView(imgPath);
      if (options.verbose) {
        console.log(
          `  ${file}  →  ${r.category}${r.view ? " (" + r.view + ")" : ""}  ` +
            `[${(r.confidence * 100).toFixed(0)}%]  ${r.reason}`
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

  console.log(`\nClassifying images in ${target}...\n`);
  const report = await classifyFolder(target, { verbose: true });

  console.log(`\n=== Report ===`);
  console.log(`  Total: ${report.total}`);
  console.log(`  ✓ Catalog-good: ${report.good.length}`);
  console.log(`  📦 In-box (reject): ${report.inBox.length}`);
  console.log(`  🧾 Receipts: ${report.receipts.length}`);
  console.log(`  ✗ Unusable: ${report.unusable.length}`);

  if (report.good.length) {
    console.log(`\n  Catalog-good files:`);
    for (const g of report.good) {
      console.log(`    ${g.file}${g.view ? "  (" + g.view + ")" : ""}`);
    }
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
