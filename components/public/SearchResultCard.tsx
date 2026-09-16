import Link from "next/link";
import { ArticleCover } from "@/components/public/ArticleCover";
import type { PublicArticle } from "@/lib/dummy-data";

export function SearchResultCard({ article }: { article: PublicArticle }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex gap-5 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-ink"
    >
      <div className="w-[150px] shrink-0">
        <ArticleCover title={article.title} theme={article.coverTheme} size="sm" />
      </div>

      <div className="min-w-0 flex-1 py-1">
        <span className="text-xs font-medium text-brass">{article.categoryName}</span>
        <h3 className="mt-1.5 line-clamp-2 font-serif text-lg leading-snug text-ink">
          {article.title}
        </h3>
        <p className="mt-1.5 text-sm text-ink-soft">
          {article.authorName} · {article.facultyName} · {article.year}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {article.abstract}
        </p>
      </div>
    </Link>
  );
}
