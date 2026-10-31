import { useState } from "react";
import { scenarioQuestions } from "../data/quizzes";

export function PracticePage() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const q = scenarioQuestions[index];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-ink-900">Scenario practice</h1>
      <p className="mt-2 text-ink-600">
        Exam-style application questions. Try answering in writing before revealing the model answer.
      </p>

      <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        <p className="text-xs font-medium text-ink-400">
          Scenario {index + 1} of {scenarioQuestions.length} · Unit {q.unitId}
        </p>
        <h2 className="mt-3 text-lg font-medium leading-snug text-ink-900">
          {q.prompt}
        </h2>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-8 w-full rounded-lg bg-ink-900 py-3 text-sm font-medium text-white"
          >
            Show model answer
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-accent">Model answer</p>
              <p className="mt-2 leading-relaxed text-ink-700">{q.modelAnswer}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-ink-500">
                Marking checklist
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-700">
                {q.checklist.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => i - 1);
            setRevealed(false);
          }}
          className="rounded-lg border border-ink-200 px-4 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={index >= scenarioQuestions.length - 1}
          onClick={() => {
            setIndex((i) => i + 1);
            setRevealed(false);
          }}
          className="rounded-lg border border-ink-200 px-4 py-2 text-sm disabled:opacity-40"
        >
          Next scenario
        </button>
      </div>
    </div>
  );
}
