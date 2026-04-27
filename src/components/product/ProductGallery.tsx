"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasRealImage = images[0] && !images[0].includes("placeholder");

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-square bg-paper-deep border border-ink/10 overflow-hidden mb-4 flex items-center justify-center relative">
        {hasRealImage ? (
          <Image
            src={images[activeIndex] || images[0]}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <span className="font-serif display-italic text-2xl text-ink-mute/40 text-center px-6">
            {productName}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square w-20 bg-paper-deep border overflow-hidden transition-all cursor-pointer ${
                i === activeIndex
                  ? "border-oxblood ring-1 ring-oxblood/30"
                  : "border-ink/15 hover:border-ink/40"
              }`}
            >
              {hasRealImage ? (
                <Image
                  src={img}
                  alt={`${productName} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <span className="flex items-center justify-center h-full numeral text-xs text-ink-mute">
                  {i + 1}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
