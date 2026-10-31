import { useCallback, useEffect, useMemo, useState } from "react";
import { units } from "../data/units";
import { flashcards } from "../data/flashcards";
import { loadProgress, saveProgress } from "../lib/storage";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsPage() {
  const [unitFilter, setUnitFilter] = useState<number | "all">("all");
  const [deck, setDeck] = useState(() => flashcards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(loadProgress);
  const [reviewUnknownOnly, setReviewUnknownOnly] = useState(false);

  const filteredBase = useMemo(() => {
    let list =
      unitFilter === "all"
        ? flashcards
        : flashcards.filter((c) => c.unitId === unitFilter);
    if (reviewUnknownOnly) {
      list = list.filter((c) => !progress.flashcardKnown[c.id]);
    }
    return list;
  }, [unitFilter, reviewUnknownOnly, progress.flashcardKnown]);

  const card = deck[index];

  const rebuildDeck = useCallback(() => {
    setDeck(shuffle(filteredBase));
    setIndex(0);
    setFlipped(false);
  }, [filteredBase]);

  useEffect(() => {
    rebuildDeck();
  }, [rebuildDeck]);

  const markKnown = (known: boolean) => {
    if (!card) return;
    const next = {
      ...progress,
      flashcardKnown: { ...progress.flashcardKnown, [card.id]: known },
    };
    setProgress(next);
    saveProgress(next);
    goNext();
  };

  const goNext = () => {
    setFlipped(false);
    if (index + 1 >= deck.length) {
      setIndex(0);
      return;
    }
    setIndex((i) => i + 1);
  };

  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + deck.length) % deck.length);
  };

  const knownCount = Object.values(progress.flashcardKnown).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-ink-900">Flashcards</h1>
      <p className="mt-2 text-ink-600">
        Tap the card to flip. Mark “Got it” when you can recall the answer without peeking.
      </p>
      <p className="mt-1 text-sm text-ink-500">
        Mastered: {knownCount} / {flashcards.length}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={unitFilter === "all" ? "all" : String(unitFilter)}
          onChange={(e) => {
            const v = e.target.value;
            setUnitFilter(v === "all" ? "all" : Number(v));
          }}
          className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
        >
          <option value="all">All units</option>
          {units.map((u) => (
            <option key={u.id} value={u.id}>
              {u.title}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={reviewUnknownOnly}
            onChange={(e) => setReviewUnknownOnly(e.target.checked)}
          />
          Review unknown only
        </label>
        <button
          type="button"
          onClick={rebuildDeck}
          className="rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium hover:bg-ink-50"
        >
          Shuffle deck
        </button>
      </div>

      {deck.length === 0 || filteredBase.length === 0 ? (
        <p className="mt-12 text-center text-ink-500">
          No cards in this filter — turn off “unknown only” or pick another unit, then shuffle.
        </p>
      ) : (
        <>
          <div className="mt-10 perspective-1000">
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="relative mx-auto block h-64 w-full max-w-md cursor-pointer text-left"
              aria-label="Flip flashcard"
            >
              <div
                className={`relative h-full w-full transition-transform duration-500 preserve-3d ${
                  flipped ? "rotate-y-180" : ""
                }`}
                style={{
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div className="absolute inset-0 flex flex-col rounded-2xl border border-ink-100 bg-white p-8 shadow-card backface-hidden">
                  {card.tag && (
                    <span className="text-xs font-medium text-accent">{card.tag}</span>
                  )}
                  <p className="mt-4 flex flex-1 items-center text-lg font-medium leading-snug text-ink-900">
                    {card.front}
                  </p>
                  <p className="text-xs text-ink-400">Tap to reveal answer</p>
                </div>
                <div
                  className="absolute inset-0 flex flex-col rounded-2xl border border-accent/30 bg-accent-light p-8 shadow-card backface-hidden rotate-y-180"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <p className="text-xs font-medium text-accent">Answer</p>
                  <p className="mt-4 flex flex-1 items-center text-base leading-relaxed text-ink-800">
                    {card.back}
                  </p>
                </div>
              </div>
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-ink-500">
            Card {index + 1} of {deck.length} · Unit {card.unitId}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="rounded-lg border border-ink-200 px-4 py-2 text-sm"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => markKnown(false)}
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900"
            >
              Still learning
            </button>
            <button
              type="button"
              onClick={() => markKnown(true)}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white"
            >
              Got it
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-lg border border-ink-200 px-4 py-2 text-sm"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
