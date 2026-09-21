"use client";

import { useState } from "react";
import { dummyFaculties } from "@/lib/dummy-data";

// Untuk homepage, filter ini baru bersifat visual (belum menyaring carousel).
// Filter yang benar-benar memfilter data akan ada di halaman /search.
export function FacultyFilterChips() {
  const [active, setActive] = useState<string>("all");

  const chips = [{ id: "all", name: "Semua fakultas" }, ...dummyFaculties];

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isActive = active === chip.id;
        return (
          <button
            key={chip.id}
            onClick={() => setActive(chip.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-brass-soft text-brass"
                : "border border-border text-ink-soft hover:bg-paper"
            }`}
          >
            {chip.name}
          </button>
        );
      })}
    </div>
  );
}
