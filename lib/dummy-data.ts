// Data dummy — struktur mengikuti model Prisma di prisma/schema.prisma.
// Dipakai sementara untuk membangun UI sebelum endpoint asli & database siap.
// Ganti dengan fetch ke articleService/API begitu backend jalan.

export type ArticleStatus = "PENDING" | "PUBLISHED" | "REJECTED";

export type DummyArticle = {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  year: number;
  status: ArticleStatus;
  rejectedNote?: string;
  downloadCount: number;
  facultyName: string;
  categoryNames: string[];
  createdAt: string; // ISO date
  publishedAt?: string;
};

// Dosen yang sedang login — dummy untuk sesi development sebelum NextAuth terhubung penuh.
export const dummyCurrentDosen = {
  id: "usr_1",
  name: "Dr. Andi Wijaya",
  email: "andi.wijaya@kampus.ac.id",
  facultyName: "Fakultas Teknik",
};

export const dummyArticles: DummyArticle[] = [
  {
    id: "art_1",
    title: "Analisis Efisiensi Energi Terbarukan pada Sistem Panel Surya Terdistribusi",
    abstract:
      "Penelitian ini mengkaji efisiensi konversi energi pada sistem panel surya terdistribusi di wilayah tropis.",
    keywords: ["energi terbarukan", "panel surya", "efisiensi"],
    year: 2025,
    status: "PUBLISHED",
    downloadCount: 342,
    facultyName: "Fakultas Teknik",
    categoryNames: ["Energi", "Teknik Elektro"],
    createdAt: "2025-11-02",
    publishedAt: "2025-11-10",
  },
  {
    id: "art_2",
    title: "Optimalisasi Jaringan Sensor Nirkabel untuk Pemantauan Kualitas Udara",
    abstract:
      "Studi ini mengusulkan skema penempatan sensor nirkabel yang optimal untuk pemantauan kualitas udara perkotaan.",
    keywords: ["sensor nirkabel", "kualitas udara", "IoT"],
    year: 2025,
    status: "PENDING",
    downloadCount: 0,
    facultyName: "Fakultas Teknik",
    categoryNames: ["Teknik Komputer"],
    createdAt: "2026-09-10",
  },
  {
    id: "art_3",
    title: "Model Prediksi Beban Struktur Jembatan Menggunakan Machine Learning",
    abstract:
      "Penelitian mengusulkan model prediksi beban struktur jembatan berbasis pembelajaran mesin untuk mendukung pemeliharaan preventif.",
    keywords: ["machine learning", "struktur jembatan", "prediksi beban"],
    year: 2024,
    status: "PUBLISHED",
    downloadCount: 128,
    facultyName: "Fakultas Teknik",
    categoryNames: ["Teknik Sipil"],
    createdAt: "2024-05-14",
    publishedAt: "2024-05-20",
  },
  {
    id: "art_4",
    title: "Evaluasi Ketahanan Material Komposit terhadap Beban Siklik",
    abstract:
      "Studi eksperimental mengenai ketahanan material komposit serat karbon terhadap pembebanan siklik jangka panjang.",
    keywords: ["material komposit", "beban siklik", "serat karbon"],
    year: 2025,
    status: "REJECTED",
    rejectedNote: "Mohon lampirkan data mentah hasil pengujian laboratorium sebagai lampiran.",
    downloadCount: 0,
    facultyName: "Fakultas Teknik",
    categoryNames: ["Teknik Material"],
    createdAt: "2025-08-01",
  },
];

export function getDummyStats(articles: DummyArticle[]) {
  return {
    total: articles.length,
    published: articles.filter((a) => a.status === "PUBLISHED").length,
    pending: articles.filter((a) => a.status === "PENDING").length,
    totalDownloads: articles.reduce((sum, a) => sum + a.downloadCount, 0),
  };
}

// ---------------------------------------------------------------------------
// Data & helper khusus untuk halaman PUBLIK (homepage, pencarian, detail).
// Dataset di atas (dummyArticles) sengaja lebih kecil & fokus untuk dashboard
// dosen. Dataset di bawah ini lebih besar untuk kebutuhan homepage publik
// (carousel butuh cukup banyak item). Semua tetap mengikuti struktur Article
// di prisma/schema.prisma, hanya authorName ditulis langsung (bukan relasi)
// supaya dummy data lebih ringkas.
// ---------------------------------------------------------------------------

export type PublicArticle = {
  id: string;
  title: string;
  abstract: string;
  authorName: string;
  year: number;
  facultyName: string;
  categoryName: string;
  keywords: string[];
  downloadCount: number;
  publishedAt: string;
  coverTheme: CoverThemeKey;
};

export type CoverThemeKey =
  | "teknik"
  | "ekonomi"
  | "kedokteran"
  | "pendidikan"
  | "hukum"
  | "komputer";

// Warna + ikon cover per bidang keilmuan — ini yang mengimplementasikan
// "TemplateCoverStrategy" yang didesain di lib/services/coverService.ts.
// Nama warna di sini merujuk ke token Tailwind kustom di app/globals.css.
export const COVER_THEMES: Record<
  CoverThemeKey,
  { bgClass: string; fgClass: string; icon: string; label: string }
> = {
  teknik: { bgClass: "bg-cover-teknik", fgClass: "text-cover-teknik-fg", icon: "zap", label: "Teknik" },
  ekonomi: { bgClass: "bg-cover-ekonomi", fgClass: "text-cover-ekonomi-fg", icon: "trending-up", label: "Ekonomi" },
  kedokteran: { bgClass: "bg-cover-kedokteran", fgClass: "text-cover-kedokteran-fg", icon: "heart-pulse", label: "Kedokteran" },
  pendidikan: { bgClass: "bg-cover-pendidikan", fgClass: "text-cover-pendidikan-fg", icon: "brain", label: "Pendidikan" },
  hukum: { bgClass: "bg-cover-hukum", fgClass: "text-cover-hukum-fg", icon: "scale", label: "Hukum" },
  komputer: { bgClass: "bg-cover-komputer", fgClass: "text-cover-komputer-fg", icon: "cpu", label: "Ilmu Komputer" },
};

export const dummyFaculties = [
  { id: "fak_teknik", name: "Teknik" },
  { id: "fak_ekonomi", name: "Ekonomi" },
  { id: "fak_kedokteran", name: "Kedokteran" },
  { id: "fak_pendidikan", name: "Pendidikan" },
  { id: "fak_hukum", name: "Hukum" },
];

export const dummyFeaturedArticle: PublicArticle = {
  id: "art_pub_1",
  title: "Dampak Digitalisasi terhadap Produktivitas UMKM di Jawa Barat",
  abstract:
    "Studi ini mengkaji korelasi antara adopsi platform digital dan pertumbuhan omzet pelaku UMKM, dengan sampel 240 responden di lima kabupaten.",
  authorName: "Prof. Dr. Maria Kusuma",
  year: 2026,
  facultyName: "Fakultas Ekonomi dan Bisnis",
  categoryName: "Ekonomi Digital",
  keywords: ["digitalisasi", "UMKM", "produktivitas", "ekonomi digital"],
  downloadCount: 512,
  publishedAt: "2026-08-15",
  coverTheme: "ekonomi",
};

export const dummyLatestArticles: PublicArticle[] = [
  {
    id: "art_pub_2",
    title: "Analisis Efisiensi Energi Terbarukan pada Sistem Panel Surya Terdistribusi",
    abstract: "Mengkaji efisiensi konversi energi pada sistem panel surya terdistribusi di wilayah tropis.",
    authorName: "Dr. Andi Wijaya",
    year: 2025,
    facultyName: "Fakultas Teknik",
    categoryName: "Teknik Elektro",
    keywords: ["energi terbarukan", "panel surya", "efisiensi"],
    downloadCount: 342,
    publishedAt: "2025-11-10",
    coverTheme: "teknik",
  },
  {
    id: "art_pub_3",
    title: "Model Prediksi Inflasi Regional Berbasis Data Time Series",
    abstract: "Mengusulkan model prediksi inflasi regional menggunakan pendekatan time series hybrid.",
    authorName: "Dr. Siti Rahma",
    year: 2025,
    facultyName: "Fakultas Ekonomi",
    categoryName: "Ekonomi Moneter",
    keywords: ["inflasi", "time series", "ekonomi regional"],
    downloadCount: 198,
    publishedAt: "2025-10-22",
    coverTheme: "ekonomi",
  },
  {
    id: "art_pub_4",
    title: "Penanganan Stunting di Daerah Pesisir: Studi Kasus Multisektor",
    abstract: "Meninjau efektivitas intervensi multisektor dalam penanganan stunting di wilayah pesisir.",
    authorName: "Prof. Budi Santoso",
    year: 2024,
    facultyName: "Fakultas Kedokteran",
    categoryName: "Kesehatan Masyarakat",
    keywords: ["stunting", "kesehatan pesisir", "intervensi multisektor"],
    downloadCount: 276,
    publishedAt: "2024-09-05",
    coverTheme: "kedokteran",
  },
  {
    id: "art_pub_5",
    title: "Etika Kecerdasan Buatan dalam Pendidikan Tinggi",
    abstract: "Membahas kerangka etika penggunaan kecerdasan buatan dalam proses belajar-mengajar.",
    authorName: "Dr. Nadia Putri",
    year: 2025,
    facultyName: "Fakultas Pendidikan",
    categoryName: "Teknologi Pendidikan",
    keywords: ["etika AI", "kecerdasan buatan", "pendidikan tinggi"],
    downloadCount: 164,
    publishedAt: "2025-07-18",
    coverTheme: "pendidikan",
  },
  {
    id: "art_pub_6",
    title: "Kebijakan Hukum Lingkungan Pesisir dalam Perspektif Otonomi Daerah",
    abstract: "Menganalisis efektivitas kebijakan hukum lingkungan pesisir pasca desentralisasi.",
    authorName: "Prof. Lestari",
    year: 2024,
    facultyName: "Fakultas Hukum",
    categoryName: "Hukum Lingkungan",
    keywords: ["hukum lingkungan", "otonomi daerah", "pesisir"],
    downloadCount: 845,
    publishedAt: "2024-04-12",
    coverTheme: "hukum",
  },
];

export const dummyMostDownloaded: PublicArticle[] = [
  {
    id: "art_pub_7",
    title: "Metodologi Riset Kualitatif dalam Ilmu Sosial",
    abstract: "Panduan komprehensif metodologi riset kualitatif untuk penelitian ilmu sosial.",
    authorName: "Prof. Hendra",
    year: 2023,
    facultyName: "Fakultas Ilmu Sosial",
    categoryName: "Metodologi Penelitian",
    keywords: ["metodologi", "riset kualitatif", "ilmu sosial"],
    downloadCount: 1204,
    publishedAt: "2023-03-01",
    coverTheme: "pendidikan",
  },
  {
    id: "art_pub_8",
    title: "Dasar-Dasar Machine Learning untuk Pemula",
    abstract: "Pengantar konsep dasar machine learning beserta studi kasus penerapannya.",
    authorName: "Dr. Rian Saputra",
    year: 2024,
    facultyName: "Fakultas Teknik",
    categoryName: "Ilmu Komputer",
    keywords: ["machine learning", "AI", "ilmu komputer"],
    downloadCount: 980,
    publishedAt: "2024-02-14",
    coverTheme: "komputer",
  },
  {
    id: "art_pub_9",
    title: "Hukum Lingkungan dan Kebijakan Publik di Indonesia",
    abstract: "Meninjau perkembangan regulasi lingkungan dan implikasinya terhadap kebijakan publik.",
    authorName: "Prof. Lestari",
    year: 2024,
    facultyName: "Fakultas Hukum",
    categoryName: "Hukum Lingkungan",
    keywords: ["hukum lingkungan", "kebijakan publik", "regulasi"],
    downloadCount: 845,
    publishedAt: "2024-04-12",
    coverTheme: "hukum",
  },
];

// Gabungan semua artikel publik — dipakai untuk halaman detail & pencarian,
// supaya cukup satu sumber data yang di-lookup berdasarkan id.
export const dummyAllPublicArticles: PublicArticle[] = [
  dummyFeaturedArticle,
  ...dummyLatestArticles,
  ...dummyMostDownloaded,
];

export function getPublicArticleById(id: string): PublicArticle | undefined {
  return dummyAllPublicArticles.find((article) => article.id === id);
}

// Artikel lain dari fakultas yang sama, untuk section "Artikel terkait" di halaman detail.
export function getRelatedArticles(current: PublicArticle, take = 5): PublicArticle[] {
  return dummyAllPublicArticles
    .filter((a) => a.id !== current.id && a.facultyName === current.facultyName)
    .slice(0, take);
}

// Pencarian sederhana di sisi memory untuk dummy data.
// Nanti diganti articleService.searchPublicArticles({ query, facultyId, categoryId, page })
// yang query ke database lewat articleRepository.findPublished (lihat lib/repositories/articleRepository.ts —
// logika filter di sana sudah didesain agar polanya sama persis dengan fungsi ini).
export function searchPublicArticles(params: { query?: string; facultyName?: string }): PublicArticle[] {
  const { query, facultyName } = params;
  const normalizedQuery = query?.trim().toLowerCase();

  return dummyAllPublicArticles.filter((article) => {
    const matchesFaculty = !facultyName || article.facultyName.includes(facultyName);

    const matchesQuery =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.authorName.toLowerCase().includes(normalizedQuery) ||
      article.keywords.some((k) => k.toLowerCase().includes(normalizedQuery));

    return matchesFaculty && matchesQuery;
  });
}
