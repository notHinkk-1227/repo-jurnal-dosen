# PRD — Repositori Karya Ilmiah Dosen

## 1. Ringkasan Produk

Website perpustakaan digital (institutional repository) untuk menghimpun, mengelola, dan mempublikasikan artikel/jurnal ilmiah yang dibuat oleh dosen dalam suatu universitas. Produk ini memungkinkan dosen mengunggah karya ilmiah secara mandiri, admin/pustakawan melakukan verifikasi sebelum publikasi, dan publik (mahasiswa, peneliti, masyarakat umum) mencari serta mengunduh karya ilmiah yang telah dipublikasikan.

## 2. Tujuan Produk

- Menyediakan wadah terpusat untuk karya ilmiah dosen dalam satu universitas
- Meningkatkan visibilitas dan aksesibilitas karya ilmiah dosen secara publik
- Mendukung kebutuhan administratif kampus (akreditasi, SINTA, laporan karya ilmiah)
- Memberikan pengalaman pencarian dan penjelajahan yang modern, tidak sekadar daftar tabel statis

## 3. Target Pengguna

| Peran | Kebutuhan Utama |
|---|---|
| Dosen | Mengunggah karya ilmiah, melihat status verifikasi, melihat statistik unduhan karyanya |
| Admin/Pustakawan | Memverifikasi/menyetujui karya yang diunggah, mengelola metadata, mengelola kategori/fakultas |
| Publik (mahasiswa/peneliti/umum) | Mencari, membaca, dan mengunduh karya ilmiah yang telah dipublikasikan |

## 4. Fitur Utama

### 4.1 Manajemen Naskah
- Upload PDF/dokumen karya ilmiah
- Input metadata: judul, abstrak, nama penulis, tahun, kata kunci, fakultas/prodi, kategori
- Cover artikel (lihat bagian 7)

### 4.2 Pencarian & Filter
- Pencarian berbasis judul, penulis, kata kunci
- Filter berdasarkan fakultas/prodi, tahun, kategori

### 4.3 Role & Akses
- **Admin**: verifikasi, kelola metadata, kelola kategori/fakultas
- **Dosen**: upload mandiri, lihat status karya sendiri
- **Publik**: baca dan unduh karya yang sudah dipublikasikan

### 4.4 Approval Workflow
- Dosen upload → status "menunggu verifikasi"
- Admin verifikasi → status "dipublikasikan" atau "ditolak" (dengan catatan revisi)

### 4.5 Statistik
- Jumlah unduhan per artikel
- Jumlah sitasi (jika tersedia)
- Ranking penulis berdasarkan jumlah karya/unduhan

### 4.6 Integrasi (Potensial, Fase Lanjutan)
- DOI
- Google Scholar
- SINTA/Garuda
- OAI-PMH (agar terindeks mesin pencari akademik)

## 5. Tech Stack

| Bagian | Pilihan | Catatan |
|---|---|---|
| Frontend | Next.js (React) | SSR/SSG untuk SEO, penting agar artikel terindeks Google/Google Scholar |
| Backend | Next.js API Routes (pendekatan full-stack) | Satu project, cocok untuk tim kecil/solo; dapat dimigrasi ke Express/NestJS terpisah di kemudian hari bila dibutuhkan (misal untuk mendukung aplikasi mobile) |
| Database | PostgreSQL | Data relasional (dosen–artikel–fakultas–kategori) |
| ORM | Prisma | Type-safe, terintegrasi baik dengan Next.js |
| Auth | NextAuth.js (Auth.js) | Sesuai pendekatan full-stack Next.js |
| File Storage | Lokal (development) → Vercel Blob/Cloudflare R2 (production) | Server Vercel bersifat serverless, tidak cocok untuk penyimpanan file permanen |

**Skala data:** ±1000 record, tergolong kecil — aman dijalankan di free tier layanan cloud (Vercel, Supabase/Neon, Vercel Blob/Cloudflare R2).

## 6. Rencana Deployment

1. Pindahkan database dari lokal ke cloud (Supabase / Neon / Railway)
2. Push kode ke GitHub
3. Deploy ke Vercel (terhubung otomatis via GitHub)
4. Atur Environment Variables di Vercel (connection string DB, secret auth, dll)
5. Jalankan migrasi Prisma ke database production
6. Setup penyimpanan file PDF (Vercel Blob / Cloudflare R2)
7. (Opsional) Hubungkan domain resmi kampus via DNS

**Catatan:** Perlu dicek apakah universitas memiliki kebijakan hosting mandiri (VPS/server internal via bagian IT/PUSKOM) yang mungkin diutamakan dibanding platform pihak ketiga.

## 7. Konsep Desain UI

**Arah desain:** Terinspirasi pola interaksi Netflix, diadaptasi agar tetap formal/akademik.

**Elemen yang diadopsi:**
- Hero/banner section untuk artikel unggulan (featured article)
- Carousel/row horizontal per kategori ("Artikel Terbaru", "Paling Banyak Diunduh")
- Card visual dengan cover artikel, bukan hanya list/tabel teks

**Penyesuaian agar tetap formal:**
- Hero menonjolkan tipografi + cover kecil, bukan foto besar
- Konten hero tetap memuat informasi akademik lengkap: nama penulis dengan gelar, fakultas, tanggal publikasi, ringkasan abstrak
- Cover artikel berupa template (warna + ikon representasi bidang studi + judul), bukan foto/ilustrasi bebas
- Search bar sebagai elemen utama di bagian atas halaman (pengguna repository umumnya datang dengan tujuan pencarian spesifik)
- Filter chip (fakultas/kategori) untuk navigasi cepat

**Rencana cover artikel:**
- Digenerate otomatis dari template (judul + penulis + warna/ikon sesuai fakultas), menggunakan library seperti `canvas` atau `sharp` di Node.js
- Dosen dapat mengunggah cover sendiri sebagai override opsional
- Alternatif yang dipertimbangkan namun kurang direkomendasikan: screenshot otomatis dari halaman pertama PDF (kurang menarik secara visual)

**Referensi UI pembanding:** Google Scholar, ResearchGate, Semantic Scholar (search-first, metadata jelas, tetap kredibel).

## 8. Referensi Repository Sejenis

- Repository Universitas Indonesia — http://repository.ui.ac.id/
- Portal Karya Ilmiah & Digital Repository UII — https://library.uii.ac.id/e-resources/
- Repository Universitas Surabaya — http://elib.ubaya.ac.id/lib/f-a-q/f-a-q-repository/
- Software open-source sejenis: **DSpace** (institutional repository), **OJS/Open Journal Systems** (manajemen jurnal elektronik)

## 9. Ruang Lingkup (Scope)

### Dalam lingkup (Fase 1)
- Upload, verifikasi, publikasi karya ilmiah
- Pencarian, filter, halaman detail artikel
- Statistik unduhan dasar
- Cover artikel otomatis (template)

### Di luar lingkup Fase 1 (potensi fase lanjutan)
- Integrasi DOI, SINTA/Garuda, OAI-PMH
- Sistem sitasi otomatis/citation graph
- Aplikasi mobile terpisah
- Personalisasi rekomendasi artikel

## 10. Langkah Selanjutnya

- [ ] Rancang skema database / ERD (entitas: Dosen, Artikel, Fakultas, Kategori, Cover, dll)
- [ ] Buat struktur folder awal project (Next.js + Prisma + PostgreSQL)
- [ ] Tentukan strategi hosting: Vercel vs server kampus (VPS)
- [ ] Desain mockup halaman detail artikel dan halaman hasil pencarian
- [ ] Tentukan mekanisme generate cover otomatis (template + library)
