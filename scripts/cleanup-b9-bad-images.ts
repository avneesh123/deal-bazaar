/**
 * One-off: drop the in-box / receipt-mislabeled images that the quality
 * gate would have rejected from B9-2 (UA kids) and B9-3 (AJ1).
 *
 * Updates Supabase product.images arrays only — does not touch storage.
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

// Files the gate flagged as in-box or receipt that ended up in product.images
const REMOVE_FROM = [
  { slug: "under-armour-kids-light-blue-4y", remove: ["IMG_1942"] },
  { slug: "air-jordan-1-retro-high-white-red", remove: ["IMG_1946", "IMG_1948"] },
];

async function main() {
  for (const { slug, remove } of REMOVE_FROM) {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, images")
      .eq("slug", slug)
      .single();
    if (error || !data) {
      console.error(`✗ ${slug}: ${error?.message ?? "not found"}`);
      continue;
    }

    const before = data.images.length;
    const filtered = data.images.filter(
      (url: string) => !remove.some((r) => url.includes(r))
    );
    const dropped = before - filtered.length;

    console.log(`\n${data.name}`);
    console.log(`  before: ${before} images`);
    console.log(`  drop:   ${remove.join(", ")}`);
    console.log(`  after:  ${filtered.length} images (-${dropped})`);

    if (dropped === 0) {
      console.log("  (nothing to drop, already clean)");
      continue;
    }

    const { error: upErr } = await supabase
      .from("products")
      .update({ images: filtered })
      .eq("slug", slug);
    if (upErr) console.error(`  ✗ update failed: ${upErr.message}`);
    else console.log(`  ✓ updated`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
