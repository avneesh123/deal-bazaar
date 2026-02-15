"use client";

import type { PricingEstimate } from "@/lib/pricing/types";

interface PricingResultProps {
  estimate: PricingEstimate;
  onApplyToProduct?: (price: number) => void;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

function ConfidenceBar({ score }: { score: number }) {
  const color =
    score >= 75
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-yellow-500"
        : "bg-red-500";
  const textColor =
    score >= 75
      ? "text-emerald-400"
      : score >= 50
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-sm">Confidence:</span>
      <div className="flex-1 bg-gray-800 rounded-full h-2.5 max-w-48">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-sm font-semibold ${textColor}`}>{score}%</span>
    </div>
  );
}

export default function PricingResult({ estimate, onApplyToProduct }: PricingResultProps) {
  const tiers = [
    {
      ...estimate.quickSell,
      icon: "⚡",
      color: "border-blue-500/30 bg-blue-500/5",
      priceColor: "text-blue-400",
      desc: "Move fast, accept lower margin",
    },
    {
      ...estimate.competitive,
      icon: "💰",
      color: "border-emerald-500/30 bg-emerald-500/5",
      priceColor: "text-emerald-400",
      desc: "Best balance of speed & profit",
    },
    {
      ...estimate.maxProfit,
      icon: "🎯",
      color: "border-amber-500/30 bg-amber-500/5",
      priceColor: "text-amber-400",
      desc: "Maximum margin, patience needed",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Parsed Product */}
      <div className="flex flex-wrap gap-2 text-xs">
        {estimate.parsed.brand && (
          <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
            {estimate.parsed.brand}
          </span>
        )}
        {estimate.parsed.model && (
          <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
            {estimate.parsed.model}
          </span>
        )}
        {estimate.parsed.colorway && (
          <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
            {estimate.parsed.colorway}
          </span>
        )}
        {estimate.parsed.size && (
          <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full">
            Size {estimate.parsed.size}
          </span>
        )}
      </div>

      {/* Price Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.label}
            className={`border rounded-xl p-5 ${tier.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{tier.icon}</span>
              <span className="text-sm font-semibold text-gray-300">
                {tier.label}
              </span>
            </div>
            <p className={`text-3xl font-bold ${tier.priceColor} mb-1`}>
              {tier.price > 0 ? fmt(tier.price) : "—"}
            </p>
            <p className="text-xs text-gray-500">{tier.timeframe}</p>
            <p className="text-xs text-gray-500 mt-1">{tier.desc}</p>
            {tier.price > 0 && onApplyToProduct && (
              <button
                onClick={() => onApplyToProduct(tier.price)}
                className="mt-3 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Apply to product &rarr;
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Confidence */}
      <ConfidenceBar score={estimate.confidence} />

      {/* Market Data Summary */}
      {(estimate.marketData.kicksdb?.prices || estimate.marketData.ebay) && (
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">
            Market Data
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {estimate.marketData.kicksdb?.prices?.last_sale != null && (
              <div>
                <p className="text-gray-500 text-xs">StockX Last Sale</p>
                <p className="text-white font-medium">
                  {fmt(estimate.marketData.kicksdb.prices.last_sale)}
                </p>
                {estimate.marketData.kicksdb.prices.last_sale_date && (
                  <p className="text-gray-600 text-xs">
                    {new Date(
                      estimate.marketData.kicksdb.prices.last_sale_date
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
            {estimate.marketData.kicksdb?.prices?.avg_sale_price_30d != null && (
              <div>
                <p className="text-gray-500 text-xs">30-Day Avg</p>
                <p className="text-white font-medium">
                  {fmt(estimate.marketData.kicksdb.prices.avg_sale_price_30d)}
                </p>
              </div>
            )}
            {estimate.marketData.kicksdb?.prices?.lowest_ask != null && (
              <div>
                <p className="text-gray-500 text-xs">Lowest Ask</p>
                <p className="text-white font-medium">
                  {fmt(estimate.marketData.kicksdb.prices.lowest_ask)}
                </p>
              </div>
            )}
            {estimate.marketData.ebay?.avgPrice != null && (
              <div>
                <p className="text-gray-500 text-xs">eBay Avg ({estimate.marketData.ebay.listingCount} listings)</p>
                <p className="text-white font-medium">
                  {fmt(estimate.marketData.ebay.avgPrice)}
                </p>
              </div>
            )}
            {estimate.marketData.internal?.avgSalePrice != null && (
              <div>
                <p className="text-gray-500 text-xs">Our Avg Sale</p>
                <p className="text-white font-medium">
                  {fmt(estimate.marketData.internal.avgSalePrice)}
                </p>
              </div>
            )}
            {estimate.marketData.internal?.avgMargin != null && (
              <div>
                <p className="text-gray-500 text-xs">Our Avg Margin</p>
                <p className="text-white font-medium">
                  {(estimate.marketData.internal.avgMargin * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reasoning */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">
          Reasoning
        </h4>
        <p className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
          {estimate.reasoning}
        </p>
        {estimate.dataSources.length > 0 && (
          <div className="flex gap-2 mt-3">
            <span className="text-xs text-gray-600">Sources:</span>
            {estimate.dataSources.map((src) => (
              <span
                key={src}
                className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded"
              >
                {src}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
