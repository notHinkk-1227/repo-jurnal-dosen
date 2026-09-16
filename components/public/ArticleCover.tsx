import { Zap, TrendingUp, HeartPulse, Brain, Scale, Cpu, type LucideIcon } from "lucide-react";
import { COVER_THEMES, type CoverThemeKey } from "@/lib/dummy-data";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  "trending-up": TrendingUp,
  "heart-pulse": HeartPulse,
  brain: Brain,
  scale: Scale,
  cpu: Cpu,
};

// Cover ter-generate dari template (warna + ikon sesuai bidang keilmuan + judul),
// mengimplementasikan konsep TemplateCoverStrategy di lib/services/coverService.ts.
// Belum ada cover asli (upload dosen / render dari sharp) — lihat CLAUDE.md.
export function ArticleCover({
  title,
  theme,
  size = "md",
}: {
  title: string;
  theme: CoverThemeKey;
  size?: "sm" | "md" | "lg";
}) {
  const config = COVER_THEMES[theme];
  const Icon = ICONS[config.icon];

  const sizeClass = {
    sm: "h-[180px]",
    md: "h-[200px]",
    lg: "h-[220px] w-[150px]",
  }[size];

  return (
    <div
      className={`flex w-full flex-col justify-between rounded-lg p-3.5 ${config.bgClass} ${sizeClass}`}
    >
      <Icon className={`h-5 w-5 ${config.fgClass}`} strokeWidth={1.75} />
      <p className={`text-[13px] font-medium leading-snug ${config.fgClass}`}>{title}</p>
    </div>
  );
}
