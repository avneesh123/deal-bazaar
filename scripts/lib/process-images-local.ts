/**
 * Local-only catalog pipeline (no Picsart).
 *
 * Uses @imgly/background-removal-node for offline AI bg removal,
 * then the same sharp post-processing as process-images.ts.
 *
 * CLI:
 *   npx tsx scripts/lib/process-images-local.ts <folder>
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";
import { removeBackground } from "@imgly/background-removal-node";
import { classifyView } from "./classify-view";

const CANVAS_SIZE = 1000;
const PADDING_PCT = 0.1;
const SHADOW_OFFSET = { x: 8, y: 8 };
const SHADOW_BLUR = 15;
const SHADOW_OPACITY = 0.2;

const IMAGE_EXTS = new Set([".heic", ".jpg", ".jpeg", ".png"]);

async function convertHeicToJpg(heicPath: string): Promise<string> {
  const dir = path.dirname(heicPath);
  const name = path.basename(heicPath, path.extname(heicPath));
  const jpgPath = path.join(dir, `${name}.jpg`);
  if (fs.existsSync(jpgPath)) return jpgPath;
  console.log(`  [convert] ${path.basename(heicPath)} → JPG (with EXIF auto-rotate)`);
  // sips converts HEIC but preserves EXIF orientation as a flag rather than
  // baking it in. Imgly's bg remover ignores EXIF orientation. So we convert
  // via sips then re-encode with sharp + auto-rotate, baking orientation in.
  const tmp = jpgPath + ".tmp.jpg";
  execSync(`sips -s format jpeg "${heicPath}" --out "${tmp}" 2>/dev/null`);
  await sharp(tmp).rotate().jpeg({ quality: 92 }).toFile(jpgPath);
  fs.unlinkSync(tmp);
  return jpgPath;
}

async function bgRemoveLocal(imagePath: string): Promise<Buffer> {
  console.log(`  [imgly] removing bg locally: ${path.basename(imagePath)}`);
  const blob = await removeBackground(imagePath, {
    output: { format: "image/png", quality: 0.95 },
  });
  return Buffer.from(await blob.arrayBuffer());
}

async function makeCatalogReady(
  transparentPng: Buffer,
  outputPath: string
): Promise<string> {
  console.log(`  [catalog] composing → ${path.basename(outputPath)}`);

  const trimmed = await sharp(transparentPng)
    .trim()
    .toBuffer({ resolveWithObject: true });
  const { width: tw, height: th } = trimmed.info;

  const pad = Math.round(CANVAS_SIZE * PADDING_PCT);
  const maxDim = CANVAS_SIZE - 2 * pad;
  const scale = Math.min(maxDim / tw, maxDim / th);
  const newW = Math.round(tw * scale);
  const newH = Math.round(th * scale);

  const resized = await sharp(trimmed.data)
    .resize(newW, newH, { fit: "fill" })
    .ensureAlpha()
    .png()
    .toBuffer();

  const { data: subjPx, info: subjInfo } = await sharp(resized)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const shadowPx = Buffer.alloc(subjInfo.width * subjInfo.height * 4);
  for (let i = 0; i < subjInfo.width * subjInfo.height; i++) {
    shadowPx[i * 4 + 3] = Math.round(
      subjPx[i * 4 + 3] * SHADOW_OPACITY
    );
  }

  const shadow = await sharp(shadowPx, {
    raw: { width: subjInfo.width, height: subjInfo.height, channels: 4 },
  })
    .blur(Math.max(SHADOW_BLUR, 1))
    .png()
    .toBuffer();

  const whiteCanvas = await sharp({
    create: {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      channels: 3 as const,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .png()
    .toBuffer();

  await sharp(whiteCanvas)
    .composite([
      {
        input: shadow,
        top: Math.round((CANVAS_SIZE - newH) / 2 + SHADOW_OFFSET.y),
        left: Math.round((CANVAS_SIZE - newW) / 2 + SHADOW_OFFSET.x),
      },
      {
        input: resized,
        top: Math.round((CANVAS_SIZE - newH) / 2),
        left: Math.round((CANVAS_SIZE - newW) / 2),
      },
    ])
    .png()
    .toFile(outputPath);

  const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`  [catalog] done (${sizeKB}KB)`);
  return outputPath;
}

export interface ProcessOptions {
  /** When true, skip the Gemini quality gate (for legacy / debugging). */
  skipGate?: boolean;
}

export async function processFolderLocal(
  folder: string,
  options: ProcessOptions = {}
): Promise<string[]> {
  const abs = path.resolve(folder);
  const out = path.join(abs, "catalog");
  fs.mkdirSync(out, { recursive: true });

  const files = fs
    .readdirSync(abs)
    .filter(
      (f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()) && !f.startsWith(".")
    );

  if (!files.length) {
    console.log("No images.");
    return [];
  }

  console.log(`\nProcessing ${files.length} images in ${abs}\n`);
  const useGate = !options.skipGate && !!process.env.GEMINI_API_KEY;
  if (!useGate && !options.skipGate) {
    console.log("  (no GEMINI_API_KEY — skipping quality gate)\n");
  }

  const results: string[] = [];
  const stats = { processed: 0, skipped_existing: 0, gated_out: 0, failed: 0 };

  for (const file of files) {
    const filePath = path.join(abs, file);
    const ext = path.extname(file).toLowerCase();
    const stem = path.basename(file, path.extname(file));
    const outPath = path.join(out, `${stem}.png`);
    if (fs.existsSync(outPath)) {
      console.log(`[skip] ${stem}.png exists`);
      results.push(outPath);
      stats.skipped_existing++;
      continue;
    }
    try {
      if (useGate) {
        const verdict = await classifyView(filePath);
        if (verdict.category !== "catalog-good") {
          console.log(
            `  [gate] reject ${file} → ${verdict.category} (${verdict.reason})`
          );
          stats.gated_out++;
          continue;
        }
        console.log(`  [gate] accept ${file} (${verdict.view ?? "view?"})`);
      }
      const jpg = ext === ".heic" ? await convertHeicToJpg(filePath) : filePath;
      const noBg = await bgRemoveLocal(jpg);
      await makeCatalogReady(noBg, outPath);
      results.push(outPath);
      stats.processed++;
      console.log(`  ✓ ${stem} done\n`);
    } catch (e) {
      stats.failed++;
      console.error(`  ✗ ${stem}: ${(e as Error).message}\n`);
    }
  }

  console.log(
    `\nDone: ${stats.processed} processed, ${stats.skipped_existing} cached, ` +
      `${stats.gated_out} gated out, ${stats.failed} failed`
  );
  return results;
}

const isDirectRun = process.argv[1]?.includes("process-images-local");
if (isDirectRun) {
  const target = process.argv[2];
  if (!target) {
    console.error("Usage: npx tsx scripts/lib/process-images-local.ts <folder>");
    process.exit(1);
  }
  const skipGate = process.argv.includes("--no-gate");
  processFolderLocal(target, { skipGate }).catch((err) => {
    console.error("Fatal:", err.message);
    process.exit(1);
  });
}
