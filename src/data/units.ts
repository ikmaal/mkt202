export type StudySection = {
  id: string;
  title: string;
  bullets?: string[];
  content?: string;
  callout?: string;
  list?: string[];
};

export type Unit = {
  id: number;
  title: string;
  subtitle: string;
  textbook: string;
  examFocus: string[];
  sections: StudySection[];
};

export const EXAM_DATE = new Date("2026-11-11T09:00:00+08:00");

export const units: Unit[] = [
  {
    id: 1,
    title: "Unit 1",
    subtitle: "Defining Marketing & Situational Analysis",
    textbook: "Kotler Ch. 1, Ch. 3 (needs/wants/demands), Ch. 5 (macroenvironment)",
    examFocus: [
      "10 types of entities marketed",
      "Customer markets with examples",
      "Needs, wants, demands (apply to products)",
      "PESTLE / macroenvironment impact analysis",
      "5-step marketing research process",
    ],
    sections: [
      {
        id: "marketing-basics",
        title: "Defining marketing",
        content:
          "Marketing management builds on what is marketed, who markets, and which customer markets exist.",
        bullets: [
          "10 entities marketed: goods, services, events, experiences, persons, places, properties, organizations, information, ideas.",
          "Markets vs marketers: understand who participates in exchange.",
        ],
      },
      {
        id: "customer-markets",
        title: "Key customer markets",
        content: "Be able to give examples for each market type:",
        list: [
          "Consumer market — individuals/households buying for personal use.",
          "Business market — organisations buying for production or operations.",
          "Global market — cross-border buyers and sellers.",
          "Nonprofit & government market — institutions serving public or social goals.",
        ],
      },
      {
        id: "needs-wants-demands",
        title: "Needs, wants & demands",
        callout:
          "Apply to a specific product/service in exam answers — do not only define terms.",
        bullets: [
          "Needs: basic human requirements. Maslow may help; apply only relevant need types.",
          "Wants: needs directed at specific objects; shaped by society and product benefits that resonate.",
          "Demands: wants backed by ability and willingness to pay — describe the likely paying consumer profile.",
        ],
      },
      {
        id: "macroenvironment",
        title: "Environmental forces (macroenvironment)",
        content:
          "Six forces can create opportunities or threats. For each trend: (1) identify a significant development, (2) explain impact on revenue and profitability.",
        list: [
          "Demographic",
          "Sociocultural",
          "Economic",
          "Technological",
          "Political",
          "Natural",
        ],
      },
      {
        id: "research-process",
        title: "Marketing research process (5 steps)",
        content: "Stage 2 (Develop research plan) is the most comprehensive.",
        list: [
          "1. Define problem & research objectives",
          "2. Develop research plan — data sources, approaches/methods, instruments, sampling, contact method",
          "3. Collect information",
          "4. Analyse information",
          "5. Make decisions",
        ],
        bullets: [
          "Secondary data: gathered for another purpose, already exists.",
          "Primary data: freshly gathered for a specific purpose.",
          "Approaches: observation, focus group, survey, behavioural data, experiment.",
          "Contact methods: mailed/e-mail questionnaire, telephone, in-person, online, data mining.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Unit 2",
    subtitle: "Consumer Behaviour & Customer Loyalty",
    textbook: "Kotler Ch. 3, Ch. 19",
    examFocus: [
      "Consumer behaviour model",
      "Cultural, social, personal factors",
      "Psychological processes: motivation, perception, emotions, memory",
      "5-stage buying decision process + marketer actions",
      "Satisfaction, quality, CLV, CRM, loyalty",
    ],
    sections: [
      {
        id: "cb-model",
        title: "Model of consumer behaviour",
        content:
          "Marketing tactics and market context are filtered through target consumers' characteristics and psychology, influencing the buying process and purchase decisions.",
      },
      {
        id: "influences",
        title: "Factors influencing consumer behaviour",
        bullets: [
          "Cultural: nationalities, religions, racial groups, geographic regions, social class.",
          "Social: reference groups (primary/secondary), family (orientation & procreation), roles and status.",
          "Personal: age/life-cycle stage, occupation, economic circumstances, personality/self-concept, lifestyle (time- or money-constrained).",
        ],
      },
      {
        id: "psychology",
        title: "Key psychological processes",
        list: ["Motivation", "Perception", "Emotions", "Memory"],
        content: "Discuss how each can influence buying for a given product/service.",
      },
      {
        id: "buying-stages",
        title: "Five stages of buying decision process",
        list: [
          "Problem recognition — internal or external stimulus.",
          "Information search — heightened attention; active search from various sources.",
          "Evaluation of alternatives — attribute bundle delivering benefits; beliefs and attitudes affect evaluation.",
          "Purchase decision — brand, channel, quantity, timing, payment; intervening factors & perceived risks.",
          "Post-purchase behaviour — satisfaction, actions, uses, disposal.",
        ],
        callout: "Know marketer actions appropriate at each stage.",
      },
      {
        id: "satisfaction",
        title: "Total customer satisfaction & quality",
        bullets: [
          "Performance below expectations → dissatisfied.",
          "Meets expectations → satisfied.",
          "Exceeds expectations → delighted.",
          "Product/service quality → customer satisfaction → loyalty → profitability (interrelated).",
        ],
      },
      {
        id: "clv-crm",
        title: "CLV, acquisition, retention & CRM",
        bullets: [
          "Customer lifetime value: monetary value customers create over their tenure; affected by acquisition, retention, cross-selling costs/revenue.",
          "Build customer base: attract and retain using appropriate strategies.",
          "CRM: ways to build relationships through CRM strategies.",
          "Loyalty: customer interaction, loyalty programmes, brand communities.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Unit 3",
    subtitle: "Segmentation, Targeting, Positioning & PLC",
    textbook: "Kotler Ch. 6, 7, 17 (PLC), 20",
    examFocus: [
      "Segmentation bases & personas (not the same as CB factors)",
      "Targeting levels & segment attractiveness",
      "POPs, PODs, positioning statement vs slogan",
      "PLC stages and strategies",
      "Global entry: waterfall vs sprinkler, entry modes",
    ],
    sections: [
      {
        id: "segmentation",
        title: "Bases for segmenting markets",
        callout:
          "Segmentation divides the market into groups — do not confuse with factors influencing individual buying behaviour.",
        bullets: [
          "Geographic: nations, regions, cities, neighbourhoods; geoclustering (e.g. PRIZM).",
          "Demographic: age, life cycle, family, gender, income, occupation, education, religion, race/culture, generation, nationality, social class.",
          "Psychographic: personality, lifestyle, values (e.g. VALS).",
          "Behavioural: user status, usage rate, buyer-readiness, loyalty, occasions, decision roles.",
        ],
      },
      {
        id: "behavioural-vars",
        title: "User & usage-related variables",
        list: [
          "Occasions — time of day/week/month/year.",
          "User status — nonusers, potential, first-time, regular, ex-users.",
          "Usage rate — light, medium, heavy.",
          "Buyer-readiness — unaware → aware → informed → interested → desire → purchase intent.",
          "Loyalty — hard-core, split, shifting, switchers.",
          "Decision roles — initiator, influencer, decider, buyer, user.",
        ],
      },
      {
        id: "persona",
        title: "Customer persona",
        content:
          "Detailed profile(s) of hypothetical target consumers using segmentation variables — how they look, act, feel — to align internal communication.",
      },
      {
        id: "targeting",
        title: "Market targeting",
        bullets: [
          "Levels: full market coverage, multiple segments, single segment, individuals (one-to-one).",
          "Target attractiveness: how a segment can create superior value for the company.",
        ],
      },
      {
        id: "positioning",
        title: "Brand positioning & value proposition",
        bullets: [
          "Competitive frame of reference (target market + competition).",
          "Points of difference (PODs): strongly associated, not found to same extent elsewhere — desirable, deliverable, differentiating.",
          "Points of parity (POPs): shared associations — category, competitive, correlational POPs.",
          "Process: identify POPs/PODs → choose → brand mantra → establish positioning.",
          "Positioning statement is internal strategy; brand slogan/tagline is customer-facing — not the same.",
        ],
      },
      {
        id: "plc",
        title: "Product life cycle (PLC)",
        content:
          "For each stage: characteristics plus marketing objectives and 4Ps (product, price, place, promotion). Justify which stage a product is in.",
        list: ["Introduction", "Growth", "Maturity", "Decline"],
        bullets: [
          "Maturity — textbook: 2 approaches to change course; iSmartGuide: 3 approaches (includes Marketing Programme Modification).",
        ],
      },
      {
        id: "global",
        title: "Global markets",
        bullets: [
          "Why companies go overseas; risks; analysing markets (attractiveness, risk, competitive advantage).",
          "Developed vs developing country considerations.",
          "Waterfall approach vs sprinkler approach (how many markets at once) — sprinkler ≠ intensive distribution.",
          "Entry modes: advantages and disadvantages of each.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Unit 4",
    subtitle: "Product, Services & Pricing",
    textbook: "Kotler Ch. 8, 9, 11",
    examFocus: [
      "Product vs services differentiation dimensions",
      "Product mix width, length, depth, consistency",
      "Line stretching strategies",
      "Four service characteristics + strategies",
      "Price setting steps; don't confuse objectives, methods, adaptations",
    ],
    sections: [
      {
        id: "differentiation",
        title: "Product & services differentiation",
        bullets: [
          "Product: core functionality, features, performance/conformance quality, durability, reliability, form, style, customisation.",
          "Services: ordering ease, delivery speed/timing, installation/training/consulting, maintenance/repair, returns.",
          "When physical product is hard to differentiate, compete via services differentiation.",
        ],
      },
      {
        id: "product-mix",
        title: "Product mixes",
        list: [
          "Width — number of product lines.",
          "Length — total items in the mix.",
          "Depth — variants within a line.",
          "Consistency — how closely lines relate.",
        ],
      },
      {
        id: "line-strategy",
        title: "Product line stretching",
        bullets: [
          "Down-market stretch — lower-priced line (e.g. Armani / A|X, SIA / Scoot); mass retail, tie up low-end rivals, stagnant market.",
          "Up-market stretch — premium tier (Honda/Acura, Toyota/Lexus); growth, margins, full-line image.",
          "Two-way stretch — both directions (e.g. Holiday Inn Express ← Holiday Inn → Crowne Plaza).",
        ],
      },
      {
        id: "services",
        title: "Distinctive characteristics of services",
        content:
          "Know the four characteristics and marketing strategies to mitigate challenges (intangibility, inseparability, variability, perishability — apply per textbook).",
        bullets: [
          "New service realities: technology, customer empowerment, coproduction, satisfying employees and customers.",
          "Achieving service excellence — broad understanding of approaches.",
        ],
      },
      {
        id: "pricing-steps",
        title: "Setting the price",
        list: [
          "Select pricing objective (short-term profit, penetration, skimming, quality leadership, etc.)",
          "Determine demand (elasticity, sensitivity)",
          "Estimate costs",
          "Analyse competitors' costs, prices, offers",
          "Select pricing method (markup, target-return, EVC, going-rate, auction)",
          "Select final price",
        ],
      },
      {
        id: "price-adaptation",
        title: "Price discrimination (adaptation strategies)",
        list: [
          "Customer-segment pricing",
          "Product-form pricing",
          "Channel pricing",
          "Location pricing",
          "Time pricing",
        ],
        callout:
          "Do not confuse with pricing objectives, pricing methods, product mix pricing, or consumer incentives.",
      },
      {
        id: "mix-incentives",
        title: "Product mix pricing & consumer incentives",
        bullets: [
          "Mix pricing: loss-leader, optional-feature, captive, two-part, by-product, bundling (mixed/pure).",
          "Incentives: price reductions, coupons, rebates, price packs, premiums, prizes, tie-ins, seasonal discounts, financing — short-run sales lift, little long-term gain.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Unit 5",
    subtitle: "Channels & Marketing Communications",
    textbook: "Kotler Ch. 12–15, Ch. 14 (p.331)",
    examFocus: [
      "Channel levels & multichannel",
      "Channel design, motivation, evaluation",
      "Vertical, horizontal, multichannel conflict",
      "7-step communication development",
      "Apply tools: advertising, events, PR, WOM, direct, packaging, selling, online/social/mobile",
    ],
    sections: [
      {
        id: "channels",
        title: "Channel levels & multichannel",
        bullets: [
          "Zero-level (direct) vs one-level, two-level, etc.",
          "Multichannel: two+ channels in one market; different segments or need states; right product, place, way, cost.",
        ],
      },
      {
        id: "channel-mgmt",
        title: "Channel-management decisions",
        bullets: [
          "Objectives: customers to reach; service outputs (lot size, waiting/delivery, spatial convenience, variety, service backup); product & environmental factors.",
          "Selecting members: exclusive, selective, intensive distribution; franchising (mark license, fee, business system).",
          "Motivating: training, channel power, partners mindset.",
          "Evaluating: quotas, inventory, delivery times, promotions cooperation, damaged goods.",
        ],
      },
      {
        id: "conflict",
        title: "Channel cooperation & conflict",
        list: [
          "Vertical — between levels (manufacturer vs retailer).",
          "Horizontal — same level (competing retailers).",
          "Multichannel — same market via multiple channels.",
        ],
        bullets: [
          "Causes: goal incompatibility, different strategies/tactics, power imbalance, unclear roles.",
          "Management: strategic justification, dual compensation, superordinate goals, exchange, joint membership, co-optation, diplomacy/mediation/arbitration, legal recourse.",
        ],
      },
      {
        id: "ecommerce",
        title: "E-commerce",
        content:
          "Distribution channel form. Retailing models: online retailers vs omnichannel — not the same as exclusive/selective/intensive.",
      },
      {
        id: "comm-steps",
        title: "Developing effective communication (7 areas)",
        list: [
          "1. Communication objectives (awareness, preference, action; budget)",
          "2. Target audience (segments, perception gap)",
          "3. Message (big idea, creative brief)",
          "4. Media mix (advertising, online/social, mobile, direct, events, WOM, PR, personal selling, packaging)",
          "5. Media plan — reach, frequency, impact",
          "6. Creative approach — informational vs transformational appeal; source credibility (expertise, trustworthiness, likability)",
          "7. Measure effectiveness",
        ],
      },
      {
        id: "comm-tools",
        title: "Integrated marketing campaign tools",
        bullets: [
          "Advertising types: TV, print, radio, online, place, POP.",
          "Events: target market, salience, brand associations, corporate image, experiences, community, entertainment, merchandising.",
          "Publicity/PR: launches, repositioning, category interest, target groups, crisis defence, corporate image.",
          "Word of mouth: designed campaigns to encourage sharing — organic WOM alone is insufficient.",
          "Direct: mail, catalogues, telemarketing, infomercials/live streaming.",
          "Packaging principles: visibility, differentiation, transparency.",
          "Personal selling: customised, relationship-oriented, response-oriented.",
          "Online/social/mobile: websites, SEO/SEM, email, communities, blogs, networks, reviews; mobile loyalty programmes.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Unit 6",
    subtitle: "Innovation & Social Responsibility",
    textbook: "Kotler Ch. 18, 21",
    examFocus: [
      "Broad innovation execution",
      "Research tools for idea generation/validation",
      "CSR domains and formats — apply to organisations",
    ],
    sections: [
      {
        id: "innovation",
        title: "Innovation & digital transformation",
        bullets: [
          "Broad understanding of how innovation may be executed.",
          "New-to-the-world vs incremental innovation.",
        ],
      },
      {
        id: "research-tools",
        title: "Marketing research for ideas",
        content:
          "Broad understanding of tools for idea generation and validation (refer to seminar materials and textbook).",
      },
      {
        id: "csr",
        title: "Socially responsible marketing",
        content:
          "Discuss and apply domains and formats of corporate social responsibility to a given company or organisation.",
      },
    ],
  },
];

export const revisionSources = [
  "Online seminar materials",
  "Instructor handouts",
  "iSmartGuide (concepts covered there are examinable)",
  "Kotler, Keller & Chernev — Marketing Management (16th ed.)",
  "Past years' exam papers",
];
