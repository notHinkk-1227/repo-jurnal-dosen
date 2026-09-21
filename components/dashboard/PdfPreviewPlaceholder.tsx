import { FileText } from "lucide-react";

// TODO: ganti dengan embed PDF sungguhan (mis. <iframe src={article.fileUrl} />
// atau react-pdf) begitu lib/storage/index.ts benar-benar menyimpan file
// dan mengembalikan URL yang bisa diakses. Placeholder ini jujur menyatakan
// keterbatasannya, bukan berpura-pura ada preview.
export function PdfPreviewPlaceholder({ fileName }: { fileName: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-paper px-6 py-20 text-center">
      <FileText className="h-8 w-8 text-ink-soft" strokeWidth={1.5} />
      <div>
        <p className="text-sm font-medium text-ink">{fileName}</p>
        <p className="mt-1 text-xs text-ink-soft">
          Pratinjau PDF belum aktif — menunggu penyimpanan file terhubung.
        </p>
      </div>
    </div>
  );
}
