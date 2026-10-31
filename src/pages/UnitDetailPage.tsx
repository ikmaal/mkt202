import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { units } from "../data/units";
import { loadProgress, saveProgress } from "../lib/storage";

export function UnitDetailPage() {
  const { unitId } = useParams();
  const id = Number(unitId);
  const unit = units.find((u) => u.id === id);
  const [progress, setProgress] = useState(loadProgress);

  const sectionKey = (sectionId: string) => `${id}-${sectionId}`;

  const toggleSection = (sectionId: string) => {
    const key = sectionKey(sectionId);
    const next = { ...progress, sectionsRead: { ...progress.sectionsRead } };
    next.sectionsRead[key] = !next.sectionsRead[key];
    if (next.sectionsRead[key] && !next.unitsRead.includes(id)) {
      next.unitsRead = [...next.unitsRead, id];
    }
    setProgress(next);
    saveProgress(next);
  };

  const readCount = useMemo(
    () =>
      unit
        ? unit.sections.filter((s) => progress.sectionsRead[sectionKey(s.id)]).length
        : 0,
    [unit, progress],
  );

  if (!unit) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-ink-600">Unit not found.</p>
        <Link to="/study" className="mt-4 inline-block text-accent">
          Back to study
        </Link>
      </div>
    );
  }

  const prev = units.find((u) => u.id === id - 1);
  const nextUnit = units.find((u) => u.id === id + 1);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/study" className="text-sm font-medium text-accent hover:underline">
        ← All units
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
        {unit.title}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-ink-900">{unit.subtitle}</h1>
      <p className="mt-2 text-sm text-ink-500">{unit.textbook}</p>
      <p className="mt-4 text-sm text-ink-600">
        {readCount}/{unit.sections.length} sections marked read
      </p>

      <div className="mt-6 rounded-xl border border-accent/20 bg-accent-light/50 p-4">
        <p className="text-xs font-semibold uppercase text-accent">Exam focus</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-700">
          {unit.examFocus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-8">
        {unit.sections.map((section, idx) => {
          const key = sectionKey(section.id);
          const isRead = !!progress.sectionsRead[key];
          return (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-ink-900">
                  {idx + 1}. {section.title}
                </h2>
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    isRead
                      ? "bg-accent text-white"
                      : "border border-ink-200 text-ink-600 hover:bg-ink-50"
                  }`}
                >
                  {isRead ? "Read ✓" : "Mark read"}
                </button>
              </div>
              {section.content && (
                <p className="mt-3 leading-relaxed text-ink-700">{section.content}</p>
              )}
              {section.callout && (
                <p className="mt-3 rounded-lg border-l-4 border-accent bg-ink-50 px-4 py-3 text-sm text-ink-700">
                  {section.callout}
                </p>
              )}
              {section.list && (
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-700">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      <nav className="mt-10 flex justify-between border-t border-ink-100 pt-6 text-sm">
        {prev ? (
          <Link to={`/study/${prev.id}`} className="font-medium text-accent">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {nextUnit ? (
          <Link to={`/study/${nextUnit.id}`} className="font-medium text-accent">
            {nextUnit.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
