const STORAGE_KEY = "mkt202-study-progress";

let DATA = null;
let progress = loadProgress();

function loadProgress() {
  try {
    return {
      sectionsRead: {},
      flashcardKnown: {},
      quizBest: {},
      unitQuizBest: {},
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
    };
  } catch {
    return {
      sectionsRead: {},
      flashcardKnown: {},
      quizBest: {},
      unitQuizBest: {},
    };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function daysUntilExam(iso) {
  const exam = new Date(iso);
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(exam.getFullYear(), exam.getMonth(), exam.getDate());
  return Math.ceil((end - start) / (86400000));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function renderList(items) {
  if (!items?.length) return "";
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

const UNIT_THEME = {
  1: "unit-purple",
  2: "unit-peach",
  3: "unit-lavender",
  4: "unit-coral",
  5: "unit-indigo",
  6: "unit-mint",
};

function parseStudyHash(hash) {
  const m = hash.match(/^#\/study\/(\d+)(?:\/(quiz))?$/);
  if (!m) return null;
  return { id: Number(m[1]), quiz: m[2] === "quiz" };
}

function questionsForUnit(unitId) {
  return DATA.quizQuestions.filter((q) => q.unitId === unitId);
}

function updateChrome(route) {
  const { pct } = sectionProgress();
  const pctEl = document.getElementById("header-pct");
  if (pctEl) pctEl.textContent = `${pct}%`;

  const days = daysUntilExam(DATA.examDate);
  const el = document.getElementById("countdown");
  if (el) {
    el.textContent =
      days > 0 ? `${days}d to exam` : days === 0 ? "Exam day!" : "Post-exam";
  }
  document.querySelectorAll(".bottom-nav a[data-route]").forEach((a) => {
    const r = a.getAttribute("data-route");
    const active =
      r === route ||
      (r === "#/" && (route === "#/" || route === "")) ||
      (r === "#/study" && route === "#/study") ||
      (r !== "#/" && r !== "#/study" && route === r);
    a.classList.toggle("active", active);
  });
}

function shell(content, route) {
  updateChrome(route);
  return content;
}

function sectionProgress() {
  let total = 0;
  let done = 0;
  for (const u of DATA.units) {
    total += u.sections.length;
    for (const s of u.sections) {
      if (progress.sectionsRead[`${u.id}-${s.id}`]) done++;
    }
  }
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function homeView() {
  const { total, done, pct } = sectionProgress();
  const cardsKnown = Object.values(progress.flashcardKnown).filter(Boolean).length;
  const unitsPassed = Object.keys(progress.unitQuizBest || {}).filter(
    (k) => (progress.unitQuizBest[k] ?? 0) >= 70,
  ).length;
  return shell(
    `
    <section class="hero-card">
      <p class="tag">MKT202 · Exam ready</p>
      <h1>Marketing revision adventure</h1>
      <p>Read each unit, then crush the checkpoint quiz at the end to lock it in.</p>
    </section>
    <div class="stat-row">
      <div class="stat-pill"><p class="stat-label">Sections</p><p class="stat-value">${pct}%</p><p class="lead">${done}/${total} read</p></div>
      <div class="stat-pill"><p class="stat-label">Flashcards</p><p class="stat-value">${cardsKnown}</p><p class="lead">mastered</p></div>
      <div class="stat-pill wide"><span><p class="stat-label">Unit quizzes passed (70%+)</p><p class="stat-value">${unitsPassed} / 6</p></span><span style="font-size:2rem">🎯</span></div>
    </div>
    <h2 class="section-heading">Jump into a unit</h2>
    ${DATA.units
      .map(
        (u) =>
          `<a class="course-card ${UNIT_THEME[u.id] || "unit-purple"}" href="#/study/${u.id}">
            <p class="unit-tag">${esc(u.title)}</p>
            <h3>${esc(u.subtitle)}</h3>
            <p class="meta">${questionsForUnit(u.id).length} checkpoint questions</p>
            <span class="go-btn" aria-hidden="true">→</span>
          </a>`,
      )
      .join("")}
  `,
    "#/",
  );
}

function studyListView() {
  return shell(
    `
    <h1 class="page-title">My units</h1>
    <p class="lead">Tap a unit → read → finish with the checkpoint quiz.</p>
    ${DATA.units
      .map((u) => {
        const d = u.sections.filter((s) => progress.sectionsRead[`${u.id}-${s.id}`]).length;
        const best = progress.unitQuizBest?.[String(u.id)];
        return `<a class="course-card ${UNIT_THEME[u.id] || "unit-purple"}" href="#/study/${u.id}">
          <p class="unit-tag">${esc(u.title)} · ${d}/${u.sections.length} read</p>
          <h3>${esc(u.subtitle)}</h3>
          <p class="meta">${best != null ? `Quiz best: ${best}%` : "Quiz not taken yet"}</p>
          <span class="go-btn" aria-hidden="true">→</span>
        </a>`;
      })
      .join("")}
  `,
    "#/study",
  );
}

function unitView(id) {
  const u = DATA.units.find((x) => x.id === id);
  if (!u) return studyListView();
  const sections = u.sections
    .map((s, idx) => {
      const key = `${u.id}-${s.id}`;
      const read = !!progress.sectionsRead[key];
      return `
      <article class="section-card" id="${s.id}">
        <div style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start">
          <h2 style="margin:0;font-size:1.125rem;color:#0f172a">${idx + 1}. ${esc(s.title)}</h2>
          <button type="button" class="btn btn-read ${read ? "done" : "btn-outline"}" data-mark="${esc(key)}">${read ? "Read ✓" : "Mark read"}</button>
        </div>
        ${s.content ? `<p style="margin-top:0.75rem;line-height:1.6">${esc(s.content)}</p>` : ""}
        ${s.callout ? `<div class="callout">${esc(s.callout)}</div>` : ""}
        ${s.list ? `<ol>${s.list.map((i) => `<li>${esc(i)}</li>`).join("")}</ol>` : ""}
        ${s.bullets ? renderList(s.bullets) : ""}
      </article>`;
    })
    .join("");
  const prev = DATA.units.find((x) => x.id === id - 1);
  const next = DATA.units.find((x) => x.id === id + 1);
  const qCount = questionsForUnit(id).length;
  const best = progress.unitQuizBest?.[String(id)];
  return shell(
    `
    <a class="back-link" href="#/study">← My units</a>
    <p class="unit-tag" style="margin:0;color:var(--purple);font-weight:800">${esc(u.title)}</p>
    <h1 class="page-title">${esc(u.subtitle)}</h1>
    <p class="lead">${esc(u.textbook)}</p>
    <div class="focus-box"><strong>🎯 Exam focus</strong>${renderList(u.examFocus)}</div>
    ${sections}
    <div class="checkpoint-card">
      <div class="trophy" aria-hidden="true">🏆</div>
      <h3>Unit ${id} checkpoint</h3>
      <p>${qCount} questions — test everything from this unit before moving on.</p>
      ${best != null ? `<p class="best">Personal best: ${best}%</p>` : ""}
      <a href="#/study/${id}/quiz" class="btn btn-primary">Start unit quiz</a>
    </div>
    <nav class="unit-nav">
      ${prev ? `<a href="#/study/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a href="#/study/${next.id}">${esc(next.title)} →</a>` : "<span></span>"}
    </nav>
  `,
    "#/study",
  );
}

let unitQuizState = null;

function unitQuizView(unitId) {
  const u = DATA.units.find((x) => x.id === unitId);
  if (!u) return `<p class="lead">Unit not found.</p>`;
  const pool = questionsForUnit(unitId);
  if (!unitQuizState || unitQuizState.unitId !== unitId) {
    unitQuizState = {
      unitId,
      pool: shuffle(pool),
      index: 0,
      selected: null,
      score: 0,
      finished: false,
    };
  }
  const qs = unitQuizState;
  const q = qs.finished ? null : qs.pool[qs.index];
  const progressPct = qs.pool.length
    ? Math.round((qs.index / qs.pool.length) * 100)
    : 0;

  if (qs.finished) {
    const pct = Math.round((qs.score / qs.pool.length) * 100);
    const prevBest = progress.unitQuizBest?.[String(unitId)] ?? 0;
    if (pct > prevBest) {
      progress.unitQuizBest = { ...progress.unitQuizBest, [String(unitId)]: pct };
      saveProgress();
    }
    const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
    return shell(
      `
      <a class="back-link" href="#/study/${unitId}">← Back to ${esc(u.title)}</a>
      <div class="quiz-panel result-card">
        <p class="result-emoji">${emoji}</p>
        <h2 class="page-title">${esc(u.title)} complete!</h2>
        <p class="lead">You scored <strong>${qs.score} / ${qs.pool.length}</strong> (${pct}%)</p>
        <p class="lead">${pct >= 70 ? "Great work — this unit is solid." : "Review the notes and try again."}</p>
        <div style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem">
          <button type="button" class="btn btn-primary" id="unit-quiz-retry">Try again</button>
          <a href="#/study/${unitId}" class="btn btn-outline" style="text-align:center;text-decoration:none">Back to notes</a>
        </div>
      </div>
    `,
      "#/study",
    );
  }

  if (!q) {
    return shell(
      `<p class="lead">No questions for this unit yet.</p>`,
      "#/study",
    );
  }

  return shell(
    `
    <a class="back-link" href="#/study/${unitId}">← Exit quiz</a>
    <p class="unit-tag" style="margin:0;font-weight:800;color:var(--purple)">${esc(u.title)} checkpoint</p>
    <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${progressPct}%"></div></div>
    <p class="lead">Question ${qs.index + 1} of ${qs.pool.length}</p>
    <div class="quiz-panel">
      <h2 style="font-size:1.05rem;font-weight:700;line-height:1.4;margin:0">${esc(q.question)}</h2>
      ${q.options
        .map((opt, i) => {
          let cls = "quiz-opt";
          if (qs.selected !== null) {
            if (i === q.correctIndex) cls += " correct";
            else if (i === qs.selected) cls += " wrong";
          }
          return `<button type="button" class="${cls}" data-unit-opt="${i}" ${qs.selected !== null ? "disabled" : ""}>${esc(opt)}</button>`;
        })
        .join("")}
      ${
        qs.selected !== null
          ? `<p class="callout" style="margin-top:1rem"><strong>💡</strong> ${esc(q.explanation)}</p>
             <button type="button" class="btn btn-dark" style="width:100%;margin-top:1rem" id="unit-quiz-next">${qs.index + 1 >= qs.pool.length ? "See results" : "Next question"}</button>`
          : ""
      }
    </div>
  `,
    "#/study",
  );
}

let quizState = null;

function quizView() {
  if (!quizState) {
    quizState = {
      filter: "all",
      pool: shuffle(DATA.quizQuestions),
      index: 0,
      selected: null,
      score: 0,
      finished: false,
    };
  }
  const qs = quizState;
  const filtered =
    qs.filter === "all"
      ? DATA.quizQuestions
      : DATA.quizQuestions.filter((q) => q.unitId === Number(qs.filter));
  const q = qs.finished ? null : qs.pool[qs.index];

  let body = `
    <h1 class="page-title">Quick quiz</h1>
    <p class="lead">Multiple-choice with explanations.</p>
    <div style="margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
      <select id="quiz-filter">
        <option value="all">All units</option>
        ${DATA.units.map((u) => `<option value="${u.id}" ${qs.filter == u.id ? "selected" : ""}>${esc(u.title)}</option>`).join("")}
        <option value="0" ${qs.filter == 0 ? "selected" : ""}>General</option>
      </select>
      <button type="button" class="btn btn-primary" id="quiz-start">Start / restart</button>
    </div>`;

  if (qs.finished) {
    body += `<div class="card" style="margin-top:2rem;text-align:center;padding:2rem">
      <p>Score: <strong>${qs.score} / ${qs.pool.length}</strong></p>
      <button type="button" class="btn btn-primary" id="quiz-start2">Try again</button>
    </div>`;
  } else if (q) {
    body += `
      <div class="card" style="margin-top:2rem">
        <p style="font-size:0.75rem;color:#94a3b8">Question ${qs.index + 1} of ${qs.pool.length}</p>
        <h2 style="font-size:1.125rem;margin-top:0.5rem">${esc(q.question)}</h2>
        ${q.options
          .map((opt, i) => {
            let cls = "quiz-opt";
            if (qs.selected !== null) {
              if (i === q.correctIndex) cls += " correct";
              else if (i === qs.selected) cls += " wrong";
            }
            return `<button type="button" class="${cls}" data-opt="${i}" ${qs.selected !== null ? "disabled" : ""}>${esc(opt)}</button>`;
          })
          .join("")}
        ${
          qs.selected !== null
            ? `<p class="callout" style="margin-top:1rem"><strong>Explanation:</strong> ${esc(q.explanation)}</p>
               <button type="button" class="btn btn-dark" style="width:100%;margin-top:1rem" id="quiz-next">${qs.index + 1 >= qs.pool.length ? "See results" : "Next"}</button>`
            : ""
        }
      </div>`;
  } else {
    body += `<p style="margin-top:2rem;color:#64748b">Press Start (${filtered.length} questions in filter).</p>`;
  }

  return shell(body, "#/quiz");
}

let fcState = null;

function flashcardsView() {
  if (!fcState) {
    fcState = {
      filter: "all",
      unknownOnly: false,
      deck: shuffle(DATA.flashcards),
      index: 0,
      flipped: false,
    };
  }
  rebuildFcDeck();
  const card = fcState.deck[fcState.index];
  const known = Object.values(progress.flashcardKnown).filter(Boolean).length;

  if (!card) {
    return shell(
      `<h1 class="page-title">Flashcards</h1><p class="lead">No cards in this filter.</p>`,
      "#/flashcards",
    );
  }

  return shell(
    `
    <h1 class="page-title">Flashcards</h1>
    <p class="lead">Tap to flip. Mastered: ${known}/${DATA.flashcards.length}</p>
    <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem">
      <select id="fc-filter">
        <option value="all">All units</option>
        ${DATA.units.map((u) => `<option value="${u.id}" ${fcState.filter == u.id ? "selected" : ""}>${esc(u.title)}</option>`).join("")}
      </select>
      <label><input type="checkbox" id="fc-unknown" ${fcState.unknownOnly ? "checked" : ""} /> Unknown only</label>
      <button type="button" class="btn btn-outline" id="fc-shuffle">Shuffle</button>
    </div>
    <div class="flash-wrap">
      <button type="button" class="flash-card ${fcState.flipped ? "flipped" : ""}" id="fc-flip">
        <div class="flash-face flash-front">
          ${card.tag ? `<span style="font-size:0.75rem;color:#2563eb">${esc(card.tag)}</span>` : ""}
          <p style="flex:1;display:flex;align-items:center;font-size:1.125rem;font-weight:500;color:#0f172a">${esc(card.front)}</p>
          <span style="font-size:0.75rem;color:#94a3b8">Tap to reveal</span>
        </div>
        <div class="flash-face flash-back">
          <span style="font-size:0.75rem;color:#2563eb">Answer</span>
          <p style="flex:1;display:flex;align-items:center;line-height:1.5">${esc(card.back)}</p>
        </div>
      </button>
    </div>
    <p style="text-align:center;font-size:0.875rem;color:#64748b">Card ${fcState.index + 1} of ${fcState.deck.length} · Unit ${card.unitId}</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.5rem;margin-top:1rem">
      <button type="button" class="btn btn-outline" id="fc-prev">Previous</button>
      <button type="button" class="btn btn-outline" id="fc-learning">Still learning</button>
      <button type="button" class="btn btn-primary" id="fc-got">Got it</button>
      <button type="button" class="btn btn-outline" id="fc-next">Next</button>
    </div>
  `,
    "#/flashcards",
  );
}

function rebuildFcDeck() {
  let list =
    fcState.filter === "all"
      ? DATA.flashcards
      : DATA.flashcards.filter((c) => c.unitId === Number(fcState.filter));
  if (fcState.unknownOnly) list = list.filter((c) => !progress.flashcardKnown[c.id]);
  if (!fcState._deckKey || fcState._deckKey !== JSON.stringify([fcState.filter, fcState.unknownOnly, list.length])) {
    fcState.deck = shuffle(list.length ? list : DATA.flashcards);
    fcState.index = 0;
    fcState.flipped = false;
    fcState._deckKey = JSON.stringify([fcState.filter, fcState.unknownOnly, list.length]);
  }
}

let practiceIndex = 0;
let practiceRevealed = false;

function practiceView() {
  const q = DATA.scenarioQuestions[practiceIndex];
  return shell(
    `
    <h1 class="page-title">Scenario practice</h1>
    <p class="lead">Answer in writing before revealing the model answer.</p>
    <div class="card" style="margin-top:1.5rem">
      <p style="font-size:0.75rem;color:#94a3b8">Scenario ${practiceIndex + 1} of ${DATA.scenarioQuestions.length} · Unit ${q.unitId}</p>
      <h2 style="font-size:1.125rem;margin-top:0.5rem">${esc(q.prompt)}</h2>
      ${
        !practiceRevealed
          ? `<button type="button" class="btn btn-dark" style="width:100%;margin-top:1.5rem" id="pr-reveal">Show model answer</button>`
          : `<div style="margin-top:1rem"><strong style="color:#2563eb">Model answer</strong><p style="line-height:1.6">${esc(q.modelAnswer)}</p>
             <strong>Checklist</strong>${renderList(q.checklist)}</div>`
      }
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:1rem">
      <button type="button" class="btn btn-outline" id="pr-prev" ${practiceIndex === 0 ? "disabled" : ""}>Previous</button>
      <button type="button" class="btn btn-outline" id="pr-next" ${practiceIndex >= DATA.scenarioQuestions.length - 1 ? "disabled" : ""}>Next</button>
    </div>
  `,
    "#/practice",
  );
}

function render() {
  const hash = location.hash || "#/";
  const study = parseStudyHash(hash);
  const route = study || hash.startsWith("#/study/") ? "#/study" : hash;
  const view = document.getElementById("view");
  if (!view) return;
  if (!DATA) {
    view.innerHTML = "<p class='lead loading-msg'>Loading…</p>";
    return;
  }

  let html;
  if (study?.quiz) {
    html = unitQuizView(study.id);
    view.innerHTML = html;
    updateChrome("#/study");
    bindUnitQuiz();
    return;
  }
  if (study) {
    html = unitView(study.id);
    view.innerHTML = shell(html, "#/study");
    unitQuizState = null;
    bindUnit();
    return;
  }

  switch (hash) {
    case "#/study":
      html = studyListView();
      break;
    case "#/quiz":
      html = quizView();
      view.innerHTML = shell(html, route);
      bindQuiz();
      return;
    case "#/flashcards":
      html = flashcardsView();
      view.innerHTML = shell(html, route);
      bindFlashcards();
      return;
    case "#/practice":
      html = practiceView();
      view.innerHTML = shell(html, route);
      bindPractice();
      return;
    default:
      html = homeView();
  }
  view.innerHTML = shell(html, route === "#/" ? "#/" : route);
}

function bindUnit() {
  document.querySelectorAll("[data-mark]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-mark");
      progress.sectionsRead[key] = !progress.sectionsRead[key];
      saveProgress();
      render();
    });
  });
}

function bindUnitQuiz() {
  document.getElementById("unit-quiz-retry")?.addEventListener("click", () => {
    const id = unitQuizState?.unitId;
    unitQuizState = null;
    location.hash = `#/study/${id}/quiz`;
    render();
  });
  document.querySelectorAll("[data-unit-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (unitQuizState.selected !== null) return;
      const i = Number(btn.getAttribute("data-unit-opt"));
      const q = unitQuizState.pool[unitQuizState.index];
      unitQuizState.selected = i;
      if (i === q.correctIndex) unitQuizState.score++;
      render();
    });
  });
  document.getElementById("unit-quiz-next")?.addEventListener("click", () => {
    if (unitQuizState.index + 1 >= unitQuizState.pool.length) {
      unitQuizState.finished = true;
      unitQuizState.selected = null;
    } else {
      unitQuizState.index++;
      unitQuizState.selected = null;
    }
    render();
  });
}

function startQuiz() {
  const filterEl = document.getElementById("quiz-filter");
  const filter = filterEl?.value ?? "all";
  const pool =
    filter === "all"
      ? DATA.quizQuestions
      : DATA.quizQuestions.filter((q) => q.unitId === Number(filter));
  quizState = {
    filter: filter === "all" ? "all" : Number(filter),
    pool: shuffle(pool),
    index: 0,
    selected: null,
    score: 0,
    finished: false,
  };
  render();
}

function bindQuiz() {
  document.getElementById("quiz-start")?.addEventListener("click", startQuiz);
  document.getElementById("quiz-start2")?.addEventListener("click", startQuiz);
  document.querySelectorAll("[data-opt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (quizState.selected !== null) return;
      const i = Number(btn.getAttribute("data-opt"));
      const q = quizState.pool[quizState.index];
      quizState.selected = i;
      if (i === q.correctIndex) quizState.score++;
      saveProgress();
      render();
    });
  });
  document.getElementById("quiz-next")?.addEventListener("click", () => {
    if (quizState.index + 1 >= quizState.pool.length) quizState.finished = true;
    else {
      quizState.index++;
      quizState.selected = null;
    }
    render();
  });
}

function bindFlashcards() {
  document.getElementById("fc-filter")?.addEventListener("change", (e) => {
    fcState.filter = e.target.value === "all" ? "all" : Number(e.target.value);
    fcState._deckKey = null;
    render();
  });
  document.getElementById("fc-unknown")?.addEventListener("change", (e) => {
    fcState.unknownOnly = e.target.checked;
    fcState._deckKey = null;
    render();
  });
  document.getElementById("fc-shuffle")?.addEventListener("click", () => {
    fcState._deckKey = null;
    fcState.deck = shuffle(fcState.deck);
    fcState.index = 0;
    fcState.flipped = false;
    render();
  });
  document.getElementById("fc-flip")?.addEventListener("click", () => {
    fcState.flipped = !fcState.flipped;
    document.getElementById("fc-flip")?.classList.toggle("flipped", fcState.flipped);
  });
  const step = (delta, known) => {
    const card = fcState.deck[fcState.index];
    if (known !== undefined && card) {
      progress.flashcardKnown[card.id] = known;
      saveProgress();
    }
    fcState.flipped = false;
    fcState.index = (fcState.index + delta + fcState.deck.length) % fcState.deck.length;
    render();
  };
  document.getElementById("fc-prev")?.addEventListener("click", () => step(-1));
  document.getElementById("fc-next")?.addEventListener("click", () => step(1));
  document.getElementById("fc-learning")?.addEventListener("click", () => step(1, false));
  document.getElementById("fc-got")?.addEventListener("click", () => step(1, true));
}

function bindPractice() {
  document.getElementById("pr-reveal")?.addEventListener("click", () => {
    practiceRevealed = true;
    render();
  });
  document.getElementById("pr-prev")?.addEventListener("click", () => {
    if (practiceIndex > 0) {
      practiceIndex--;
      practiceRevealed = false;
      render();
    }
  });
  document.getElementById("pr-next")?.addEventListener("click", () => {
    if (practiceIndex < DATA.scenarioQuestions.length - 1) {
      practiceIndex++;
      practiceRevealed = false;
      render();
    }
  });
}

window.addEventListener("hashchange", render);

function boot() {
  try {
    DATA = window.__MKT202_DATA__;
    if (DATA) {
      render();
      return;
    }
    fetch("data.json")
    .then((r) => {
      if (!r.ok) throw new Error("not ok");
      return r.json();
    })
    .then((data) => {
      DATA = data;
      render();
    })
    .catch(() => {
      document.getElementById("view").innerHTML = `
        <main style="padding:2rem;max-width:32rem;line-height:1.6">
          <p><strong>Could not load study data.</strong></p>
          <p>Try opening <a href="http://localhost:3456">http://localhost:3456</a> after running <code>node serve.mjs</code> in the project folder.</p>
          <p>Or open <code>standalone/index.html</code> from the folder that contains <code>data.js</code> (run <code>node scripts/export-data.mjs</code> if that file is missing).</p>
        </main>`;
    });
  } catch (err) {
    console.error(err);
    document.getElementById("view").innerHTML = `
      <main style="padding:2rem;max-width:32rem">
        <p><strong>Something went wrong loading the app.</strong></p>
        <p style="color:#64748b;font-size:0.875rem">${esc(String(err.message))}</p>
        <p>Run <code>node scripts/export-data.mjs</code> then refresh.</p>
      </main>`;
  }
}

boot();
