"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface ReceiptUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string | null;
}

export default function ReceiptUploader({ onUpload, currentUrl }: ReceiptUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `receipts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("receipts").upload(path, file);

    if (!error) {
      const { data } = supabase.storage.from("receipts").getPublicUrl(path);
      onUpload(data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      {currentUrl && (
        <div className="bg-gray-950 border border-gray-700 rounded-lg p-3">
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold hover:text-gold-light"
          >
            View uploaded receipt
          </a>
        </div>
      )}
      <label className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors">
        {uploading ? "Uploading..." : "Upload Receipt"}
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
}
