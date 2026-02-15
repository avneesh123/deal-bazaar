"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { DbProduct, ProductStatus } from "@/lib/supabase-types";

interface ProductTableProps {
  products: DbProduct[];
  onRefresh: () => void;
}

const statusColors: Record<ProductStatus, string> = {
  in_stock: "bg-emerald-500/10 text-emerald-400",
  sold: "bg-gray-500/10 text-gray-400",
  reserved: "bg-yellow-500/10 text-yellow-400",
  unlisted: "bg-red-500/10 text-red-400",
};

const statusLabels: Record<ProductStatus, string> = {
  in_stock: "In Stock",
  sold: "Sold",
  reserved: "Reserved",
  unlisted: "Unlisted",
};

export default function ProductTable({ products, onRefresh }: ProductTableProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const handlePriceSave = async (id: string) => {
    const price = parseFloat(priceValue);
    if (isNaN(price) || price < 0) return;
    await supabase.from("products").update({ selling_price: price }).eq("id", id);
    setEditingPrice(null);
    onRefresh();
  };

  const handleStatusChange = async (id: string, status: ProductStatus) => {
    await supabase.from("products").update({ status }).eq("id", id);
    onRefresh();
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} product(s)? This cannot be undone.`)) return;
    await supabase.from("products").delete().in("id", Array.from(selected));
    setSelected(new Set());
    onRefresh();
  };

  const handleBulkStatusChange = async (status: ProductStatus) => {
    if (selected.size === 0) return;
    await supabase.from("products").update({ status }).in("id", Array.from(selected));
    setSelected(new Set());
    onRefresh();
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-gold flex-1 min-w-[200px]"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="sneakers">Sneakers</option>
          <option value="jewelry">Jewelry</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="in_stock">In Stock</option>
          <option value="sold">Sold</option>
          <option value="reserved">Reserved</option>
          <option value="unlisted">Unlisted</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-gray-950 border border-gray-700 rounded-lg px-4 py-3">
          <span className="text-sm text-gray-400">{selected.size} selected</span>
          <button
            onClick={() => handleBulkStatusChange("in_stock")}
            className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded cursor-pointer hover:bg-emerald-500/20"
          >
            Mark In Stock
          </button>
          <button
            onClick={() => handleBulkStatusChange("unlisted")}
            className="text-xs bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded cursor-pointer hover:bg-yellow-500/20"
          >
            Unlist
          </button>
          <button
            onClick={handleBulkDelete}
            className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded cursor-pointer hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-800">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Qty</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.has(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-gray-800"
                        />
                      )}
                      <div>
                        <p className="text-white font-medium truncate max-w-[250px]">
                          {product.name}
                        </p>
                        <p className="text-gray-500 text-xs">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300 capitalize">{product.category}</span>
                  </td>
                  <td className="p-4">
                    {editingPrice === product.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={priceValue}
                          onChange={(e) => setPriceValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handlePriceSave(product.id);
                            if (e.key === "Escape") setEditingPrice(null);
                          }}
                          className="w-20 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => handlePriceSave(product.id)}
                          className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingPrice(product.id);
                          setPriceValue(String(product.selling_price));
                        }}
                        className="text-white hover:text-gold transition-colors cursor-pointer"
                      >
                        {fmt(product.selling_price)}
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product.id, e.target.value as ProductStatus)}
                      className={`text-xs px-2 py-1 rounded border-0 cursor-pointer ${statusColors[product.status]} bg-transparent`}
                    >
                      {Object.entries(statusLabels).map(([k, v]) => (
                        <option key={k} value={k} className="bg-gray-900">
                          {v}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-gray-300">{product.quantity}</td>
                  <td className="p-4">
                    <Link
                      href={`/admin/products/edit?id=${product.id}`}
                      className="text-gold hover:text-gold-light text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Showing {filtered.length} of {products.length} products
      </p>
    </div>
  );
}
