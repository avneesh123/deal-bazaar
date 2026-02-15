"use client";

import { useState, useCallback } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AgentThinking from "@/components/admin/AgentThinking";
import PricingResult from "@/components/admin/PricingResult";
import EstimateHistory from "@/components/admin/EstimateHistory";
import { runPricingAgent } from "@/lib/pricing/agent";
import type { PricingEstimate, AgentStep } from "@/lib/pricing/types";

export default function PricingPage() {
  const [query, setQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [estimate, setEstimate] = useState<PricingEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const handleAnalyze = useCallback(
    async (searchQuery?: string) => {
      const q = (searchQuery ?? query).trim();
      if (!q || isRunning) return;

      setIsRunning(true);
      setSteps([]);
      setEstimate(null);
      setError(null);

      try {
        const result = await runPricingAgent(q, (step) => {
          setSteps((prev) => {
            // Update existing step if same id, otherwise append
            const idx = prev.findIndex((s) => s.id === step.id);
            if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = step;
              return updated;
            }
            return [...prev, step];
          });
        });
        setEstimate(result);
        setRefreshKey((k) => k + 1);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setIsRunning(false);
      }
    },
    [query, isRunning]
  );

  return (
    <>
      <AdminHeader
        title="AI Pricing Intelligence"
        subtitle="Get market-based pricing recommendations powered by Claude"
        actions={
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Settings
          </button>
        }
      />

      <div className="p-8 space-y-6 max-w-4xl">
        {/* Settings Panel */}
        {showSettings && <ApiKeySettings onClose={() => setShowSettings(false)} />}

        {/* Search Input */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
          <label className="block text-sm text-gray-400 mb-3">
            What are you pricing?
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="e.g. Adidas Campus 00s Dark Grey Kids size 12K"
              disabled={isRunning}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => handleAnalyze()}
              disabled={!query.trim() || isRunning}
              className="bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-3 text-sm transition-colors cursor-pointer"
            >
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing
                </div>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Include brand, model, colorway, and size for best results
          </p>
        </div>

        {/* Agent Thinking */}
        {steps.length > 0 && (
          <AgentThinking steps={steps} isRunning={isRunning} />
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {estimate && <PricingResult estimate={estimate} />}

        {/* History */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Estimates
          </h3>
          <EstimateHistory
            refreshKey={refreshKey}
            onRerun={(q) => {
              setQuery(q);
              handleAnalyze(q);
            }}
          />
        </div>
      </div>
    </>
  );
}

// Inline API key settings component
function ApiKeySettings({ onClose }: { onClose: () => void }) {
  const [anthropic, setAnthropic] = useState("");
  const [kicksdb, setKicksdb] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMsg("");

    const { supabase } = await import("@/lib/supabase");

    const entries = [
      { service: "anthropic", key: anthropic },
      { service: "kicksdb", key: kicksdb },
    ].filter((e) => e.key.trim());

    for (const entry of entries) {
      const { error } = await supabase.from("api_keys").upsert(
        {
          service: entry.service,
          api_key: entry.key.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "service" }
      );
      if (error) {
        setMsg(`Error saving ${entry.service}: ${error.message}`);
        setSaving(false);
        return;
      }
    }

    setMsg("Saved!");
    setSaving(false);
    setAnthropic("");
    setKicksdb("");
  };

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">API Keys</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-sm cursor-pointer"
        >
          Close
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Keys are stored encrypted in Supabase. Leave blank to keep existing value.
      </p>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Anthropic API Key (required)
          </label>
          <input
            type="password"
            value={anthropic}
            onChange={(e) => setAnthropic(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            KicksDB API Key (optional — enables market data)
          </label>
          <input
            type="password"
            value={kicksdb}
            onChange={(e) => setKicksdb(e.target.value)}
            placeholder="kicks_..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
          />
          <p className="text-xs text-gray-600 mt-1">
            Get a free API key at{" "}
            <a
              href="https://kicks.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline"
            >
              kicks.dev
            </a>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={saving || (!anthropic.trim() && !kicksdb.trim())}
          className="bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer"
        >
          {saving ? "Saving..." : "Save Keys"}
        </button>
        {msg && (
          <span
            className={`text-sm ${msg.startsWith("Error") ? "text-red-400" : "text-emerald-400"}`}
          >
            {msg}
          </span>
        )}
      </div>
    </div>
  );
}
