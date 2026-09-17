import { UploadArticleForm } from "@/components/dashboard/UploadArticleForm";

export default function UploadArticlePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl text-ink">Unggah artikel baru</h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Artikel akan berstatus &ldquo;menunggu verifikasi&rdquo; sampai ditinjau oleh admin/pustakawan.
      </p>

      <div className="mt-6">
        <UploadArticleForm />
      </div>
    </div>
  );
}
