"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/utils";

interface RequestFormProps {
  productName?: string;
  category?: string;
}

export default function RequestForm({ productName, category }: RequestFormProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(category ?? "");
  const [item, setItem] = useState(productName ?? "");
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    supabase
      .from("products")
      .select("category")
      .then(({ data }) => {
        if (data) {
          const unique = [...new Set(data.map((d) => d.category as string))].sort();
          setCategories(unique);
        }
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*Product Request*`,
      selectedCategory && `Category: ${selectedCategory}`,
      `Item: ${item}`,
      size && `Size: ${size}`,
      name && `Name: ${name}`,
      contact && `Contact: ${contact}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean);

    const url = getWhatsAppUrl(WHATSAPP_NUMBER).replace(
      /text=.*$/,
      `text=${encodeURIComponent(lines.join("\n"))}`
    );
    window.open(url, "_blank");
  };

  const inputClass =
    "w-full bg-dark-card border border-dark-border rounded-sm px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-secondary text-sm mb-1.5">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-1.5">Size</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={inputClass}
            placeholder="e.g. 10.5, 7Y, S/M/L"
          />
        </div>
      </div>

      <div>
        <label className="block text-text-secondary text-sm mb-1.5">
          What are you looking for? *
        </label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
          className={inputClass}
          placeholder="e.g. Jordan 1 Retro High OG, Gold Cuban Link"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-secondary text-sm mb-1.5">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block text-text-secondary text-sm mb-1.5">
            Phone or Email
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={inputClass}
            placeholder="So we can reach you"
          />
        </div>
      </div>

      <div>
        <label className="block text-text-secondary text-sm mb-1.5">
          Additional Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="Color preference, budget, condition, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-gold text-dark font-semibold rounded-sm px-8 py-3 text-sm uppercase tracking-wider hover:bg-gold-light transition-colors cursor-pointer"
      >
        Send Request via WhatsApp
      </button>
    </form>
  );
}
