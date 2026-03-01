/**
 * Automated product image processing pipeline.
 *
 * Pipeline: Raw HEIC/JPG → Convert to JPG → Picsart API bg removal →
 *           sharp catalog post-processing (1000x1000, white bg, centered, shadow)
 *
 * Usage as CLI:
 *   npx tsx scripts/lib/process-images.ts <folder-with-images>
 *
 * Usage as module:
 *   import { processFolder } from "./scripts/lib/process-images";
 *   const catalogPaths = await processFolder("/path/to/batch/1");
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const PICSART_ENDPOINT = "https://api.picsart.io/tools/1.0/removebg";
const CANVAS_SIZE = 1000;
const PADDING_PCT = 0.1;
const SHADOW_OFFSET = { x: 8, y: 8 };
const SHADOW_BLUR = 15;
const SHADOW_OPACITY = 0.2; // 0-1

function getApiKey(): string {
  // Try loading from .env.local if not already in process.env
  if (!process.env.PICSART_API_KEY) {
    try {
      const envPath = path.resolve(
        process.cwd(),
        ".env.local"
      );
      const envContent = fs.readFileSync(envPath, "utf-8");
      for (const line of envContent.split("\n")) {
        const match = line.trim().match(/^PICSART_API_KEY=(.+)$/);
        if (match) {
          process.env.PICSART_API_KEY = match[1].trim();
          break;
        }
      }
    } catch {
      // .env.local not found
    }
  }
  const key = process.env.PICSART_API_KEY;
  if (!key) {
    throw new Error(
      "PICSART_API_KEY not set. Add it to .env.local or set as environment variable."
    );
  }
  return key;
}

// ---------------------------------------------------------------------------
// Step 1: Convert HEIC → JPG using macOS sips
// ---------------------------------------------------------------------------

export function convertHeicToJpg(heicPath: string): string {
  const dir = path.dirname(heicPath);
  const name = path.basename(heicPath, path.extname(heicPath));
  const jpgPath = path.join(dir, `${name}.jpg`);

  if (fs.existsSync(jpgPath)) {
    console.log(`  [skip] ${name}.jpg already exists`);
    return jpgPath;
  }

  console.log(`  [convert] ${path.basename(heicPath)} → JPG`);
  execSync(
    `sips -s format jpeg "${heicPath}" --out "${jpgPath}" 2>/dev/null`
  );
  return jpgPath;
}

// ---------------------------------------------------------------------------
// Step 2: Remove background via Picsart API
// ---------------------------------------------------------------------------

export async function removeBackground(imagePath: string): Promise<Buffer> {
  const apiKey = getApiKey();
  const imageBuffer = fs.readFileSync(imagePath);
  const fileName = path.basename(imagePath);

  console.log(`  [picsart] Removing background: ${fileName}`);

  const formData = new FormData();
  formData.append(
    "image",
    new Blob([imageBuffer], { type: "image/jpeg" }),
    fileName
  );
  formData.append("output_type", "cutout");
  formData.append("format", "PNG");

  const response = await fetch(PICSART_ENDPOINT, {
    method: "POST",
    headers: {
      "x-picsart-api-key": apiKey,
      accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Picsart API error ${response.status}: ${text}`
    );
  }

  const json = (await response.json()) as {
    status: string;
    data: { url: string };
  };

  if (json.status !== "success" || !json.data?.url) {
    throw new Error(`Picsart API unexpected response: ${JSON.stringify(json)}`);
  }

  // Download the result image
  console.log(`  [picsart] Downloading result...`);
  const imgResponse = await fetch(json.data.url);
  if (!imgResponse.ok) {
    throw new Error(`Failed to download result: ${imgResponse.status}`);
  }

  return Buffer.from(await imgResponse.arrayBuffer());
}

// ---------------------------------------------------------------------------
// Step 3: Catalog-ready post-processing with sharp
//   - Auto-trim transparent pixels
//   - Center on 1000x1000 white canvas with padding
//   - Add subtle drop shadow
// ---------------------------------------------------------------------------

export async function makeCatalogReady(
  transparentPngBuffer: Buffer,
  outputPath: string
): Promise<string> {
  console.log(`  [catalog] Processing → ${path.basename(outputPath)}`);

  // 1. Trim transparent pixels
  const trimmed = await sharp(transparentPngBuffer)
    .trim()
    .toBuffer({ resolveWithObject: true });

  const { width: tw, height: th } = trimmed.info;

  // 2. Calculate fit dimensions with padding
  const pad = Math.round(CANVAS_SIZE * PADDING_PCT);
  const maxDim = CANVAS_SIZE - 2 * pad;
  const scale = Math.min(maxDim / tw, maxDim / th);
  const newW = Math.round(tw * scale);
  const newH = Math.round(th * scale);

  // Resize the trimmed subject
  const resized = await sharp(trimmed.data)
    .resize(newW, newH, { fit: "fill" })
    .ensureAlpha()
    .png()
    .toBuffer();

  // 3. Create shadow: black pixels with subject's alpha scaled by opacity, then blur
  const { data: subjectPixels, info: subjectInfo } = await sharp(resized)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const shadowPixels = Buffer.alloc(subjectInfo.width * subjectInfo.height * 4);
  for (let i = 0; i < subjectInfo.width * subjectInfo.height; i++) {
    // R=0, G=0, B=0, A = source alpha * shadow opacity
    shadowPixels[i * 4 + 3] = Math.round(
      subjectPixels[i * 4 + 3] * SHADOW_OPACITY
    );
  }

  const shadow = await sharp(shadowPixels, {
    raw: {
      width: subjectInfo.width,
      height: subjectInfo.height,
      channels: 4,
    },
  })
    .blur(Math.max(SHADOW_BLUR, 1))
    .png()
    .toBuffer();

  // 4. Compose: white canvas + shadow (offset) + subject (centered)
  // Create white canvas as a buffer first, then composite onto it
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
  console.log(`  [catalog] Done (${sizeKB}KB)`);
  return outputPath;
}

// ---------------------------------------------------------------------------
// Orchestrator: Process all images in a folder
// ---------------------------------------------------------------------------

const IMAGE_EXTS = new Set([".heic", ".jpg", ".jpeg", ".png"]);

export async function processFolder(folderPath: string): Promise<string[]> {
  const absFolder = path.resolve(folderPath);
  if (!fs.existsSync(absFolder)) {
    throw new Error(`Folder not found: ${absFolder}`);
  }

  // Create catalog output directory
  const catalogDir = path.join(absFolder, "catalog");
  fs.mkdirSync(catalogDir, { recursive: true });

  // Find all image files (non-recursive, just the folder)
  const files = fs.readdirSync(absFolder).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext) && !f.startsWith(".");
  });

  if (files.length === 0) {
    console.log(`No images found in ${absFolder}`);
    return [];
  }

  console.log(`\nProcessing ${files.length} images in ${absFolder}\n`);
  const results: string[] = [];

  for (const file of files) {
    const filePath = path.join(absFolder, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, path.extname(file));
    const catalogPath = path.join(catalogDir, `${baseName}.png`);

    // Skip if already processed
    if (fs.existsSync(catalogPath)) {
      console.log(`[skip] ${baseName}.png already in catalog/`);
      results.push(catalogPath);
      continue;
    }

    try {
      // Step 1: Convert HEIC if needed
      let jpgPath = filePath;
      if (ext === ".heic") {
        jpgPath = convertHeicToJpg(filePath);
      }

      // Step 2: Remove background via Picsart
      const transparentPng = await removeBackground(jpgPath);

      // Step 3: Make catalog-ready
      await makeCatalogReady(transparentPng, catalogPath);

      results.push(catalogPath);
      console.log(`  ✓ ${baseName} complete\n`);
    } catch (err) {
      console.error(`  ✗ ${baseName} failed: ${(err as Error).message}\n`);
    }
  }

  console.log(
    `\nDone! ${results.length}/${files.length} images processed → ${catalogDir}/`
  );
  return results;
}

/**
 * Process all numbered subfolders in a batch directory.
 * Scans for subfolders named 1/, 2/, 3/, etc. and processes images in each.
 * Returns a map of subfolder name → catalog image paths.
 */
export async function processBatch(
  batchDir: string
): Promise<Map<string, string[]>> {
  const absDir = path.resolve(batchDir);
  const results = new Map<string, string[]>();

  // Find numbered subfolders
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  const subfolders = entries
    .filter((e) => e.isDirectory() && /^\d+$/.test(e.name))
    .sort((a, b) => Number(a.name) - Number(b.name));

  if (subfolders.length === 0) {
    // No numbered subfolders — try processing the folder itself
    console.log("No numbered subfolders found, processing folder directly...");
    const paths = await processFolder(absDir);
    results.set(".", paths);
    return results;
  }

  console.log(
    `Found ${subfolders.length} shoe subfolders: ${subfolders.map((s) => s.name).join(", ")}\n`
  );

  for (const sub of subfolders) {
    console.log(`\n--- Shoe ${sub.name} ---`);
    const subPath = path.join(absDir, sub.name);
    const paths = await processFolder(subPath);
    results.set(sub.name, paths);
  }

  return results;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error(
      "Usage: npx tsx scripts/lib/process-images.ts <batch-folder-or-subfolder>"
    );
    console.error(
      "  e.g.: npx tsx scripts/lib/process-images.ts ~/Downloads/deal-bazaar/Sneakers/Batch8"
    );
    process.exit(1);
  }

  const resolved = path.resolve(target);

  // Check if this is a batch directory (has numbered subfolders) or a single subfolder
  const entries = fs.readdirSync(resolved, { withFileTypes: true });
  const hasNumberedSubfolders = entries.some(
    (e) => e.isDirectory() && /^\d+$/.test(e.name)
  );

  if (hasNumberedSubfolders) {
    await processBatch(resolved);
  } else {
    await processFolder(resolved);
  }
}

// Run CLI if executed directly
const isDirectRun =
  process.argv[1]?.includes("process-images") ?? false;
if (isDirectRun) {
  main().catch((err) => {
    console.error("Fatal:", err.message);
    process.exit(1);
  });
}
