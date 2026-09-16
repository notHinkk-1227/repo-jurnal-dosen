"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PublicSearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-soft"
        strokeWidth={1.75}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari judul, penulis, atau kata kunci"
        className="w-full rounded-md border border-border bg-surface py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
      />
    </form>
  );
}
