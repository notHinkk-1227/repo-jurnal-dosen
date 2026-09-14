export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Repositori Karya Ilmiah Dosen</h1>
      <p className="mt-2 text-neutral-600">
        Struktur project awal. Halaman homepage publik (hero artikel unggulan,
        carousel, search) akan dibangun di{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5">app/(public)</code>.
      </p>
      <p className="mt-4 text-sm text-neutral-500">
        Lihat <code>PRD.md</code> dan <code>CLAUDE.md</code> di root project untuk
        konteks lengkap sebelum melanjutkan development.
      </p>
    </main>
  );
}
