import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function stripTypes(ts) {
  return ts
    .replace(/export type[\s\S]*?};\r?\n\r?\n/g, "")
    .replace(/import type[\s\S]*?;\r?\n/g, "")
    .replace(/: Unit\[\]/g, "")
    .replace(/: Flashcard\[\]/g, "")
    .replace(/: QuizQuestion\[\]/g, "")
    .replace(/: ScenarioQuestion\[\]/g, "")
    .replace(/: string\[\]/g, "");
}

async function loadModule(relPath, exportName) {
  const raw = fs.readFileSync(path.join(root, relPath), "utf8");
  const cleaned = stripTypes(raw);
  const tmp = path.join(
    root,
    `.cache-${path.basename(relPath, path.extname(relPath))}.mjs`,
  );
  fs.writeFileSync(tmp, cleaned);
  const mod = await import(pathToFileURL(tmp).href);
  const value = mod[exportName];
  if (value === undefined) {
    throw new Error(`Export "${exportName}" not found in ${relPath}`);
  }
  return value;
}

function pathToFileURL(p) {
  return new URL(`file:///${p.replace(/\\/g, "/")}`);
}

const units = await loadModule("src/data/units.ts", "units");
const revisionSources = await loadModule("src/data/units.ts", "revisionSources");
const flashcards = await loadModule("src/data/flashcards.ts", "flashcards");
const quizQuestions = await loadModule("src/data/quizzes.ts", "quizQuestions");
const scenarioQuestions = await loadModule("src/data/quizzes.ts", "scenarioQuestions");

const payload = {
  examDate: "2026-11-11T09:00:00+08:00",
  revisionSources,
  units,
  flashcards,
  quizQuestions,
  scenarioQuestions,
};

const outDir = path.join(root, "standalone");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "data.json"),
  JSON.stringify(payload, null, 0),
);
fs.writeFileSync(
  path.join(outDir, "data.js"),
  `window.__MKT202_DATA__ = ${JSON.stringify(payload)};\n`,
);
console.log("Wrote standalone/data.json and standalone/data.js");
