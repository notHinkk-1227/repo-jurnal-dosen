"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dummyCurrentAdmin, dummyCurrentDosen } from "@/lib/dummy-data";

const DOSEN_NAV_ITEMS = [
  { href: "/dosen", label: "Ringkasan" },
  { href: "/dosen/artikel", label: "Artikel saya" },
  { href: "/dosen/unggah", label: "Unggah artikel" },
];

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Antrean verifikasi" },
  { href: "/admin/kelola", label: "Fakultas & kategori" },
];

// Sidebar otomatis menyesuaikan menu & identitas berdasarkan area yang sedang
// dibuka (/dosen/* vs /admin/*). Client component karena butuh usePathname.
// TODO: ganti dummyCurrentDosen/dummyCurrentAdmin dengan data session NextAuth
// (role user menentukan area mana yang boleh diakses).
export function DashboardSidebar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const navItems = isAdmin ? ADMIN_NAV_ITEMS : DOSEN_NAV_ITEMS;
  const user = isAdmin ? dummyCurrentAdmin : dummyCurrentDosen;
  const roleLabel = isAdmin ? "Admin" : "Dosen";

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface px-5 py-6">
      <div className="mb-8">
        <p className="font-serif text-lg leading-tight text-ink">Repositori</p>
        <p className="font-serif text-lg leading-tight text-ink">Karya Ilmiah</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-paper text-ink" : "text-ink-soft hover:bg-paper hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border pt-4">
        <p className="text-sm font-medium text-ink">{user.name}</p>
        <p className="text-xs text-ink-soft">{roleLabel}</p>
      </div>
    </aside>
  );
}
