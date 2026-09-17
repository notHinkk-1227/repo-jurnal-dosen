"use client";

import { Upload, FileCheck } from "lucide-react";
import { useState } from "react";

export function FileDropField({
  label,
  helperText,
  accept,
  onFileSelected,
}: {
  label: string;
  helperText: string;
  accept: string;
  onFileSelected?: (file: File | null) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onFileSelected?.(file);
  }

  const inputId = `file-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <label
        htmlFor={inputId}
        className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-border bg-surface px-4 py-6 text-center transition-colors hover:bg-paper"
      >
        {fileName ? (
          <>
            <FileCheck className="h-5 w-5 text-status-published" strokeWidth={1.75} />
            <span className="text-sm font-medium text-ink">{fileName}</span>
            <span className="text-xs text-ink-soft">Klik untuk ganti file</span>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 text-ink-soft" strokeWidth={1.75} />
            <span className="text-sm text-ink-soft">Klik untuk memilih file</span>
          </>
        )}
        <input id={inputId} type="file" accept={accept} onChange={handleChange} className="hidden" />
      </label>
      <p className="mt-1.5 text-xs text-ink-soft">{helperText}</p>
    </div>
  );
}
