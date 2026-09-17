import { StatCard } from "@/components/dashboard/StatCard";
import { VerificationQueueList } from "@/components/dashboard/VerificationQueueList";
import { dummyPendingQueue } from "@/lib/dummy-data";

// TODO: ganti dummyPendingQueue dengan articleService.getPendingQueue()
// begitu backend & database aktif — lihat lib/services/articleService.ts.
export default function AdminQueuePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">Antrean verifikasi</h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Tinjau artikel yang diunggah dosen sebelum dipublikasikan ke halaman publik.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Menunggu verifikasi" value={dummyPendingQueue.length} />
      </div>

      <div className="mt-8">
        <VerificationQueueList initialArticles={dummyPendingQueue} />
      </div>
    </div>
  );
}
