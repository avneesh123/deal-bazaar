"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { DbProduct } from "@/lib/supabase-types";

type Filter = "all" | "few-images" | "in_stock" | "sold";

export default function CatalogStudioPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [savingSlug, setSavingSlug] = useState<string | null>(null);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error.message);
    } else {
      setProducts((data as DbProduct[]) ?? []);
    }
    setLoading(false);
  }

  const visible = products
    .filter((p) => {
      if (filter === "few-images") return (p.images?.length ?? 0) < 3;
      if (filter === "in_stock") return p.status === "in_stock";
      if (filter === "sold") return p.status === "sold";
      return true;
    })
    .filter((p) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.box_number ?? "").toLowerCase().includes(q)
      );
    });

  const selected = visible.find((p) => p.slug === selectedSlug) ?? null;

  async function saveImages(slug: string, images: string[]) {
    setSavingSlug(slug);
    const { error } = await supabase
      .from("products")
      .update({ images })
      .eq("slug", slug);
    if (error) {
      alert(`Save failed: ${error.message}`);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, images } : p))
      );
    }
    setSavingSlug(null);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1">Catalog Studio</h1>
        <p className="text-sm text-gray-400">
          Curate product images. Drop bad shots, reorder, set the primary.
          Changes save directly to Supabase — they go live on the next deploy.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Left rail — product list */}
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 bg-gray-950 border border-gray-800 rounded-sm p-4">
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="Search by name, slug, box…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-gold"
            />
            <div className="flex gap-1.5 flex-wrap">
              {(
                [
                  ["all", "All"],
                  ["in_stock", "In stock"],
                  ["few-images", "<3 images"],
                  ["sold", "Sold"],
                ] as [Filter, string][]
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-sm transition-colors ${
                    filter === k
                      ? "bg-gold text-black"
                      : "bg-gray-900 text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading…</p>
          ) : (
            <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                {visible.length} product{visible.length === 1 ? "" : "s"}
              </p>
              {visible.map((p) => {
                const imgCount = p.images?.length ?? 0;
                const isSel = p.slug === selectedSlug;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`text-left px-3 py-2 rounded-sm flex items-center gap-3 transition-colors ${
                      isSel
                        ? "bg-gold/10 border border-gold/40"
                        : "border border-transparent hover:bg-gray-900"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 w-10 shrink-0">
                      {p.box_number ?? "—"}
                    </span>
                    <span className="flex-1 text-sm truncate">{p.name}</span>
                    <span
                      className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-sm ${
                        imgCount === 0
                          ? "bg-red-500/20 text-red-300"
                          : imgCount < 3
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {imgCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        {/* Right pane — image curation for the selected product */}
        <section className="col-span-12 lg:col-span-8 xl:col-span-9">
          {selected ? (
            <ProductImageEditor
              key={selected.slug}
              product={selected}
              saving={savingSlug === selected.slug}
              onSave={(imgs) => saveImages(selected.slug, imgs)}
            />
          ) : (
            <div className="bg-gray-950 border border-gray-800 rounded-sm p-12 text-center text-gray-500">
              Select a product on the left to start editing its images.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-product editor — list, drop, reorder, set primary
// ---------------------------------------------------------------------------
function ProductImageEditor({
  product,
  saving,
  onSave,
}: {
  product: DbProduct;
  saving: boolean;
  onSave: (images: string[]) => void;
}) {
  const [draft, setDraft] = useState<string[]>(product.images ?? []);

  useEffect(() => {
    setDraft(product.images ?? []);
  }, [product.slug, product.images]);

  const dirty =
    draft.length !== (product.images?.length ?? 0) ||
    draft.some((u, i) => u !== product.images?.[i]);

  function drop(idx: number) {
    setDraft((prev) => prev.filter((_, i) => i !== idx));
  }
  function move(idx: number, dir: -1 | 1) {
    setDraft((prev) => {
      const next = [...prev];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  }
  function makePrimary(idx: number) {
    setDraft((prev) => {
      if (idx === 0) return prev;
      const next = [...prev];
      const [chosen] = next.splice(idx, 1);
      return [chosen, ...next];
    });
  }
  function reset() {
    setDraft(product.images ?? []);
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-sm">
      <header className="px-6 py-4 border-b border-gray-800 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-medium">{product.name}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {product.slug} · {product.box_number ?? "no box"} · {product.status}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <button
              onClick={reset}
              className="text-[11px] uppercase tracking-wider px-3 py-2 rounded-sm border border-gray-700 text-gray-300 hover:bg-gray-900"
            >
              Reset
            </button>
          )}
          <button
            disabled={!dirty || saving}
            onClick={() => onSave(draft)}
            className="text-[11px] uppercase tracking-wider px-4 py-2 rounded-sm bg-gold text-black font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : dirty ? `Save (${draft.length})` : "Saved"}
          </button>
        </div>
      </header>

      {draft.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          No images. (Reset to restore the original set.)
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {draft.map((url, i) => (
            <ImageTile
              key={url}
              url={url}
              index={i}
              isPrimary={i === 0}
              onDrop={() => drop(i)}
              onUp={() => move(i, -1)}
              onDown={() => move(i, 1)}
              onPrimary={() => makePrimary(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ImageTile({
  url,
  index,
  isPrimary,
  onDrop,
  onUp,
  onDown,
  onPrimary,
}: {
  url: string;
  index: number;
  isPrimary: boolean;
  onDrop: () => void;
  onUp: () => void;
  onDown: () => void;
  onPrimary: () => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-sm overflow-hidden">
      <div className="relative aspect-square bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="w-full h-full object-contain" />
        <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-sm">
          #{index + 1}
        </span>
        {isPrimary && (
          <span className="absolute top-1.5 right-1.5 bg-gold text-black text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm font-medium">
            Primary
          </span>
        )}
      </div>
      <div className="p-2 flex items-center gap-1 text-[10px]">
        <button
          onClick={onUp}
          disabled={index === 0}
          className="px-2 py-1 rounded-sm hover:bg-gray-800 disabled:opacity-30"
          aria-label="Move up"
        >
          ↑
        </button>
        <button
          onClick={onDown}
          className="px-2 py-1 rounded-sm hover:bg-gray-800"
          aria-label="Move down"
        >
          ↓
        </button>
        {!isPrimary && (
          <button
            onClick={onPrimary}
            className="px-2 py-1 rounded-sm hover:bg-gray-800 uppercase tracking-wider"
          >
            Set primary
          </button>
        )}
        <button
          onClick={onDrop}
          className="ml-auto px-2 py-1 rounded-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 uppercase tracking-wider"
        >
          Drop
        </button>
      </div>
    </div>
  );
}
