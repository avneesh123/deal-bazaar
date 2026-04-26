/**
 * Read /tmp/db-image-audit.json and drop the flagged image from each
 * product's `images` array — typically the bad in-box primary. The next
 * image automatically becomes the new primary.
 *
 * Idempotent: if a product no longer has the flagged image (already
 * cleaned), it's skipped.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import path from "path";

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

interface AuditReport {
  reports: {
    slug: string;
    name: string;
    badImages: { url: string; category: string; reason: string }[];
  }[];
}

async function main() {
  const audit = JSON.parse(
    readFileSync("/tmp/db-image-audit.json", "utf-8")
  ) as AuditReport;
  const flagged = audit.reports.filter((r) => r.badImages.length > 0);

  console.log(`\nProcessing ${flagged.length} products with flagged images\n`);

  for (const r of flagged) {
    const { data, error } = await supabase
      .from("products")
      .select("id, images")
      .eq("slug", r.slug)
      .single();
    if (error || !data) {
      console.error(`✗ ${r.slug}: ${error?.message ?? "not found"}`);
      continue;
    }

    const before: string[] = data.images || [];
    const badUrls = new Set(r.badImages.map((b) => b.url));
    const filtered = before.filter((u) => !badUrls.has(u));
    const dropped = before.length - filtered.length;

    if (dropped === 0) {
      console.log(`= ${r.slug} — already clean (no matching URLs)`);
      continue;
    }
    if (filtered.length === 0) {
      console.log(`! ${r.slug} — would leave 0 images, skipping`);
      continue;
    }

    const { error: upErr } = await supabase
      .from("products")
      .update({ images: filtered })
      .eq("slug", r.slug);
    if (upErr) {
      console.error(`✗ ${r.slug}: ${upErr.message}`);
    } else {
      console.log(
        `✓ ${r.slug} — dropped ${dropped}, ${filtered.length} remaining`
      );
    }
  }

  console.log("\nDone. Run `npm run generate` then commit + push to deploy.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
