"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { searchProducts, getProductPrices } from "@/lib/pricing/kicksdb";
import type { DbProduct, ProductCategory, ProductStatus } from "@/lib/supabase-types";

interface ProductFormProps {
  product?: DbProduct;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [category, setCategory] = useState<ProductCategory>(product?.category ?? "sneakers");
  const [costPrice, setCostPrice] = useState(product?.cost_price?.toString() ?? "");
  const [sellingPrice, setSellingPrice] = useState(product?.selling_price?.toString() ?? "");
  const [shippingCost, setShippingCost] = useState(product?.shipping_cost?.toString() ?? "0");
  const [taxAmount, setTaxAmount] = useState(product?.tax_amount?.toString() ?? "0");
  const [currency] = useState(product?.currency ?? "USD");
  const [description, setDescription] = useState(product?.description ?? "");
  const [shortDescription, setShortDescription] = useState(product?.short_description ?? "");
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "in_stock");
  const [quantity, setQuantity] = useState(product?.quantity?.toString() ?? "1");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [boxNumber, setBoxNumber] = useState(product?.box_number ?? "");
  const [tags, setTags] = useState(product?.tags?.join(", ") ?? "");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    product?.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );
  const [retailPrice, setRetailPrice] = useState(product?.retail_price?.toString() ?? "");
  const [priceSources, setPriceSources] = useState<{ name: string; price: number | null; url: string }[]>(
    product?.price_sources ?? []
  );
  const [fetchingPrices, setFetchingPrices] = useState(false);
  const [priceStatus, setPriceStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEditing) setSlug(generateSlug(value));
  };

  const fetchMarketPrices = async () => {
    if (!name.trim()) return;
    setFetchingPrices(true);
    setPriceStatus("Fetching API key...");
    try {
      const { data: keyRow } = await supabase
        .from("api_keys")
        .select("api_key")
        .eq("service", "kicksdb")
        .single();
      if (!keyRow?.api_key) {
        setPriceStatus("KicksDB API key not configured. Add it in Settings.");
        setFetchingPrices(false);
        return;
      }
      const apiKey = keyRow.api_key;

      setPriceStatus("Searching KicksDB...");
      const results = await searchProducts(name, apiKey);
      if (results.length === 0) {
        setPriceStatus("No results found on KicksDB.");
        setFetchingPrices(false);
        return;
      }

      const match = results[0];
      if (match.retail_price) {
        setRetailPrice(match.retail_price.toString());
      }

      const size = specs.find((s) => s.key.toLowerCase() === "size")?.value;
      setPriceStatus("Fetching prices...");
      const prices = await getProductPrices(match.slug, apiKey, size);

      const brand = specs.find((s) => s.key.toLowerCase() === "brand")?.value || match.brand || "";
      const model = specs.find((s) => s.key.toLowerCase() === "model")?.value || name;
      const searchQuery = encodeURIComponent(`${brand} ${model}`.trim());

      const sources: { name: string; price: number | null; url: string }[] = [
        {
          name: "StockX",
          price: prices.lowest_ask,
          url: `https://stockx.com/${match.slug}`,
        },
      ];

      const brandLower = brand.toLowerCase();
      if (brandLower.includes("nike") || brandLower.includes("jordan")) {
        sources.push({ name: "Nike", price: null, url: `https://www.nike.com/w?q=${searchQuery}` });
      } else if (brandLower.includes("adidas")) {
        sources.push({ name: "Adidas", price: null, url: `https://www.adidas.com/us/search?q=${searchQuery}` });
      }

      sources.push({
        name: "eBay",
        price: prices.last_sale,
        url: `https://www.ebay.com/sch/i.html?_nkw=${searchQuery}`,
      });

      setPriceSources(sources);
      setPriceStatus(`Found: ${match.name} — Retail $${match.retail_price ?? "N/A"}, StockX Ask $${prices.lowest_ask ?? "N/A"}`);
    } catch (err) {
      setPriceStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setFetchingPrices(false);
    }
  };

  const addPriceSource = () =>
    setPriceSources([...priceSources, { name: "", price: null, url: "" }]);
  const removePriceSource = (index: number) =>
    setPriceSources(priceSources.filter((_, i) => i !== index));
  const updatePriceSource = (
    index: number,
    field: "name" | "price" | "url",
    value: string
  ) => {
    const next = [...priceSources];
    if (field === "price") {
      next[index] = { ...next[index], price: value ? parseFloat(value) : null };
    } else {
      next[index] = { ...next[index], [field]: value };
    }
    setPriceSources(next);
  };

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: "key" | "value", value: string) => {
    const next = [...specs];
    next[index][field] = value;
    setSpecs(next);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("images").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("images").getPublicUrl(path);
        newImages.push(data.publicUrl);
      }
    }

    setImages([...images, ...newImages]);
    setUploading(false);
  };

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const specsObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) specsObj[s.key.trim()] = s.value.trim();
    });

    const data = {
      name,
      slug,
      category,
      cost_price: costPrice ? parseFloat(costPrice) : null,
      selling_price: parseFloat(sellingPrice),
      shipping_cost: parseFloat(shippingCost) || 0,
      tax_amount: parseFloat(taxAmount) || 0,
      currency,
      description,
      short_description: shortDescription,
      status,
      quantity: parseInt(quantity) || 1,
      featured,
      box_number: boxNumber.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      images,
      specs: specsObj,
      retail_price: retailPrice ? parseFloat(retailPrice) : null,
      price_sources: priceSources.length > 0 ? priceSources : null,
    };

    if (isEditing) {
      const { error } = await supabase
        .from("products")
        .update(data)
        .eq("id", product!.id);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("products").insert(data);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    router.push("/admin/products");
  };

  const autoCalcTax = () => {
    const cost = parseFloat(costPrice);
    if (!isNaN(cost)) setTaxAmount((cost * 0.06625).toFixed(2));
  };

  const costNum = parseFloat(costPrice) || 0;
  const shippingNum = parseFloat(shippingCost) || 0;
  const taxNum = parseFloat(taxAmount) || 0;
  const totalCost = costNum + shippingNum + taxNum;
  const sellingNum = parseFloat(sellingPrice) || 0;
  const profit = sellingNum - totalCost;
  const marginPct = sellingNum > 0 ? (profit / sellingNum) * 100 : 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

  const inputClass =
    "w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors";
  const labelClass = "block text-sm text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Name + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className={inputClass}
            placeholder="Jordan 1 Retro High OG"
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className={inputClass}
            placeholder="jordan-1-retro-high-og"
          />
        </div>
      </div>

      {/* Category + Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="sneakers">Sneakers</option>
            <option value="jewelry">Jewelry</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProductStatus)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="in_stock">In Stock</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={0}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Box #</label>
          <input
            type="text"
            value={boxNumber}
            onChange={(e) => setBoxNumber(e.target.value)}
            className={inputClass}
            placeholder="e.g. A1, B3"
          />
        </div>
      </div>

      {/* Cost Breakdown Summary */}
      {isEditing && costNum > 0 && (
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Cost Breakdown</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center">
            <div>
              <p className="text-xs text-gray-500">Cost</p>
              <p className="text-sm text-white font-medium">{fmt(costNum)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Shipping</p>
              <p className="text-sm text-white font-medium">{fmt(shippingNum)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tax</p>
              <p className="text-sm text-white font-medium">{fmt(taxNum)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Cost</p>
              <p className="text-sm text-gold font-semibold">{fmt(totalCost)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Selling</p>
              <p className="text-sm text-white font-medium">{fmt(sellingNum)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Profit</p>
              <p className={`text-sm font-semibold ${profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {fmt(profit)} ({marginPct.toFixed(1)}%)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Cost Price</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            step="0.01"
            className={inputClass}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className={labelClass}>Selling Price</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            step="0.01"
            required
            className={inputClass}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Retail Price + Fetch Market Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Retail Price (MSRP)</label>
          <input
            type="number"
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
            step="0.01"
            className={inputClass}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className={labelClass}>Market Prices</label>
          <button
            type="button"
            onClick={fetchMarketPrices}
            disabled={fetchingPrices || !name.trim()}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gold text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {fetchingPrices ? "Fetching..." : "Fetch Market Prices"}
          </button>
        </div>
      </div>
      {priceStatus && (
        <p className="text-xs text-gray-400 -mt-4">{priceStatus}</p>
      )}
      {/* Price Sources — editable */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 -mt-2">
        <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Price Sources</h4>
        <div className="space-y-2">
          {priceSources.map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={s.name}
                onChange={(e) => updatePriceSource(i, "name", e.target.value)}
                placeholder="Source (e.g. StockX)"
                className={`${inputClass} w-28 flex-shrink-0`}
              />
              <input
                type="number"
                value={s.price ?? ""}
                onChange={(e) => updatePriceSource(i, "price", e.target.value)}
                placeholder="Price"
                step="0.01"
                className={`${inputClass} w-24 flex-shrink-0`}
              />
              <input
                type="text"
                value={s.url}
                onChange={(e) => updatePriceSource(i, "url", e.target.value)}
                placeholder="https://..."
                className={`${inputClass} flex-1`}
              />
              <a
                href={s.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gold text-xs whitespace-nowrap hover:underline ${!s.url ? "opacity-30 pointer-events-none" : ""}`}
              >
                Open
              </a>
              <button
                type="button"
                onClick={() => removePriceSource(i)}
                className="text-red-400 hover:text-red-300 px-1 cursor-pointer flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPriceSource}
          className="mt-2 text-sm text-gold hover:text-gold-light cursor-pointer"
        >
          + Add Source
        </button>
      </div>

      {/* Shipping + Tax */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Shipping Cost</label>
          <input
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            step="0.01"
            className={inputClass}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className={labelClass}>Tax Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={taxAmount}
              onChange={(e) => setTaxAmount(e.target.value)}
              step="0.01"
              className={`${inputClass} flex-1`}
              placeholder="0.00"
            />
            <button
              type="button"
              onClick={autoCalcTax}
              className="bg-gray-800 hover:bg-gray-700 text-gold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Auto NJ 6.625%
            </button>
          </div>
        </div>
      </div>

      {/* Descriptions */}
      <div>
        <label className={labelClass}>Short Description</label>
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className={inputClass}
          placeholder="Brand new with OG box"
        />
      </div>
      <div>
        <label className={labelClass}>Full Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Detailed product description..."
        />
      </div>

      {/* Images */}
      <div>
        <label className={labelClass}>Images</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt=""
                className="w-20 h-20 rounded-lg object-cover border border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors">
          {uploading ? "Uploading..." : "Upload Images"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <div className="mt-2">
          <label className={labelClass}>Or paste image URLs (one per line)</label>
          <textarea
            value={images.join("\n")}
            onChange={(e) => setImages(e.target.value.split("\n").filter(Boolean))}
            rows={2}
            className={inputClass}
            placeholder="/images/products/sneakers/example.jpg"
          />
        </div>
      </div>

      {/* Specs */}
      <div>
        <label className={labelClass}>Specifications</label>
        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => updateSpec(i, "key", e.target.value)}
                placeholder="Key (e.g. Brand)"
                className={`${inputClass} flex-1`}
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
                placeholder="Value (e.g. Nike)"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="text-red-400 hover:text-red-300 px-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSpec}
          className="mt-2 text-sm text-gold hover:text-gold-light cursor-pointer"
        >
          + Add Spec
        </button>
      </div>

      {/* Tags */}
      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={inputClass}
          placeholder="jordan, nike, sneakers"
        />
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="cursor-pointer"
        />
        <span className="text-sm text-gray-300">Featured product</span>
      </label>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gold text-black font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-gold-light transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="bg-gray-800 text-gray-300 rounded-lg px-6 py-2.5 text-sm hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
