import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dosen", label: "Ringkasan" },
  { href: "/dosen/artikel", label: "Artikel saya" },
  { href: "/dosen/unggah", label: "Unggah artikel" },
];

export function DashboardSidebar({ userName, userRole }: { userName: string; userRole: string }) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface px-5 py-6">
      <div className="mb-8">
        <p className="font-serif text-lg leading-tight text-ink">Repositori</p>
        <p className="font-serif text-lg leading-tight text-ink">Karya Ilmiah</p>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-border pt-4">
        <p className="text-sm font-medium text-ink">{userName}</p>
        <p className="text-xs text-ink-soft">{userRole}</p>
      </div>
    </aside>
  );
}
