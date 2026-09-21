import { SearchX } from "lucide-react";
import { PublicSearchBar } from "@/components/public/PublicSearchBar";
import { SearchFacultyFilter } from "@/components/public/SearchFacultyFilter";
import { SearchResultCard } from "@/components/public/SearchResultCard";
import { searchPublicArticles } from "@/lib/dummy-data";

// TODO: ganti searchPublicArticles(dummy) dengan articleService.searchPublicArticles(...)
// begitu backend & database aktif — lihat lib/services/articleService.ts.
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; faculty?: string }>;
}) {
  const { query, faculty } = await searchParams;
  const results = searchPublicArticles({ query, facultyName: faculty });

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <PublicSearchBar defaultValue={query} />

      <div className="mt-4">
        <SearchFacultyFilter query={query} activeFaculty={faculty} />
      </div>

      <div className="mt-6">
        <p className="text-sm text-ink-soft">
          {results.length > 0
            ? `${results.length} artikel ditemukan${query ? ` untuk "${query}"` : ""}`
            : "Tidak ada artikel yang cocok"}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="mt-4 flex flex-col gap-4">
          {results.map((article) => (
            <SearchResultCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <SearchX className="h-8 w-8 text-ink-soft" strokeWidth={1.5} />
          <p className="mt-3 font-serif text-lg text-ink">Tidak ditemukan</p>
          <p className="mt-1 text-sm text-ink-soft">
            Coba kata kunci lain atau ubah filter fakultas yang dipilih.
          </p>
        </div>
      )}
    </main>
  );
}
