import { Link } from "react-router-dom";
import { units, revisionSources, EXAM_DATE } from "../data/units";
import { flashcards } from "../data/flashcards";
import { quizQuestions } from "../data/quizzes";
import { daysUntilExam, loadProgress } from "../lib/storage";

export function HomePage() {
  const progress = loadProgress();
  const days = daysUntilExam(EXAM_DATE);
  const sectionTotal = units.reduce((n, u) => n + u.sections.length, 0);
  const sectionsDone = Object.values(progress.sectionsRead).filter(Boolean).length;
  const pct = sectionTotal
    ? Math.round((sectionsDone / sectionTotal) * 100)
    : 0;
  const cardsKnown = Object.values(progress.flashcardKnown).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <section className="rounded-2xl border border-ink-100 bg-gradient-to-br from-white to-ink-50 p-8 shadow-card sm:p-10">
        <p className="text-sm font-medium text-accent">Exam · 11 November 2026</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Your MKT202 revision hub
        </h1>
        <p className="mt-3 max-w-2xl text-ink-600 leading-relaxed">
          Structured notes from your semester summary, plus quizzes, flashcards,
          and case-style practice — white, simple, focused until exam day.
        </p>
        {days > 0 && (
          <p className="mt-4 inline-flex items-center rounded-lg bg-accent-light px-3 py-2 text-sm font-medium text-accent">
            {days} day{days !== 1 ? "s" : ""} left — aim for steady daily blocks
          </p>
        )}
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Study progress" value={`${pct}%`} sub={`${sectionsDone}/${sectionTotal} sections`} />
        <StatCard label="Flashcards mastered" value={`${cardsKnown}`} sub={`of ${flashcards.length} cards`} />
        <StatCard label="Quiz pool" value={`${quizQuestions.length}`} sub="multiple-choice items" />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink-900">Start here</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ActionCard
          to="/study"
          title="Read by unit"
          desc="Six units matching your summary — exam focus tags on each."
        />
        <ActionCard
          to="/flashcards"
          title="Flashcards"
          desc="Flip, shuffle, and mark cards you know."
        />
        <ActionCard
          to="/quiz"
          title="Quick quiz"
          desc="Test definitions and tricky distinctions (pricing vs incentives, etc.)."
        />
        <ActionCard
          to="/practice"
          title="Scenario practice"
          desc="Longer prompts with model answers and checklists."
        />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink-900">Units overview</h2>
      <ul className="mt-4 space-y-2">
        {units.map((u) => (
          <li key={u.id}>
            <Link
              to={`/study/${u.id}`}
              className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3 shadow-sm transition hover:border-accent/30 hover:shadow-card"
            >
              <span>
                <span className="font-medium text-ink-900">{u.title}</span>
                <span className="text-ink-500"> — {u.subtitle}</span>
              </span>
              <span className="text-ink-400">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-ink-900">Also revise (per module)</h2>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-ink-600">
        {revisionSources.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-ink-900">{value}</p>
      <p className="text-sm text-ink-500">{sub}</p>
    </div>
  );
}

function ActionCard({
  to,
  title,
  desc,
}: {
  to: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-ink-100 bg-white p-5 shadow-sm transition hover:border-accent/40 hover:shadow-card"
    >
      <h3 className="font-semibold text-ink-900 group-hover:text-accent">{title}</h3>
      <p className="mt-1 text-sm text-ink-600">{desc}</p>
    </Link>
  );
}
