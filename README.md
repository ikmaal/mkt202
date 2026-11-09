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
- **Papers** — past SUSS POE PDFs with question breakdowns

Progress is stored in `localStorage` on your device.

Also revise: iSmartGuide, Kotler 16e, seminar slides, handouts, and past papers.

## GitHub Pages

Live site: **https://ikmaal.github.io/mkt202/**

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions** (not “Deploy from branch / root”).
2. Push to `main` — the workflow deploys the **`standalone/`** folder only (not the Vite dev files at repo root).
3. Wait for the **Deploy GitHub Pages** action to finish, then hard-refresh the site.

If you previously deployed from **branch `main` / root**, the page was blank because root `index.html` is the unfinished Vite template.
