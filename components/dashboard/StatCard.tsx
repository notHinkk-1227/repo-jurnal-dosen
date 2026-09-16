export function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-5 py-4">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-1.5 font-serif text-[28px] leading-none text-ink">{value}</p>
      {helper ? <p className="mt-1.5 text-xs text-ink-soft">{helper}</p> : null}
    </div>
  );
}
