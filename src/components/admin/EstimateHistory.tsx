"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DbPriceEstimate } from "@/lib/pricing/types";

interface EstimateHistoryProps {
  refreshKey: number;
  onRerun?: (query: string) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function EstimateHistory({ refreshKey, onRerun }: EstimateHistoryProps) {
  const [estimates, setEstimates] = useState<DbPriceEstimate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("price_estimates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      setEstimates((data as DbPriceEstimate[]) ?? []);
      setLoading(false);
    }
    load();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (estimates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No estimates yet. Run your first pricing analysis above.
      </div>
    );
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-800">
            <th className="p-4 font-medium">Query</th>
            <th className="p-4 font-medium">Quick</th>
            <th className="p-4 font-medium">Competitive</th>
            <th className="p-4 font-medium">Max</th>
            <th className="p-4 font-medium">Conf.</th>
            <th className="p-4 font-medium">Date</th>
            <th className="p-4 font-medium" />
          </tr>
        </thead>
        <tbody>
          {estimates.map((est) => (
            <tr
              key={est.id}
              className="border-b border-gray-800/50 hover:bg-gray-900/50"
            >
              <td className="p-4 text-white max-w-[200px] truncate">
                {est.query}
              </td>
              <td className="p-4 text-blue-400">
                {est.quick_sell_price ? fmt(est.quick_sell_price) : "—"}
              </td>
              <td className="p-4 text-emerald-400">
                {est.competitive_price ? fmt(est.competitive_price) : "—"}
              </td>
              <td className="p-4 text-amber-400">
                {est.max_profit_price ? fmt(est.max_profit_price) : "—"}
              </td>
              <td className="p-4">
                <span
                  className={
                    (est.confidence_score ?? 0) >= 75
                      ? "text-emerald-400"
                      : (est.confidence_score ?? 0) >= 50
                        ? "text-yellow-400"
                        : "text-red-400"
                  }
                >
                  {est.confidence_score ?? 0}%
                </span>
              </td>
              <td className="p-4 text-gray-400">
                {new Date(est.created_at).toLocaleDateString()}
              </td>
              <td className="p-4">
                {onRerun && (
                  <button
                    onClick={() => onRerun(est.query)}
                    className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Re-run
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
