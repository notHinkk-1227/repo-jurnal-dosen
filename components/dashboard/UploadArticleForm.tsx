"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeywordTagInput } from "@/components/dashboard/KeywordTagInput";
import { FileDropField } from "@/components/dashboard/FileDropField";
import { dummyCategories, dummyCurrentDosen } from "@/lib/dummy-data";

// TODO: ganti simulasi submit di bawah dengan POST ke /api/articles
// (lihat app/api/articles/route.ts) begitu backend, storage, dan auth aktif.
// File PDF & cover di sini baru dipegang sebagai File object di state,
// belum benar-benar di-upload — itu pekerjaan lib/storage/index.ts nanti.
export function UploadArticleForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [keywords, setKeywords] = useState<string[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleCategory(id: string) {
    setCategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !abstract.trim() || keywords.length === 0 || categoryIds.length === 0) {
      setError("Judul, abstrak, minimal 1 kata kunci, dan minimal 1 kategori wajib diisi.");
      return;
    }
    if (!pdfFile) {
      setError("File PDF artikel wajib diunggah.");
      return;
    }

    setIsSubmitting(true);
    // Simulasi delay request — dihapus begitu terhubung ke API sungguhan.
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Dummy: anggap selalu berhasil, kembali ke dashboard dengan status "menunggu verifikasi".
    router.push("/dosen?submitted=1");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error ? (
        <p className="rounded-md bg-status-rejected-soft px-3 py-2 text-sm text-status-rejected">
          {error}
        </p>
      ) : null}

      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="font-serif text-lg text-ink">Informasi artikel</h2>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-ink">
              Judul artikel
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul lengkap karya ilmiah"
              className="mt-1.5 w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="abstract" className="block text-sm font-medium text-ink">
              Abstrak
            </label>
            <textarea
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              rows={5}
              placeholder="Ringkasan singkat isi artikel"
              className="mt-1.5 w-full resize-none rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-ink">
                Tahun
              </label>
              <input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="mt-1.5 w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-ink">Fakultas</span>
              <p className="mt-1.5 rounded-md border border-border bg-paper px-3.5 py-2.5 text-sm text-ink-soft">
                {dummyCurrentDosen.facultyName}
              </p>
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-ink">Kata kunci</span>
            <div className="mt-1.5">
              <KeywordTagInput value={keywords} onChange={setKeywords} />
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-ink">Kategori</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {dummyCategories.map((category) => {
                const isActive = categoryIds.includes(category.id);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-brass-soft text-brass"
                        : "border border-border text-ink-soft hover:bg-paper"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="font-serif text-lg text-ink">Berkas</h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <FileDropField
            label="File PDF artikel"
            helperText="Wajib. Maks. 20MB, format PDF."
            accept="application/pdf"
            onFileSelected={setPdfFile}
          />
          <FileDropField
            label="Cover (opsional)"
            helperText="Kosongkan untuk cover otomatis sesuai fakultas."
            accept="image/*"
            onFileSelected={setCoverFile}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/dosen")}
          className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Mengirim..." : "Kirim untuk verifikasi"}
        </button>
      </div>
    </form>
  );
}
