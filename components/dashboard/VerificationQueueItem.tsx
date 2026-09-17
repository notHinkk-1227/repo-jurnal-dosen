"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { ArticleCover } from "@/components/public/ArticleCover";
import type { QueuedArticle } from "@/lib/dummy-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function VerificationQueueItem({
  article,
  onApprove,
  onReject,
}: {
  article: QueuedArticle;
  onApprove: (id: string) => void;
  onReject: (id: string, note: string) => void;
}) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [note, setNote] = useState("");

  function handleConfirmReject() {
    if (!note.trim()) return;
    onReject(article.id, note.trim());
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex gap-5">
        <div className="w-[150px] shrink-0">
          <ArticleCover title={article.title} theme={article.coverTheme} size="sm" />
        </div>

        <div className="min-w-0 flex-1 py-1">
          <h3 className="font-serif text-lg leading-snug text-ink">{article.title}</h3>
          <p className="mt-1.5 text-sm text-ink-soft">
            {article.authorName} · {article.facultyName} · {article.year}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{article.abstract}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {article.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-ink-soft"
              >
                {keyword}
              </span>
            ))}
          </div>

          <p className="mt-3 text-xs text-ink-soft">Diajukan {formatDate(article.submittedAt)}</p>
        </div>
      </div>

      {isRejecting ? (
        <div className="mt-4 border-t border-border pt-4">
          <label htmlFor={`reject-note-${article.id}`} className="block text-sm font-medium text-ink">
            Alasan penolakan
          </label>
          <textarea
            id={`reject-note-${article.id}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Jelaskan bagian yang perlu direvisi dosen"
            className="mt-1.5 w-full resize-none rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsRejecting(false);
                setNote("");
              }}
              className="rounded-md border border-border px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirmReject}
              disabled={!note.trim()}
              className="rounded-md bg-status-rejected px-3.5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Konfirmasi tolak
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-end gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => setIsRejecting(true)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
            Tolak
          </button>
          <button
            type="button"
            onClick={() => onApprove(article.id)}
            className="inline-flex items-center gap-1.5 rounded-md bg-status-published px-3.5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            <Check className="h-4 w-4" strokeWidth={1.75} />
            Setujui
          </button>
        </div>
      )}
    </div>
  );
}
