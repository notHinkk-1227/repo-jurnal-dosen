"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { approveArticleAction, rejectArticleAction } from "@/app/(dashboard)/admin/actions";

export function ArticleReviewActions({ articleId }: { articleId: string }) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleApprove() {
    setIsSubmitting(true);
    await approveArticleAction(articleId);
  }

  async function handleConfirmReject() {
    if (!note.trim()) return;
    setIsSubmitting(true);
    await rejectArticleAction(articleId, note.trim());
  }

  if (isRejecting) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <label htmlFor={`reject-note-${articleId}`} className="block text-sm font-medium text-ink">
          Alasan penolakan
        </label>
        <textarea
          id={`reject-note-${articleId}`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Jelaskan bagian yang perlu direvisi dosen sebelum diajukan ulang"
          className="mt-1.5 w-full resize-none rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
        />
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setIsRejecting(false);
              setNote("");
            }}
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirmReject}
            disabled={!note.trim() || isSubmitting}
            className="rounded-md bg-status-rejected px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Memproses..." : "Konfirmasi tolak"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => setIsRejecting(true)}
        disabled={isSubmitting}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:opacity-50"
      >
        <X className="h-4 w-4" strokeWidth={1.75} />
        Tolak
      </button>
      <button
        type="button"
        onClick={handleApprove}
        disabled={isSubmitting}
        className="inline-flex items-center gap-1.5 rounded-md bg-status-published px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Check className="h-4 w-4" strokeWidth={1.75} />
        {isSubmitting ? "Memproses..." : "Setujui & publikasikan"}
      </button>
    </div>
  );
}
