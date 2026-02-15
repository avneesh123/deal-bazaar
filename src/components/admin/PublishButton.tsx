"use client";

import { useState } from "react";

interface PublishButtonProps {
  repo: string;
}

export default function PublishButton({ repo }: PublishButtonProps) {
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handlePublish = async () => {
    if (!confirm("This will rebuild and deploy the public site. Continue?")) return;
    setPublishing(true);
    setResult(null);

    try {
      const token = process.env.NEXT_PUBLIC_GITHUB_PAT;
      if (!token) {
        setResult({ ok: false, message: "GitHub PAT not configured. Set NEXT_PUBLIC_GITHUB_PAT in .env.local" });
        setPublishing(false);
        return;
      }

      const res = await fetch(
        `https://api.github.com/repos/${repo}/dispatches`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "publish",
          }),
        }
      );

      if (res.status === 204) {
        setResult({ ok: true, message: "Deploy triggered! Check GitHub Actions for progress." });
      } else {
        const body = await res.text();
        setResult({ ok: false, message: `Failed (${res.status}): ${body}` });
      }
    } catch (err) {
      setResult({ ok: false, message: `Error: ${err instanceof Error ? err.message : String(err)}` });
    }

    setPublishing(false);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handlePublish}
        disabled={publishing}
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
