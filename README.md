# Repositori Karya Ilmiah Dosen

Struktur awal project. Baca `PRD.md` (kebutuhan produk) dan `CLAUDE.md` (panduan arsitektur & coding) sebelum melanjutkan development.

## Menjalankan Project

1. Install dependency:
   ```bash
   npm install
   ```

2. Siapkan database PostgreSQL lokal (atau pakai layanan cloud seperti Supabase/Neon untuk development juga).

3. Salin `.env.example` menjadi `.env`, lalu isi `DATABASE_URL` dan `AUTH_SECRET`.

4. Generate Prisma Client & jalankan migrasi awal:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Jalankan development server:
   ```bash
   npm run dev
   ```

## Struktur Folder

```
app/
  (public)/            # halaman publik: homepage, detail artikel, hasil pencarian
  (dashboard)/          # halaman dosen & admin (perlu auth)
  api/
    articles/            # endpoint CRUD artikel
    auth/                 # endpoint auth (NextAuth)
    upload/               # endpoint upload file & cover
prisma/
  schema.prisma          # skema database
lib/
  db.ts                   # instance Prisma Client
  auth.ts                  # konfigurasi NextAuth
  services/                # business logic (articleService, coverService, dst)
  repositories/            # akses data via Prisma
  storage/                 # abstraksi file storage (lokal vs cloud)
components/               # komponen UI reusable
```

## Status Saat Ini

Yang sudah dibuat:
- Setup project Next.js (TypeScript, Tailwind, App Router)
- Struktur folder sesuai CLAUDE.md
- Skema database awal (`prisma/schema.prisma`) — masih perlu direview & didetailkan
- Skeleton layer: repository, service, storage, route handler artikel
- Konfigurasi dasar NextAuth (Credentials provider)

Yang belum diimplementasikan (masih berupa `TODO`/placeholder):
- Implementasi nyata `TemplateCoverStrategy` (generate cover pakai `sharp`/`canvas`)
- Implementasi nyata `LocalStorage`/`CloudStorage` untuk upload file
- Mengambil `authorId` dari session NextAuth di route handler artikel (saat ini masih placeholder string)
- Halaman UI (`app/(public)`, `app/(dashboard)`) — baru berupa folder kosong
- Migrasi database (`npx prisma migrate dev`) — belum dijalankan, perlu koneksi database aktif

## Catatan

Project ini di-scaffold di lingkungan sandbox yang tidak punya akses ke `binaries.prisma.sh`, sehingga `npx prisma generate` belum sempat dijalankan/diverifikasi di sini. Jalankan perintah tersebut begitu project ini ada di komputer kamu sendiri.
