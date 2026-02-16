"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DbReceipt } from "@/lib/supabase-types";
import AdminHeader from "@/components/admin/AdminHeader";

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<DbReceipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("receipts")
      .select("*")
      .order("purchase_date", { ascending: false })
      .then(({ data }) => {
        if (data) setReceipts(data);
        setLoading(false);
      });
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  return (
    <>
      <AdminHeader
        title="Receipts"
        subtitle={`${receipts.length} purchase receipts`}
        actions={
          <a
            href="/admin/receipts/new"
            className="bg-gold text-black font-semibold rounded-lg px-4 py-2 text-sm hover:bg-gold-light transition-colors"
          >
            + New Receipt
          </a>
        }
      />
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : receipts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No receipts yet.</p>
            <a
              href="/admin/receipts/new"
              className="text-gold hover:text-gold-light text-sm"
            >
              Upload your first receipt
            </a>
          </div>
        ) : (
          <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-800">
                  <th className="p-4 font-medium">Vendor</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Receipt</th>
                  <th className="p-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                    <td className="p-4 text-white">{receipt.vendor}</td>
                    <td className="p-4 text-gray-400">
                      {new Date(receipt.purchase_date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-white">{fmt(receipt.total_amount)}</td>
                    <td className="p-4">
                      {receipt.file_url ? (
                        <a
                          href={receipt.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-light"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-400 truncate max-w-[200px]">
                      {receipt.notes ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
