"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DbProduct, DbSale } from "@/lib/supabase-types";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";

export default function DashboardPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [sales, setSales] = useState<DbSale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [productsRes, salesRes] = await Promise.all([
        supabase.from("products").select("*"),
        supabase.from("sales").select("*, product:products(name, cost_price)").order("sale_date", { ascending: false }),
      ]);
      if (productsRes.data) setProducts(productsRes.data);
      if (salesRes.data) setSales(salesRes.data);
      setLoading(false);
    }
    load();
  }, []);

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.status === "in_stock").length;
  const soldCount = products.filter((p) => p.status === "sold").length;
  const inventoryValue = products
    .filter((p) => p.status === "in_stock")
    .reduce((sum, p) => sum + p.selling_price * p.quantity, 0);
  const totalRevenue = sales.reduce((sum, s) => sum + s.sale_price, 0);
  const totalCost = sales.reduce((sum, s) => {
    const product = s.product as unknown as { name: string; cost_price: number | null } | undefined;
    return sum + (product?.cost_price ?? 0);
  }, 0);
  const totalProfit = totalRevenue - totalCost;
  const recentSales = sales.slice(0, 5);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Overview of your inventory and sales" />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Total Products" value={totalProducts} color="blue" />
          <StatsCard label="In Stock" value={inStock} color="green" />
          <StatsCard label="Sold" value={soldCount} color="gold" />
          <StatsCard label="Inventory Value" value={fmt(inventoryValue)} color="blue" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard label="Revenue" value={fmt(totalRevenue)} color="green" />
          <StatsCard label="Cost" value={fmt(totalCost)} color="red" />
          <StatsCard
            label="Profit"
            value={fmt(totalProfit)}
            color={totalProfit >= 0 ? "green" : "red"}
          />
        </div>

        {/* Recent Sales */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Sales</h2>
          {recentSales.length === 0 ? (
            <p className="text-gray-500 text-sm">No sales recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-800">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Buyer</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => {
                    const product = sale.product as unknown as { name: string; cost_price: number | null } | undefined;
                    return (
                      <tr key={sale.id} className="border-b border-gray-800/50">
                        <td className="py-3 text-white">{product?.name ?? "Unknown"}</td>
                        <td className="py-3 text-gray-400">{sale.buyer_name ?? "—"}</td>
                        <td className="py-3 text-emerald-400">{fmt(sale.sale_price)}</td>
                        <td className="py-3 text-gray-400">
                          {new Date(sale.sale_date).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        {products.filter((p) => p.status === "in_stock" && p.quantity <= 1).length > 0 && (
          <div className="bg-gray-950 border border-yellow-500/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-yellow-400 mb-4">Low Stock Alerts</h2>
            <div className="space-y-2">
              {products
                .filter((p) => p.status === "in_stock" && p.quantity <= 1)
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between text-sm py-2 border-b border-gray-800/50"
                  >
                    <span className="text-white">{p.name}</span>
                    <span className="text-yellow-400">
                      {p.quantity} left
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
