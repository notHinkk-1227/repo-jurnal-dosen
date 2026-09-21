import { ArticleCoverCard } from "@/components/public/ArticleCoverCard";
import type { PublicArticle } from "@/lib/dummy-data";

export function ArticleCarouselRow({
  title,
  articles,
}: {
  title: string;
  articles: PublicArticle[];
}) {
  return (
    <section>
      <h2 className="font-serif text-lg text-ink">{title}</h2>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {articles.map((article) => (
          <ArticleCoverCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
