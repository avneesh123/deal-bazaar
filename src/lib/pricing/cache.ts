import { supabase } from "@/lib/supabase";

const DEFAULT_TTL_HOURS: Record<string, number> = {
  kicksdb: 6,
  ebay: 1,
};

export async function getCachedData<T>(
  source: string,
  key: string
): Promise<T | null> {
  const { data } = await supabase
    .from("market_data_cache")
    .select("data, expires_at")
    .eq("source", source)
    .eq("source_key", key)
    .single();

  if (!data) return null;

  // Check if expired
  if (new Date(data.expires_at) < new Date()) {
    // Delete expired entry
    await supabase
      .from("market_data_cache")
      .delete()
      .eq("source", source)
      .eq("source_key", key);
    return null;
  }

  return data.data as T;
}

export async function setCachedData(
  source: string,
  key: string,
  data: unknown,
  ttlHours?: number
): Promise<void> {
  const hours = ttlHours ?? DEFAULT_TTL_HOURS[source] ?? 6;
  const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

  await supabase.from("market_data_cache").upsert(
    {
      source,
      source_key: key,
      data,
      fetched_at: new Date().toISOString(),
      expires_at: expiresAt,
    },
    { onConflict: "source,source_key" }
  );
}
