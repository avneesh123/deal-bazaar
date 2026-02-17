"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { fetchProductBySlug } from "@/lib/products";
import ProductInfo from "./ProductInfo";
import WhatsAppCTA from "./WhatsAppCTA";
import RequestForm from "./RequestForm";

interface Props {
  product: Product;
}

/** Client wrapper that refreshes product data from Supabase (stale-while-revalidate) */
export default function ProductDetail({ product: initial }: Props) {
  const [product, setProduct] = useState(initial);

  useEffect(() => {
    fetchProductBySlug(initial.slug).then((fresh) => {
      if (fresh) setProduct(fresh);
    });
  }, [initial.slug]);

  return (
    <>
      <ProductInfo product={product} />
      <WhatsAppCTA productName={product.name} />
      <div className="border-t border-dark-border pt-6 mt-6">
        <p className="text-white font-medium mb-1">Need a different size?</p>
        <p className="text-text-secondary text-sm mb-4">
          Let us know what you&apos;re looking for and we&apos;ll try to source it.
        </p>
        <RequestForm productName={product.name} category={product.category} />
      </div>
    </>
  );
}
