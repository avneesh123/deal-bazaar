"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { DbProduct } from "@/lib/supabase-types";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductTable from "@/components/admin/ProductTable";

export default function ProductsPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={`${products.length} total products`}
        actions={
          <a
            href="/admin/products/new"
            className="bg-gold text-black font-semibold rounded-lg px-4 py-2 text-sm hover:bg-gold-light transition-colors"
          >
            + New Product
          </a>
        }
      />
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ProductTable products={products} onRefresh={loadProducts} />
        )}
      </div>
    </>
  );
}
