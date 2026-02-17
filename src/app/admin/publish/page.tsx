"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminHeader from "@/components/admin/AdminHeader";
import PublishButton from "@/components/admin/PublishButton";

export default function PublishPage() {
  const [stats, setStats] = useState({ total: 0, inStock: 0, sold: 0, unlisted: 0 });

  useEffect(() => {
    supabase
      .from("products")
      .select("status")
      .then(({ data }) => {
        if (!data) return;
        setStats({
          total: data.length,
          inStock: data.filter((p) => p.status === "in_stock").length,
          sold: data.filter((p) => p.status === "sold").length,
          unlisted: data.filter((p) => p.status === "unlisted").length,
        });
      });
  }, []);

  return (
    <>
      <AdminHeader
        title="Publish"
        subtitle="Deploy changes to the live site"
      />
      <div className="p-8 space-y-8 max-w-2xl">
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">How Publishing Works</h2>
          <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
            <li>Click &quot;Publish&quot; to trigger a GitHub Actions rebuild</li>
            <li>The build script fetches all in-stock products from Supabase</li>
            <li>It generates a new <code className="text-gold">products.ts</code> file</li>
            <li>Next.js builds static pages for each product</li>
            <li>The site deploys to Cloudflare Pages</li>
          </ol>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Current Inventory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">{stats.inStock}</p>
              <p className="text-xs text-gray-500">In Stock</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-400">{stats.sold}</p>
              <p className="text-xs text-gray-500">Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">{stats.unlisted}</p>
              <p className="text-xs text-gray-500">Unlisted</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Only &quot;In Stock&quot; products will appear on the public site after publishing.
          </p>
        </div>

        <PublishButton repo="avneesh123/deal-bazaar" />
      </div>
    </>
  );
}
