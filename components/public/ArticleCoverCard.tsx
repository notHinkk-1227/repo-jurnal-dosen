import Link from "next/link";
import { ArticleCover } from "@/components/public/ArticleCover";
import type { PublicArticle } from "@/lib/dummy-data";

export function ArticleCoverCard({ article }: { article: PublicArticle }) {
  return (
    <Link href={`/articles/${article.id}`} className="block w-[150px] shrink-0">
      <ArticleCover title={article.title} theme={article.coverTheme} size="sm" />
      <p className="mt-2.5 line-clamp-2 text-sm font-medium leading-snug text-ink">
        {article.title}
      </p>
      <p className="mt-1 text-xs text-ink-soft">
        {article.authorName} · {article.year}
      </p>
    </Link>
  );
}
