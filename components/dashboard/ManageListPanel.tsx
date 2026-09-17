"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export type NamedItem = { id: string; name: string };

// TODO: ganti simulasi state lokal ini dengan panggilan ke API
// (mis. POST/DELETE /api/faculties, /api/categories) begitu backend aktif.
// Saat ini add/delete cuma mengubah state di browser, tidak persisten.
export function ManageListPanel({
  title,
  items: initialItems,
  addPlaceholder,
  emptyLabel,
}: {
  title: string;
  items: NamedItem[];
  addPlaceholder: string;
  emptyLabel: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (items.some((item) => item.name.toLowerCase() === trimmed.toLowerCase())) {
      setDraft("");
      return;
    }
    setItems((prev) => [...prev, { id: `tmp_${Date.now()}`, name: trimmed }]);
    setDraft("");
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="font-serif text-lg text-ink">{title}</h2>

      <form onSubmit={handleAdd} className="mt-4 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={addPlaceholder}
          className="flex-1 rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3.5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Tambah
        </button>
      </form>

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-ink-soft">{emptyLabel}</p>
      ) : (
        <ul className="mt-5 flex flex-col gap-1.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-ink hover:bg-paper"
            >
              {item.name}
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label={`Hapus ${item.name}`}
                className="text-ink-soft hover:text-status-rejected"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
