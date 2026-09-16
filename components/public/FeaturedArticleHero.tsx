import { FileText, Download } from "lucide-react";
import { ArticleCover } from "@/components/public/ArticleCover";
import type { PublicArticle } from "@/lib/dummy-data";

function formatMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

export function FeaturedArticleHero({ article }: { article: PublicArticle }) {
  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-7 sm:flex-row sm:items-center">
      <div className="flex-1">
        <span className="inline-block rounded-full bg-brass-soft px-3 py-1 text-xs font-medium text-brass">
          Artikel unggulan bulan ini
        </span>
        <h1 className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-[28px]">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          {article.authorName} · {article.facultyName} · {formatMonthYear(article.publishedAt)}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{article.abstract}</p>

        <div className="mt-6 flex gap-3">
          <a
            href={`/articles/${article.id}`}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            <FileText className="h-4 w-4" strokeWidth={1.75} />
            Baca artikel
          </a>
          <button className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper">
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Unduh PDF
          </button>
        </div>
      </div>

      <div className="w-[150px] shrink-0">
        <ArticleCover title={article.title} theme={article.coverTheme} size="lg" />
      </div>
    </section>
  );
}
