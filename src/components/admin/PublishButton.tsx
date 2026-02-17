"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PublishButtonProps {
  repo: string;
}

export default function PublishButton({ repo }: PublishButtonProps) {
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [token, setToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);
  const [savingToken, setSavingToken] = useState(false);

  // Load existing token on mount
  useEffect(() => {
    supabase
      .from("api_keys")
      .select("api_key")
      .eq("service", "github")
      .single()
      .then(({ data }) => {
        if (data?.api_key) {
          setToken(data.api_key);
          setTokenSaved(true);
        }
      });
  }, []);

  const saveToken = async () => {
    if (!token.trim()) return;
    setSavingToken(true);
    // Upsert: update if exists, insert if not
    const { error } = await supabase
      .from("api_keys")
      .upsert(
        { service: "github", api_key: token.trim(), config: {} },
        { onConflict: "service" }
      );
    if (error) {
      setResult({ ok: false, message: `Failed to save token: ${error.message}` });
    } else {
      setTokenSaved(true);
      setResult({ ok: true, message: "GitHub token saved." });
    }
    setSavingToken(false);
  };

  const handlePublish = async () => {
    if (!confirm("This will rebuild and deploy the public site. Continue?")) return;
    setPublishing(true);
    setResult(null);

    try {
      // Fetch token from api_keys
      const { data } = await supabase
        .from("api_keys")
        .select("api_key")
        .eq("service", "github")
        .single();
      const pat = data?.api_key;

      if (!pat) {
        setResult({ ok: false, message: "GitHub token not configured. Enter it above and save." });
        setPublishing(false);
        return;
      }

      const res = await fetch(
        `https://api.github.com/repos/${repo}/dispatches`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${pat}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "publish",
          }),
        }
      );

      if (res.status === 204) {
        setResult({ ok: true, message: "Deploy triggered! Site will update in ~1-2 minutes." });
      } else {
        const body = await res.text();
        setResult({ ok: false, message: `Failed (${res.status}): ${body}` });
      }
    } catch (err) {
      setResult({ ok: false, message: `Error: ${err instanceof Error ? err.message : String(err)}` });
    }

    setPublishing(false);
  };

  const inputClass =
    "w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="space-y-6">
      {/* GitHub Token Setup */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold text-white">GitHub Token</h2>
        <p className="text-xs text-gray-500">
          A Personal Access Token with <code className="text-gold">repo</code> scope, used to trigger deploys.
        </p>
        <div className="flex gap-2">
          <input
            type="password"
            value={token}
            onChange={(e) => { setToken(e.target.value); setTokenSaved(false); }}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={saveToken}
            disabled={savingToken || !token.trim() || tokenSaved}
            className="bg-gray-800 hover:bg-gray-700 text-gold text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            {savingToken ? "Saving..." : tokenSaved ? "Saved" : "Save Token"}
          </button>
        </div>
      </div>

      {/* Publish */}
      <button
        onClick={handlePublish}
        disabled={publishing || !tokenSaved}
        className="bg-gold text-black font-semibold rounded-lg px-8 py-3 text-sm hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
      >
        {publishing ? "Triggering Deploy..." : "Publish to Live Site"}
      </button>

      {result && (
        <div
          className={`text-sm rounded-lg px-4 py-3 ${
            result.ok
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}
