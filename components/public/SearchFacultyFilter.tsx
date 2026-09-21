import Link from "next/link";
import { dummyFaculties } from "@/lib/dummy-data";

export function SearchFacultyFilter({
  query,
  activeFaculty,
}: {
  query?: string;
  activeFaculty?: string;
}) {
  function buildHref(facultyName?: string) {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (facultyName) params.set("faculty", facultyName);
    const qs = params.toString();
    return qs ? `/search?${qs}` : "/search";
  }

  const chips = [{ name: undefined, label: "Semua fakultas" }, ...dummyFaculties.map((f) => ({ name: f.name, label: f.name }))];

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isActive = activeFaculty === chip.name || (!activeFaculty && !chip.name);
        return (
          <Link
            key={chip.label}
            href={buildHref(chip.name)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-brass-soft text-brass"
                : "border border-border text-ink-soft hover:bg-paper"
            }`}
          >
            {chip.label}
          </Link>
        );
      })}
    </div>
  );
}
