import { FeaturedArticleHero } from "@/components/public/FeaturedArticleHero";
import { PublicSearchBar } from "@/components/public/PublicSearchBar";
import { SearchFacultyFilter } from "@/components/public/SearchFacultyFilter";
import { ArticleCarouselRow } from "@/components/public/ArticleCarouselRow";
import { dummyFeaturedArticle, dummyLatestArticles, dummyMostDownloaded } from "@/lib/dummy-data";

// TODO: ganti dummyFeaturedArticle/dummyLatestArticles/dummyMostDownloaded
// dengan articleService.getHomepageSections() begitu backend & database aktif.
export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <FeaturedArticleHero article={dummyFeaturedArticle} />

      <div className="mt-8">
        <PublicSearchBar />
      </div>

      <div className="mt-4">
        {/* Klik fakultas di homepage langsung membawa ke halaman /search dengan filter itu aktif */}
        <SearchFacultyFilter />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <ArticleCarouselRow title="Artikel terbaru" articles={dummyLatestArticles} />
        <ArticleCarouselRow title="Paling banyak diunduh" articles={dummyMostDownloaded} />
      </div>
    </main>
  );
}
