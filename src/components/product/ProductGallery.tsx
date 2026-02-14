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
      <div className="aspect-square rounded-sm bg-dark-card border border-dark-border overflow-hidden mb-4 flex items-center justify-center relative">
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
          <span className="text-text-secondary/30 text-sm uppercase tracking-widest">
            {productName}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square w-20 rounded-sm bg-dark-card border overflow-hidden transition-all cursor-pointer ${
                i === activeIndex
                  ? "border-gold"
                  : "border-dark-border hover:border-gold/50"
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
                <span className="flex items-center justify-center h-full text-xs text-text-secondary/30">
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
