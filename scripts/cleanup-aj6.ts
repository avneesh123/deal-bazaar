/**
 * One-off: refine the AJ6 Red Oreo product images.
 *   - Drop IMG_1958 (tissue paper bleeding through)
 *   - Drop IMG_1960 (washed-out top-down)
 *   - Reorder: IMG_1961 first (cleanest three-quarter), then IMG_1959
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

const SLUG = "air-jordan-6-retro-red-oreo-pre-owned";
const KEEP_ORDER = ["IMG_1961", "IMG_1959"]; // primary first

async function main() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, images")
    .eq("slug", SLUG)
    .single();
  if (error || !data) {
    console.error(error?.message ?? "not found");
    process.exit(1);
  }

  console.log(`${data.name}`);
  console.log(`  before: ${data.images.length} images`);

  const ordered: string[] = [];
  for (const stem of KEEP_ORDER) {
    const m = (data.images as string[]).find((u) => u.includes(stem));
    if (m) ordered.push(m);
  }

  console.log(`  after:  ${ordered.length} images`);
  for (const u of ordered) console.log(`    · ${u.split("/").pop()}`);

  const { error: upErr } = await supabase
    .from("products")
    .update({ images: ordered })
    .eq("slug", SLUG);
  if (upErr) console.error(upErr.message);
  else console.log("  ✓ updated");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
