"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DbProduct, PaymentMethod } from "@/lib/supabase-types";

interface SaleFormProps {
  products: DbProduct[];
  onSaved: () => void;
  onCancel: () => void;
  preselectedProductId?: string;
}

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "zelle", label: "Zelle" },
  { value: "venmo", label: "Venmo" },
  { value: "paypal", label: "PayPal" },
  { value: "card", label: "Card" },
  { value: "other", label: "Other" },
];

export default function SaleForm({ products, onSaved, onCancel, preselectedProductId }: SaleFormProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [productId, setProductId] = useState(preselectedProductId ?? "");
  const [salePrice, setSalePrice] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerContact, setBuyerContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const selectedProduct = products.find((p) => p.id === productId);

  const handleProductChange = (id: string) => {
    setProductId(id);
    const p = products.find((p) => p.id === id);
    if (p) setSalePrice(String(p.selling_price));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    setError("");
    setSaving(true);

    // Record the sale
    const { error: saleError } = await supabase.from("sales").insert({
      product_id: productId,
      sale_price: parseFloat(salePrice),
      buyer_name: buyerName || null,
      buyer_contact: buyerContact || null,
      payment_method: paymentMethod,
      sale_date: saleDate,
      notes: notes || null,
    });

    if (saleError) {
      setError(saleError.message);
      setSaving(false);
      return;
    }

    // Mark product as sold
    await supabase
      .from("products")
      .update({ status: "sold", quantity: 0 })
      .eq("id", productId);

    onSaved();
  };

  const profit = selectedProduct?.cost_price
    ? parseFloat(salePrice || "0") - selectedProduct.cost_price
    : null;

  const inputClass =
    "w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors";
  const labelClass = "block text-sm text-gray-400 mb-1.5";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Record Sale</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>Product</label>
            <select
              value={productId}
              onChange={(e) => handleProductChange(e.target.value)}
              required
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select a product...</option>
              {products
                .filter((p) => p.status !== "sold")
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.selling_price}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Sale Price</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                step="0.01"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {profit !== null && (
            <div className={`text-sm px-3 py-2 rounded ${profit >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              Profit: ${profit.toFixed(2)} (cost: ${selectedProduct?.cost_price?.toFixed(2)})
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Buyer Name</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className={inputClass}
                placeholder="Optional"
              />
            </div>
            <div>
              <label className={labelClass}>Buyer Contact</label>
              <input
                type="text"
                value={buyerContact}
                onChange={(e) => setBuyerContact(e.target.value)}
                className={inputClass}
                placeholder="Phone or email"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className={`${inputClass} cursor-pointer`}
            >
              {paymentMethods.map((pm) => (
                <option key={pm.value} value={pm.value}>
                  {pm.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
              placeholder="Optional"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || !productId}
              className="flex-1 bg-gold text-black font-semibold rounded-lg py-2.5 text-sm hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Recording..." : "Record Sale"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-800 text-gray-300 rounded-lg px-6 py-2.5 text-sm hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
