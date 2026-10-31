import { useMemo, useState } from "react";
import { units } from "../data/units";
import { quizQuestions, type QuizQuestion } from "../data/quizzes";
import { loadProgress, saveProgress } from "../lib/storage";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizPage() {
  const [unitFilter, setUnitFilter] = useState<number | "all">("all");
  const [pool, setPool] = useState<QuizQuestion[]>(() => shuffle(quizQuestions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const filtered = useMemo(() => {
    if (unitFilter === "all") return quizQuestions;
    return quizQuestions.filter((q) => q.unitId === unitFilter);
  }, [unitFilter]);

  const current = pool[index];

  const startQuiz = () => {
    const base = unitFilter === "all" ? quizQuestions : filtered;
    setPool(shuffle(base));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const submitAnswer = (optionIndex: number) => {
    if (selected !== null || !current) return;
    setSelected(optionIndex);
    const correct = optionIndex === current.correctIndex;
    if (correct) setScore((s) => s + 1);

    const progress = loadProgress();
    const key = unitFilter === "all" ? "all" : String(unitFilter);
    const pct = Math.round(
      (((correct ? score + 1 : score) / pool.length) * 100) || 0,
    );
    if (!progress.quizBest[key] || pct > progress.quizBest[key]) {
      progress.quizBest[key] = pct;
      saveProgress(progress);
    }
  };

  const next = () => {
    if (index + 1 >= pool.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-ink-900">Quick quiz</h1>
      <p className="mt-2 text-ink-600">
        Multiple-choice based on your summary. Read explanations even when you’re correct.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <label className="block text-sm">
          <span className="font-medium text-ink-700">Filter by unit</span>
          <select
            value={unitFilter === "all" ? "all" : String(unitFilter)}
            onChange={(e) => {
              const v = e.target.value;
              setUnitFilter(v === "all" ? "all" : Number(v));
            }}
            className="mt-1 block w-full min-w-[200px] rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All units ({quizQuestions.length})</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.title} (
                {quizQuestions.filter((q) => q.unitId === u.id).length})
              </option>
            ))}
            <option value="0">General revision</option>
          </select>
        </label>
        <button
          type="button"
          onClick={startQuiz}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {finished || !current ? "Start / restart" : "Restart"}
        </button>
      </div>

      {finished && (
        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-8 text-center shadow-card">
          <p className="text-sm text-ink-500">Session complete</p>
          <p className="mt-2 text-3xl font-semibold text-ink-900">
            {score} / {pool.length}
          </p>
          <p className="mt-2 text-ink-600">
            {score === pool.length
              ? "Perfect — review scenario practice next."
              : "Review missed topics in Study, then retry."}
          </p>
          <button
            type="button"
            onClick={startQuiz}
            className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      )}

      {!finished && current && (
        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
          <p className="text-xs font-medium text-ink-400">
            Question {index + 1} of {pool.length}
            {current.unitId > 0 && ` · Unit ${current.unitId}`}
          </p>
          <h2 className="mt-3 text-lg font-medium leading-snug text-ink-900">
            {current.question}
          </h2>
          <ul className="mt-6 space-y-2">
            {current.options.map((opt, i) => {
              let style =
                "border-ink-200 hover:border-accent/40 hover:bg-ink-50";
              if (selected !== null) {
                if (i === current.correctIndex)
                  style = "border-green-500 bg-green-50";
                else if (i === selected)
                  style = "border-red-300 bg-red-50";
                else style = "border-ink-100 opacity-60";
              }
              return (
                <li key={opt}>
                  <button
                    type="button"
                    disabled={selected !== null}
                    onClick={() => submitAnswer(i)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${style}`}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
          {selected !== null && (
            <div className="mt-6">
              <p className="rounded-lg bg-ink-50 px-4 py-3 text-sm text-ink-700">
                <span className="font-semibold">Explanation: </span>
                {current.explanation}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-4 w-full rounded-lg bg-ink-900 py-2.5 text-sm font-medium text-white"
              >
                {index + 1 >= pool.length ? "See results" : "Next question"}
              </button>
            </div>
          )}
        </div>
      )}

      {!finished && !current && (
        <p className="mt-8 text-center text-ink-500">
          Press Start to begin ({filtered.length} questions in this filter).
        </p>
      )}
    </div>
  );
}
