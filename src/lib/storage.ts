const PREFIX = "mkt202-study";

export type Progress = {
  unitsRead: number[];
  sectionsRead: Record<string, boolean>;
  flashcardKnown: Record<string, boolean>;
  quizBest: Record<string, number>;
  lastVisit: string;
};

const defaultProgress = (): Progress => ({
  unitsRead: [],
  sectionsRead: {},
  flashcardKnown: {},
  quizBest: {},
  lastVisit: new Date().toISOString(),
});

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(`${PREFIX}-progress`);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p: Progress) {
  p.lastVisit = new Date().toISOString();
  localStorage.setItem(`${PREFIX}-progress`, JSON.stringify(p));
}

export function daysUntilExam(exam: Date): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(exam.getFullYear(), exam.getMonth(), exam.getDate());
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
