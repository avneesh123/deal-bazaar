"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { DbProduct, DbSale } from "@/lib/supabase-types";
import AdminHeader from "@/components/admin/AdminHeader";
import SaleForm from "@/components/admin/SaleForm";

export default function SalesPage() {
  const [sales, setSales] = useState<DbSale[]>([]);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const loadData = useCallback(async () => {
    const [salesRes, productsRes] = await Promise.all([
      supabase
        .from("sales")
        .select("*, product:products(name, cost_price, slug)")
        .order("sale_date", { ascending: false }),
      supabase.from("products").select("*").order("name"),
    ]);
    if (salesRes.data) setSales(salesRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredSales = sales.filter((s) => {
    if (dateFrom && s.sale_date < dateFrom) return false;
    if (dateTo && s.sale_date > dateTo) return false;
    return true;
  });

  const totalRevenue = filteredSales.reduce((sum, s) => sum + s.sale_price, 0);
  const totalCost = filteredSales.reduce((sum, s) => {
    const product = s.product as unknown as { name: string; cost_price: number | null } | undefined;
    return sum + (product?.cost_price ?? 0);
  }, 0);
  const totalProfit = totalRevenue - totalCost;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <>
      <AdminHeader
        title="Sales"
        subtitle={`${sales.length} total sales`}
        actions={
          <button
            onClick={() => setShowForm(true)}
            className="bg-gold text-black font-semibold rounded-lg px-4 py-2 text-sm hover:bg-gold-light transition-colors cursor-pointer"
          >
            + Record Sale
          </button>
        }
      />

      <div className="p-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-emerald-400">{fmt(totalRevenue)}</p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Cost</p>
            <p className="text-2xl font-bold text-red-400">{fmt(totalCost)}</p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-1">Profit</p>
            <p className={`text-2xl font-bold ${totalProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {fmt(totalProfit)}
            </p>
          </div>
        </div>

        {/* Date Filters */}
        <div className="flex gap-3 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
            />
          </div>
          {(dateFrom || dateTo) && (
            <button
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
              className="text-sm text-gray-400 hover:text-white cursor-pointer pb-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sales Table */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredSales.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            {sales.length === 0 ? "No sales recorded yet." : "No sales match your filters."}
          </div>
        ) : (
          <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-800">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Sale Price</th>
                  <th className="p-4 font-medium">Profit</th>
                  <th className="p-4 font-medium">Buyer</th>
                  <th className="p-4 font-medium">Payment</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => {
                  const product = sale.product as unknown as {
                    name: string;
                    cost_price: number | null;
                  } | undefined;
                  const profit = product?.cost_price
                    ? sale.sale_price - product.cost_price
                    : null;
                  return (
                    <tr key={sale.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                      <td className="p-4 text-white">{product?.name ?? "Unknown"}</td>
                      <td className="p-4 text-emerald-400">{fmt(sale.sale_price)}</td>
                      <td className="p-4">
                        {profit !== null ? (
                          <span className={profit >= 0 ? "text-emerald-400" : "text-red-400"}>
                            {fmt(profit)}
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="p-4 text-gray-400">{sale.buyer_name ?? "—"}</td>
                      <td className="p-4 text-gray-400 capitalize">{sale.payment_method}</td>
                      <td className="p-4 text-gray-400">
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

      {showForm && (
        <SaleForm
          products={products}
          onSaved={() => {
            setShowForm(false);
            loadData();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </>
  );
}
