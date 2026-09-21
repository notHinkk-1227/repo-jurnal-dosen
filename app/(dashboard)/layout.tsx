import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <DashboardSidebar />
      <div className="flex-1 px-10 py-8">{children}</div>
    </div>
  );
}
