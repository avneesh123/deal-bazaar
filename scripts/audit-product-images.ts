/**
 * Audit every in-stock product's images via the Gemini quality gate.
 *
 * For each product:
 *   - Loads each image from public/images/products/<slug>/<file> (the
 *     localized 400px thumb if present, else the full image).
 *   - Classifies it via classify-view.
 *   - Records flagged images (in-box, receipt, or unusable).
 *
 * Outputs a JSON report at /tmp/db-image-audit.json that the cleanup
 * script reads.
 *
 * Usage:
 *   npx tsx scripts/audit-product-images.ts [--limit N] [--from-slug SLUG]
 */

import { createClient } from "@supabase/supabase-js";
import {
  readFileSync,
  existsSync,
  writeFileSync,
} from "fs";
import path from "path";
import { classifyView, ClassificationResult } from "./lib/classify-view";

const envPath = path.join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const raw of readFileSync(envPath, "utf-8").split("\n")) {
    const line = raw.replace(/\r/g, "");
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const REQUEST_DELAY_MS = 4500; // stay under 15 RPM on Gemini free tier

interface ImageReport {
  url: string;
  localPath?: string;
  category: ClassificationResult["category"];
  view?: string;
  reason: string;
  confidence: number;
}

interface ProductReport {
  slug: string;
  name: string;
  totalImages: number;
  goodImages: number;
  badImages: ImageReport[];
}

function urlToLocalThumb(url: string): string | null {
  // We classify off the smaller -400 thumbnail when available — saves tokens
  // and the gate doesn't need pixel-perfect detail for a category decision.
  const m = url.match(/^\/(images\/products\/[^/]+\/[^/]+)\.(jpg|jpeg|png)$/i);
  if (!m) return null;
  const stem = m[1];
  const thumb = path.join(process.cwd(), "public", `${stem}-400.jpg`);
  if (existsSync(thumb)) return thumb;
  const full = path.join(process.cwd(), "public", `${stem}.${m[2]}`);
  return existsSync(full) ? full : null;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const limit = (() => {
    const i = args.indexOf("--limit");
    return i >= 0 ? parseInt(args[i + 1], 10) : Infinity;
  })();
  const fromSlug = (() => {
    const i = args.indexOf("--from-slug");
    return i >= 0 ? args[i + 1] : null;
  })();

  console.log("📋 Loading products from Supabase...");
  const { data, error } = await supabase
    .from("products")
    .select("slug, name, images, status")
    .in("status", ["in_stock", "reserved"])
    .order("created_at", { ascending: false });
  if (error) throw error;

  let products = data!;
  if (fromSlug) {
    const idx = products.findIndex((p) => p.slug === fromSlug);
    if (idx >= 0) products = products.slice(idx);
  }
  if (products.length > limit) products = products.slice(0, limit);

  console.log(`📋 Auditing ${products.length} products...`);
  const totalCalls = products.reduce(
    (sum, p) => sum + (p.images || []).length,
    0
  );
  console.log(
    `📋 ~${totalCalls} classifications, ~${Math.ceil(
      (totalCalls * REQUEST_DELAY_MS) / 60000
    )} min at ${REQUEST_DELAY_MS}ms/req\n`
  );

  const reports: ProductReport[] = [];
  let callsMade = 0;
  let lastCallAt = 0;

  for (const p of products) {
    const images: string[] = p.images || [];
    const report: ProductReport = {
      slug: p.slug,
      name: p.name,
      totalImages: images.length,
      goodImages: 0,
      badImages: [],
    };

    for (const url of images) {
      const local = urlToLocalThumb(url);
      if (!local) {
        // Can't classify — non-local URL, just count as good (don't flag)
        report.goodImages++;
        continue;
      }

      const since = Date.now() - lastCallAt;
      if (since < REQUEST_DELAY_MS) await sleep(REQUEST_DELAY_MS - since);
      lastCallAt = Date.now();
      callsMade++;

      try {
        const r = await classifyView(local);
        if (r.category === "catalog-good") {
          report.goodImages++;
        } else {
          report.badImages.push({
            url,
            localPath: local,
            category: r.category,
            view: r.view,
            reason: r.reason,
            confidence: r.confidence,
          });
        }
      } catch (err) {
        const msg = (err as Error).message;
        // If we hit the daily quota, save what we have and stop
        if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("429")) {
          console.error(
            `\n⚠️  Hit Gemini quota at call ${callsMade}. Saving partial report.`
          );
          break;
        }
        console.error(`  ${p.slug}: ${msg}`);
      }
    }

    if (report.badImages.length > 0) {
      console.log(
        `  ⚠️  ${p.slug} — ${report.badImages.length}/${report.totalImages} flagged`
      );
      for (const b of report.badImages) {
        console.log(`     · ${b.category}: ${b.reason}`);
      }
    } else {
      console.log(
        `  ✓  ${p.slug} (${report.goodImages}/${report.totalImages} good)`
      );
    }

    reports.push(report);
  }

  const flagged = reports.filter((r) => r.badImages.length > 0);

  const out = {
    generatedAt: new Date().toISOString(),
    callsMade,
    totalProducts: reports.length,
    flaggedProducts: flagged.length,
    reports,
  };
  const outPath = "/tmp/db-image-audit.json";
  writeFileSync(outPath, JSON.stringify(out, null, 2));

  console.log(`\n=== Audit summary ===`);
  console.log(`  Products audited: ${reports.length}`);
  console.log(`  Products with flagged images: ${flagged.length}`);
  console.log(`  Total bad images: ${flagged.reduce((s, r) => s + r.badImages.length, 0)}`);
  console.log(`  Calls made: ${callsMade}`);
  console.log(`  Report: ${outPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
