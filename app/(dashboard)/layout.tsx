import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { dummyCurrentDosen } from "@/lib/dummy-data";

// TODO: ganti dummyCurrentDosen dengan data session asli dari NextAuth
// begitu lib/auth.ts terhubung penuh ke halaman ini.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <DashboardSidebar userName={dummyCurrentDosen.name} userRole="Dosen" />
      <div className="flex-1 px-10 py-8">{children}</div>
    </div>
  );
}
