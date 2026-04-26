import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

const env = readFileSync(join(process.cwd(), ".env.local"), "utf-8");
for (const raw of env.split("\n")) {
  const line = raw.replace(/\r/g, "");
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
}

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

(async () => {
  const { data, error } = await sb
    .from("products")
    .select("box_number")
    .not("box_number", "is", null);
  if (error) {
    console.error("ERR:", error.message);
    return;
  }
  const seen = new Set(data!.map((d: { box_number: string }) => d.box_number));
  const sorted = [...seen].sort();
  console.log("USED:", sorted.join(", "));
  const nums = sorted.map(
    (b) => parseInt(String(b).replace(/[^0-9]/g, "")) || 0
  );
  const max = nums.reduce((a, b) => Math.max(a, b), 0);
  console.log("NEXT:", "B" + (max + 1));
})();
