"use server";

import { redirect } from "next/navigation";
import { approveQueuedArticle, rejectQueuedArticle } from "@/lib/dummy-data";

// TODO: ganti approveQueuedArticle/rejectQueuedArticle (mutasi array dummy)
// dengan articleService.reviewArticle(id, "PUBLISHED"/"REJECTED", note)
// begitu backend & database aktif.
export async function approveArticleAction(id: string) {
  approveQueuedArticle(id);
  redirect("/admin?reviewed=approved");
}

export async function rejectArticleAction(id: string, note: string) {
  rejectQueuedArticle(id);
  // note belum disimpan ke mana pun (belum ada tabel/field untuk itu di dummy data) —
  // begitu backend aktif, note ini yang dikirim sebagai rejectedNote ke articleService.
  void note;
  redirect("/admin?reviewed=rejected");
}
