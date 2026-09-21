"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function KeywordTagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (keywords: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addKeyword() {
    const trimmed = draft.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setDraft("");
  }

  function removeKeyword(keyword: string) {
    onChange(value.filter((k) => k !== keyword));
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addKeyword();
            }
          }}
          placeholder="Ketik kata kunci lalu tekan Enter"
          className="flex-1 rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
        />
        <button
          type="button"
          onClick={addKeyword}
          className="rounded-md border border-border px-4 text-sm font-medium text-ink transition-colors hover:bg-paper"
        >
          Tambah
        </button>
      </div>

      {value.length > 0 ? (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {value.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-1.5 rounded-full bg-brass-soft px-3 py-1 text-xs text-brass"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                aria-label={`Hapus kata kunci ${keyword}`}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" strokeWidth={2} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
