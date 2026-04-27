"use client";

import { useState } from "react";
import Image from "next/image";
import { clipForIndex } from "@/components/ui/clipped-shape-image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasRealImage = images[0] && !images[0].includes("placeholder");

  return (
    <div>
      {/* Main Image — clipped to editorial shape */}
      <div className="aspect-square mb-4 relative">
        <figure
          className="absolute inset-0 bg-paper-edge overflow-hidden"
          style={{ clipPath: `url(#${clipForIndex(activeIndex)})` }}
        >
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
            <span className="absolute inset-0 flex items-center justify-center font-serif display-italic text-2xl text-ink-mute/40 text-center px-6">
              {productName}
            </span>
          )}
        </figure>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square w-20 transition-all cursor-pointer ${
                i === activeIndex
                  ? "ring-2 ring-oxblood ring-offset-2 ring-offset-paper"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${productName} image ${i + 1}`}
            >
              <span
                className="absolute inset-0 bg-paper-edge overflow-hidden"
                style={{ clipPath: `url(#${clipForIndex(i)})` }}
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
                  <span className="flex items-center justify-center h-full w-full numeral text-xs text-ink-mute">
                    {i + 1}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
