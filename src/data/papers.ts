export type ExamPaper = {
  id: string;
  title: string;
  sitting: string;
  examDate: string;
  duration: string;
  format: string;
  file: string;
  totalMarks: number;
  badge?: string;
  cases: {
    title: string;
    brand: string;
    parts: string[];
  }[];
  tips: string[];
};

export const pastExamPapers: ExamPaper[] = [
  {
    id: "jan-2026",
    title: "Proctored Online Exam",
    sitting: "January Semester 2026",
    examDate: "15 April 2026",
    duration: "2 hours",
    format: "Open book · Section A · 2 full case questions (all parts)",
    file: "MKT202_JAN_2026_POE.pdf",
    totalMarks: 100,
    badge: "Latest",
    cases: [
      {
        title: "Question 1",
        brand: "InstaChef / Aikit",
        parts: [
          "1a — Macro trends (economic, sociocultural or technological) · 16m",
          "1b — Pricing method & another pricing strategy · 12m",
          "1c — Franchising in SG vs overseas (US, Australia) · 14m",
        ],
      },
      {
        title: "Question 2",
        brand: "Recovery clubs (Ice Bath Club, Shelter)",
        parts: [
          "2a — Needs, wants & demands · 15m",
          "2b — Two service characteristics & mitigation strategies · 15m",
          "2c — One social & one personal CB factor · 12m",
          "2d — IMC campaign with 2 digital tools · 16m",
        ],
      },
    ],
    tips: [
      "Lead with case facts, then apply course frameworks.",
      "For 1a pick only two macro forces as instructed.",
      "2b: name the characteristic before discussing strategies.",
    ],
  },
  {
    id: "jul-2025",
    title: "Proctored Online Exam",
    sitting: "July Semester 2025",
    examDate: "12 November 2025",
    duration: "2 hours",
    format: "Open book · Section A · 2 case questions",
    file: "MKT202_JUL_2025_POE.pdf",
    totalMarks: 100,
    badge: "Your cohort",
    cases: [
      {
        title: "Question 1",
        brand: "Prime Hydration / Energy",
        parts: [
          "1a — Two differentiation strategies with examples · 14m",
          "1b — One cultural & one social factor · 16m",
          "1c — Two communication tools to increase sales · 20m",
        ],
      },
      {
        title: "Question 2",
        brand: "Zara live shopping",
        parts: [
          "2a — Two macroenvironment forces · 16m",
          "2b — Two channel marketing benefits · 14m",
          "2c — CRM ways to engage during live shopping · 20m",
        ],
      },
    ],
    tips: [
      "Prime Q1c: justify tool choice for youth / influencer context.",
      "Zara 2c must cite explicit CRM principles from the course.",
    ],
  },
  {
    id: "jan-2025",
    title: "Proctored Online Exam",
    sitting: "January Semester 2025",
    examDate: "16 April 2025",
    duration: "2 hours",
    format: "Open book · Section A · 2 case questions",
    file: "MKT202_JAN_2025_POE.pdf",
    totalMarks: 100,
    cases: [
      {
        title: "Question 1",
        brand: "O+ Eyewear Designer (Bespo+ke)",
        parts: [
          "1a — Sociocultural & technological macro trends · 18m",
          "1b — Two customer personas · 16m",
          "1c — Pricing objective & EVC vs target-return method · 16m",
        ],
      },
      {
        title: "Question 2",
        brand: "Prefer (bean-free coffee)",
        parts: [
          "2a — Frame of reference, POP/POD, positioning statement · 16m",
          "2b — CSR undertaken & new community initiative · 12m",
          "2c — Digital IMC campaign (awareness + creative appeal) · 22m",
        ],
      },
    ],
    tips: [
      "2a positioning statement ≠ tagline.",
      "2c: remember Prefer is cost-conscious — pick lean digital tools.",
    ],
  },
];
