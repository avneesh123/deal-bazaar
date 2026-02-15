"use client";

import type { AgentStep } from "@/lib/pricing/types";

interface AgentThinkingProps {
  steps: AgentStep[];
  isRunning: boolean;
}

const TOOL_LABELS: Record<string, string> = {
  search_kicksdb: "Searching KicksDB",
  get_kicksdb_prices: "Fetching price data",
  search_ebay_listings: "Searching eBay listings",
  query_internal_sales: "Checking internal sales",
};

export default function AgentThinking({ steps, isRunning }: AgentThinkingProps) {
  if (steps.length === 0) return null;

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 font-mono text-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-violet-400 text-xs uppercase tracking-wider font-semibold">
          Agent {isRunning ? "Thinking" : "Complete"}
        </span>
      </div>
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-2">
            {step.status === "running" ? (
              <div className="w-3.5 h-3.5 border border-violet-500 border-t-transparent rounded-full animate-spin mt-0.5 shrink-0" />
            ) : step.status === "error" ? (
              <span className="text-red-400 mt-0.5 shrink-0">x</span>
            ) : (
              <span className="text-emerald-400 mt-0.5 shrink-0">&gt;</span>
            )}
            <span
              className={
                step.status === "error"
                  ? "text-red-400"
                  : step.type === "tool_call"
                    ? "text-violet-300"
                    : step.type === "answer"
                      ? "text-emerald-300"
                      : "text-gray-400"
              }
            >
              {step.toolName
                ? `${TOOL_LABELS[step.toolName] ?? step.toolName}: ${step.content}`
                : step.content}
            </span>
          </div>
        ))}
        {isRunning && (
          <div className="flex items-start gap-2">
            <div className="w-3.5 h-3.5 border border-violet-500 border-t-transparent rounded-full animate-spin mt-0.5 shrink-0" />
            <span className="text-gray-500">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}
