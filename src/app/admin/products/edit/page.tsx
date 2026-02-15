"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { DbProduct, DbReceipt } from "@/lib/supabase-types";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

interface LinkedReceipt {
  receipt: DbReceipt;
  item_name: string;
  unit_price: number;
}

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkedReceipt, setLinkedReceipt] = useState<LinkedReceipt | null>(null);
  const [allReceipts, setAllReceipts] = useState<DbReceipt[]>([]);
  const [showLinkDropdown, setShowLinkDropdown] = useState(false);
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const [productRes, receiptItemRes] = await Promise.all([
        supabase.from("products").select("*").eq("id", id).single(),
        supabase
          .from("receipt_items")
          .select("item_name, unit_price, receipt_id")
          .eq("product_id", id)
          .limit(1),
      ]);

      setProduct(productRes.data);

      if (receiptItemRes.data && receiptItemRes.data.length > 0) {
        const item = receiptItemRes.data[0];
        const { data: receipt } = await supabase
          .from("receipts")
          .select("*")
          .eq("id", item.receipt_id)
          .single();
        if (receipt) {
          setLinkedReceipt({
            receipt,
            item_name: item.item_name,
            unit_price: item.unit_price,
          });
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const loadReceipts = async () => {
    const { data } = await supabase
      .from("receipts")
      .select("*")
      .order("purchase_date", { ascending: false })
      .limit(20);
    setAllReceipts(data ?? []);
    setShowLinkDropdown(true);
  };

  const linkReceipt = async (receiptId: string) => {
    if (!product) return;
    setLinking(true);
    await supabase.from("receipt_items").insert({
      receipt_id: receiptId,
      product_id: product.id,
      item_name: product.name,
      quantity: 1,
      unit_price: product.cost_price ?? product.selling_price,
    });

    const { data: receipt } = await supabase
      .from("receipts")
      .select("*")
      .eq("id", receiptId)
      .single();
    if (receipt) {
      setLinkedReceipt({
        receipt,
        item_name: product.name,
        unit_price: product.cost_price ?? product.selling_price,
      });
    }
    setShowLinkDropdown(false);
    setLinking(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <AdminHeader title="Edit Product" />
        <div className="p-8 text-gray-400">Product not found.</div>
      </>
    );
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <>
      <AdminHeader title="Edit Product" subtitle={product.name} />
      <div className="p-8 space-y-6">
        {/* Receipt Section */}
        <div className="max-w-3xl bg-gray-950 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Linked Receipt</h3>
          {linkedReceipt ? (
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div>
                <span className="text-gray-500">Vendor:</span>{" "}
                <span className="text-white">{linkedReceipt.receipt.vendor}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>{" "}
                <span className="text-white">{fmtDate(linkedReceipt.receipt.purchase_date)}</span>
              </div>
              <div>
                <span className="text-gray-500">Amount:</span>{" "}
                <span className="text-white">{fmtCurrency(linkedReceipt.receipt.total_amount)}</span>
              </div>
              {linkedReceipt.receipt.file_url && (
                <a
                  href={linkedReceipt.receipt.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light text-sm"
                >
                  View Receipt
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">No receipt linked to this product.</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={loadReceipts}
                  disabled={linking}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Link Existing Receipt
                </button>
                <Link
                  href="/admin/receipts/new"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Upload New Receipt
                </Link>
              </div>
              {showLinkDropdown && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg max-h-48 overflow-y-auto">
                  {allReceipts.length === 0 ? (
                    <p className="p-3 text-sm text-gray-500">No receipts found.</p>
                  ) : (
                    allReceipts.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => linkReceipt(r.id)}
                        disabled={linking}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-sm border-b border-gray-800 last:border-0 cursor-pointer transition-colors"
                      >
                        <span className="text-white">{r.vendor}</span>
                        <span className="text-gray-500 ml-2">{fmtDate(r.purchase_date)}</span>
                        <span className="text-gray-400 ml-2">{fmtCurrency(r.total_amount)}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <ProductForm product={product} />
      </div>
    </>
  );
}
