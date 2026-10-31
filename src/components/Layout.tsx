import { NavLink, Outlet } from "react-router-dom";
import { EXAM_DATE } from "./data/units";
import { daysUntilExam } from "./lib/storage";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/study", label: "Study" },
  { to: "/quiz", label: "Quiz" },
  { to: "/flashcards", label: "Flashcards" },
  { to: "/practice", label: "Practice" },
];

export function Layout() {
  const days = daysUntilExam(EXAM_DATE);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                M
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-900">
                  MKT202 Study
                </p>
                <p className="truncate text-xs text-ink-500">
                  Marketing Management · Jul ’26 summary
                </p>
              </div>
            </div>
            <div
              className="hidden sm:flex items-center gap-2 rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600"
              title="Exam date: 11 Nov 2026"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {days > 0 ? (
                <>
                  <span className="text-ink-900">{days}</span> days to exam
                </>
              ) : days === 0 ? (
                "Exam day — good luck!"
              ) : (
                "Exam period"
              )}
            </div>
          </div>
          <nav className="-mb-px flex gap-1 overflow-x-auto pb-0 scrollbar-none">
            {nav.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-t-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-b-2 border-accent text-accent"
                      : "text-ink-500 hover:text-ink-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-ink-100 py-6 text-center text-xs text-ink-400">
        Content aligned to MKT202 July ’26 concept summary · Also revise iSmartGuide,
        Kotler 16e & past papers
      </footer>
    </div>
  );
}
