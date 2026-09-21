import { notFound } from "next/navigation";
import { FileText, Download } from "lucide-react";
import { ArticleCover } from "@/components/public/ArticleCover";
import { ArticleCarouselRow } from "@/components/public/ArticleCarouselRow";
import { getPublicArticleById, getRelatedArticles } from "@/lib/dummy-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// TODO: ganti getPublicArticleById(dummy) dengan articleService.getArticleDetail(id)
// begitu backend & database aktif. Panggil articleService.registerDownload(id)
// saat tombol "Unduh PDF" ditekan.
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getPublicArticleById(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="w-[150px] shrink-0">
          <ArticleCover title={article.title} theme={article.coverTheme} size="lg" />
        </div>

        <div className="flex-1">
          <span className="inline-block rounded-full bg-brass-soft px-3 py-1 text-xs font-medium text-brass">
            {article.categoryName}
          </span>
          <h1 className="mt-4 font-serif text-3xl leading-snug text-ink">{article.title}</h1>
          <p className="mt-3 text-sm text-ink-soft">
            {article.authorName} · {article.facultyName}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Dipublikasikan {formatDate(article.publishedAt)} · {article.downloadCount} unduhan
          </p>

          <div className="mt-6 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90">
              <Download className="h-4 w-4" strokeWidth={1.75} />
              Unduh PDF
            </button>
            <span className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-ink-soft">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              Artikel tahun {article.year}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <h2 className="font-serif text-lg text-ink">Abstrak</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{article.abstract}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {article.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-border px-3 py-1 text-xs text-ink-soft"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {relatedArticles.length > 0 ? (
        <div className="mt-12 border-t border-border pt-8">
          <ArticleCarouselRow title={`Artikel lain dari ${article.facultyName}`} articles={relatedArticles} />
        </div>
      ) : null}
    </main>
  );
}
