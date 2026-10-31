# MKT202 Study App

Personal revision app for **MKT202 Marketing Management** (July ’26 semester summary). Exam: **11 Nov 2026**.

## Run locally (recommended — no npm install)

From the project folder:

```bash
node serve.mjs
```

Then open **http://localhost:3456** in your browser. Progress saves automatically in your browser.

To refresh content after editing notes in `src/data/`:

```bash
node scripts/export-data.mjs
```

## Run with Vite (optional)

If `npm install` works on your network:

```bash
npm install
npm run dev
```

## Features

- **Study** — 6 units from your PDF summary, mark sections as read
- **Quiz** — multiple-choice with explanations
- **Flashcards** — flip cards, shuffle, track mastery (saved in browser)
- **Practice** — scenario questions with model answers

Progress is stored in `localStorage` on your device.

Also revise: iSmartGuide, Kotler 16e, seminar slides, handouts, and past papers.
