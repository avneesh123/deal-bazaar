"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { DbProduct } from "@/lib/supabase-types";
import AdminHeader from "@/components/admin/AdminHeader";
import ReceiptUploader from "@/components/admin/ReceiptUploader";
import ReceiptItemForm, { type ReceiptItemData } from "@/components/admin/ReceiptItemForm";

export default function NewReceiptPage() {
  const router = useRouter();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [vendor, setVendor] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [totalAmount, setTotalAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [items, setItems] = useState<ReceiptItemData[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("name")
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    // Insert receipt
    const { data: receipt, error: receiptError } = await supabase
      .from("receipts")
      .insert({
        vendor,
        purchase_date: purchaseDate,
        total_amount: parseFloat(totalAmount) || 0,
        notes: notes || null,
        file_url: fileUrl,
      })
      .select()
      .single();

    if (receiptError) {
      setError(receiptError.message);
      setSaving(false);
      return;
    }

    // Insert line items
    if (items.length > 0) {
      const lineItems = items.map((item) => ({
        receipt_id: receipt.id,
        product_id: item.product_id || null,
        item_name: item.item_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }));

      const { error: itemsError } = await supabase.from("receipt_items").insert(lineItems);
      if (itemsError) {
        setError(itemsError.message);
        setSaving(false);
        return;
      }

      // Update cost_price on linked products
      for (const item of items) {
        if (item.product_id) {
          await supabase
            .from("products")
            .update({ cost_price: item.unit_price })
            .eq("id", item.product_id);
        }
      }
    }

    router.push("/admin/receipts");
  };

  const inputClass =
    "w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors";
  const labelClass = "block text-sm text-gray-400 mb-1.5";

  return (
    <>
      <AdminHeader title="New Receipt" subtitle="Upload a purchase receipt" />
      <div className="p-8">
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Receipt Upload */}
          <div>
            <label className={labelClass}>Receipt Image/PDF</label>
            <ReceiptUploader onUpload={setFileUrl} currentUrl={fileUrl} />
          </div>

          {/* Vendor + Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Vendor</label>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                required
                className={inputClass}
                placeholder="Store name or seller"
              />
            </div>
            <div>
              <label className={labelClass}>Purchase Date</label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Total + Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Total Amount</label>
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                step="0.01"
                required
                className={inputClass}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className={labelClass}>Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={inputClass}
                placeholder="Optional notes"
              />
            </div>
          </div>

          {/* Line Items */}
          <ReceiptItemForm items={items} onChange={setItems} products={products} />

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-gold text-black font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save Receipt"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/receipts")}
              className="bg-gray-800 text-gray-300 rounded-lg px-6 py-2.5 text-sm hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
