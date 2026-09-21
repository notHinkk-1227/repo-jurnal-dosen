import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginShowcasePanel } from "@/components/auth/LoginShowcasePanel";

export default function LoginPage() {
  return (
    <div className="grid h-screen overflow-hidden bg-paper lg:grid-cols-2">
      <div className="flex items-center justify-center overflow-y-auto px-6 py-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-serif text-lg text-ink">
            Repositori Karya Ilmiah
          </Link>
          <p className="mt-2 text-sm text-ink-soft">Masuk sebagai dosen atau admin</p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-xs text-ink-soft">
            Akun dosen/admin dikelola oleh bagian perpustakaan kampus.
            <br />
            Hubungi admin jika belum memiliki akses.
          </p>
        </div>
      </div>

      <LoginShowcasePanel />
    </div>
  );
}
