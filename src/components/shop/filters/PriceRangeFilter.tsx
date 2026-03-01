"use client";

import { useState, useEffect, useCallback } from "react";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  currentMin: number | null;
  currentMax: number | null;
  onCommit: (min: number | null, max: number | null) => void;
}

export default function PriceRangeFilter({
  min,
  max,
  currentMin,
  currentMax,
  onCommit,
}: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(currentMin ?? min);
  const [localMax, setLocalMax] = useState(currentMax ?? max);

  // Sync with external state
  useEffect(() => {
    setLocalMin(currentMin ?? min);
    setLocalMax(currentMax ?? max);
  }, [currentMin, currentMax, min, max]);

  const handleCommit = useCallback(() => {
    onCommit(
      localMin > min ? localMin : null,
      localMax < max ? localMax : null
    );
  }, [localMin, localMax, min, max, onCommit]);

  if (min === max) return null;

  const pctMin = ((localMin - min) / (max - min)) * 100;
  const pctMax = ((localMax - min) / (max - min)) * 100;

  return (
    <div className="px-1">
      <div className="relative h-6 mt-2">
        {/* Track background */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-dark-border rounded-full" />
        {/* Active track */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-gold rounded-full"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={(e) => {
            const v = Number(e.target.value);
            setLocalMin(Math.min(v, localMax - 1));
          }}
          onMouseUp={handleCommit}
          onTouchEnd={handleCommit}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-dark [&::-moz-range-thumb]:cursor-pointer"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={(e) => {
            const v = Number(e.target.value);
            setLocalMax(Math.max(v, localMin + 1));
          }}
          onMouseUp={handleCommit}
          onTouchEnd={handleCommit}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-dark [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-text-secondary">
        <span>${localMin}</span>
        <span>${localMax}</span>
      </div>
    </div>
  );
}
