"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// TODO: ganti simulasi di bawah dengan signIn("credentials", { email, password })
// dari next-auth/react begitu koneksi database & NextAuth benar-benar aktif.
// Konfigurasi provider-nya sudah ada di lib/auth.ts.
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    // Simulasi delay request — dihapus begitu terhubung ke NextAuth sungguhan.
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Dummy: anggap login selalu berhasil, arahkan ke dashboard dosen.
    // Nanti logic ini pindah ke authorize() di lib/auth.ts (sudah ada),
    // dan role user (DOSEN/ADMIN) menentukan redirect ke /dosen atau /admin.
    router.push("/dosen");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error ? (
        <p className="rounded-md bg-status-rejected-soft px-3 py-2 text-sm text-status-rejected">
          {error}
        </p>
      ) : null}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@kampus.ac.id"
          className="mt-1.5 w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink">
          Kata sandi
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
