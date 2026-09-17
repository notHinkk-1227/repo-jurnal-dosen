"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { VerificationQueueItem } from "@/components/dashboard/VerificationQueueItem";
import type { QueuedArticle } from "@/lib/dummy-data";

// TODO: ganti onApprove/onReject dengan panggilan ke articleService.reviewArticle(id, status, note)
// lewat API route (mis. PATCH /api/articles/[id]) begitu backend aktif.
// Saat ini item hanya dihapus dari state lokal (murni simulasi UI, tidak persisten).
export function VerificationQueueList({ initialArticles }: { initialArticles: QueuedArticle[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [lastAction, setLastAction] = useState<{ title: string; type: "approved" | "rejected" } | null>(
    null,
  );

  function handleApprove(id: string) {
    const article = articles.find((a) => a.id === id);
    if (article) setLastAction({ title: article.title, type: "approved" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  function handleReject(id: string, _note: string) {
    const article = articles.find((a) => a.id === id);
    if (article) setLastAction({ title: article.title, type: "rejected" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      {lastAction ? (
        <div
          className={`mb-4 rounded-lg px-4 py-3 text-sm ${
            lastAction.type === "approved"
              ? "bg-status-published-soft text-status-published"
              : "bg-status-rejected-soft text-status-rejected"
          }`}
        >
          {lastAction.type === "approved"
            ? `"${lastAction.title}" dipublikasikan.`
            : `"${lastAction.title}" ditolak dan catatan dikirim ke dosen.`}
        </div>
      ) : null}

      {articles.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <Inbox className="h-8 w-8 text-ink-soft" strokeWidth={1.5} />
          <p className="mt-3 font-serif text-lg text-ink">Antrean kosong</p>
          <p className="mt-1 text-sm text-ink-soft">Semua artikel sudah diverifikasi.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <VerificationQueueItem
              key={article.id}
              article={article}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
