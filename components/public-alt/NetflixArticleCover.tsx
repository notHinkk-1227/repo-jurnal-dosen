import { Zap, TrendingUp, HeartPulse, Brain, Scale, Cpu, type LucideIcon } from "lucide-react";
import { NETFLIX_COVER_THEMES } from "@/components/public-alt/NetflixCoverThemes";
import type { CoverThemeKey } from "@/lib/dummy-data";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  "trending-up": TrendingUp,
  "heart-pulse": HeartPulse,
  brain: Brain,
  scale: Scale,
  cpu: Cpu,
};

export function NetflixArticleCover({
  title,
  theme,
  size = "row",
}: {
  title: string;
  theme: CoverThemeKey;
  size?: "row" | "hero";
}) {
  const config = NETFLIX_COVER_THEMES[theme];
  const Icon = ICONS[config.icon];
  const heightClass = size === "hero" ? "h-[280px]" : "h-[215px]";

  return (
    <div
      className={`flex w-full flex-col justify-between rounded-md p-3 transition-transform duration-300 ease-out hover:scale-105 ${heightClass}`}
      style={{ backgroundColor: config.bg }}
    >
      <Icon className="h-5 w-5" style={{ color: config.fg }} strokeWidth={1.75} />
      <p className="text-[13px] font-medium leading-snug" style={{ color: config.fg }}>
        {title}
      </p>
    </div>
  );
}
