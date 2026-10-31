import { Link } from "react-router-dom";
import { units } from "../data/units";
import { loadProgress } from "../lib/storage";

export function StudyListPage() {
  const progress = loadProgress();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-ink-900">Study materials</h1>
      <p className="mt-2 text-ink-600">
        Content follows the July ’26 semester summary. Mark sections as read to track progress.
      </p>
      <div className="mt-8 grid gap-4">
        {units.map((u) => {
          const done = u.sections.filter(
            (s) => progress.sectionsRead[`${u.id}-${s.id}`],
          ).length;
          return (
            <Link
              key={u.id}
              to={`/study/${u.id}`}
              className="block rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition hover:shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {u.title}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-ink-900">
                    {u.subtitle}
                  </h2>
                  <p className="mt-2 text-sm text-ink-500">{u.textbook}</p>
                </div>
                <span className="rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600">
                  {done}/{u.sections.length} read
                </span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {u.examFocus.slice(0, 3).map((f) => (
                  <li
                    key={f}
                    className="rounded-md bg-ink-50 px-2 py-1 text-xs text-ink-600"
                  >
                    {f}
                  </li>
                ))}
                {u.examFocus.length > 3 && (
                  <li className="text-xs text-ink-400">+{u.examFocus.length - 3} more</li>
                )}
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
