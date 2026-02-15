"use client";

import type { DbProduct } from "@/lib/supabase-types";

export interface ReceiptItemData {
  product_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
}

interface ReceiptItemFormProps {
  items: ReceiptItemData[];
  onChange: (items: ReceiptItemData[]) => void;
  products: DbProduct[];
}

export default function ReceiptItemForm({ items, onChange, products }: ReceiptItemFormProps) {
  const addItem = () =>
    onChange([...items, { product_id: "", item_name: "", quantity: 1, unit_price: 0 }]);

  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  const updateItem = (index: number, field: keyof ReceiptItemData, value: string | number) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };

    // Auto-fill name when product is selected
    if (field === "product_id" && value) {
      const p = products.find((p) => p.id === value);
      if (p) next[index].item_name = p.name;
    }

    onChange(next);
  };

  const inputClass =
    "w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold transition-colors";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-400">Line Items</label>
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-gold hover:text-gold-light cursor-pointer"
        >
          + Add Item
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-500 py-4 text-center">
          No items yet. Click &quot;+ Add Item&quot; to start.
        </p>
      )}

      {items.map((item, i) => (
        <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Item #{i + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Link to Product</label>
              <select
                value={item.product_id}
                onChange={(e) => updateItem(i, "product_id", e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">None (manual entry)</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.slug})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Item Name</label>
              <input
                type="text"
                value={item.item_name}
                onChange={(e) => updateItem(i, "item_name", e.target.value)}
                className={inputClass}
                placeholder="Product name"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Quantity</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(i, "quantity", parseInt(e.target.value) || 1)}
                min={1}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Unit Price</label>
              <input
                type="number"
                value={item.unit_price}
                onChange={(e) => updateItem(i, "unit_price", parseFloat(e.target.value) || 0)}
                step="0.01"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="text-right text-sm text-gray-400">
          Total:{" "}
          <span className="text-white font-medium">
            ${items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
