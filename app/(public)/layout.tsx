import { PublicHeader } from "@/components/layout/PublicHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <PublicHeader />
      {children}
    </div>
  );
}
