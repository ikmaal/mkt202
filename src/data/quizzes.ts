export type QuizQuestion = {
  id: string;
  unitId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1-1",
    unitId: 1,
    question:
      "Which statement best describes 'demand' in marketing terms?",
    options: [
      "A basic human requirement for food or shelter",
      "A need shaped only by culture",
      "A want backed by buying power",
      "Any product the company chooses to sell",
    ],
    correctIndex: 2,
    explanation:
      "Demands are wants backed by an ability and willingness to pay — include consumer profile in exam answers.",
  },
  {
    id: "q1-2",
    unitId: 1,
    question:
      "When analysing macroenvironment impact on a firm, you should first:",
    options: [
      "List all six forces without examples",
      "Identify a significant trend then explain opportunities/threats to revenue and profit",
      "Only discuss internal strengths",
      "Focus solely on competitors' prices",
    ],
    correctIndex: 1,
    explanation:
      "Course notes: identify a trend/development, then explain how it creates opportunities and/or threats.",
  },
  {
    id: "q1-3",
    unitId: 1,
    question: "Which research plan element distinguishes primary from secondary data?",
    options: [
      "Contact method only",
      "Whether data were gathered for the current specific purpose or already existed for another purpose",
      "Whether a focus group was used",
      "Whether decisions were made in step 5",
    ],
    correctIndex: 1,
    explanation:
      "Secondary = existing, other purpose. Primary = fresh collection for the study.",
  },
  {
    id: "q2-1",
    unitId: 2,
    question:
      "Family of orientation and family of procreation are examples of:",
    options: [
      "Cultural factors",
      "Social factors",
      "Personal factors",
      "Pricing objectives",
    ],
    correctIndex: 1,
    explanation: "Family as a reference group falls under social factors.",
  },
  {
    id: "q2-2",
    unitId: 2,
    question: "At the purchase decision stage, consumers decide on all EXCEPT:",
    options: [
      "Brand and distribution channel",
      "Quantity, timing, and payment method",
      "Macroenvironment political forces",
      "Intervening factors and perceived risks may affect the decision",
    ],
    correctIndex: 2,
    explanation:
      "The five purchase decisions are brand, channel, quantity, timing, and payment — not PESTLE.",
  },
  {
    id: "q2-3",
    unitId: 2,
    question:
      "Performance that exceeds expectations typically leads to:",
    options: [
      "Dissatisfied customers",
      "Neutral churn only",
      "Highly satisfied or delighted customers",
      "Lower product quality",
    ],
    correctIndex: 2,
    explanation: "Expectation–performance gap drives satisfaction levels.",
  },
  {
    id: "q3-1",
    unitId: 3,
    question:
      "Market segmentation is best defined as:",
    options: [
      "Explaining why one consumer feels motivated",
      "Dividing a market into distinct groups of consumers",
      "Setting final price after cost analysis",
      "Measuring advertising reach",
    ],
    correctIndex: 1,
    explanation:
      "Do not confuse segmentation with individual CB factors or purchase decision stages.",
  },
  {
    id: "q3-2",
    unitId: 3,
    question: "Hard-core loyals and switchers relate to:",
    options: [
      "Geographic segmentation only",
      "Behavioural segmentation (loyalty status)",
      "Channel conflict types",
      "Pricing methods",
    ],
    correctIndex: 1,
    explanation: "Loyalty status is a behavioural segmentation variable.",
  },
  {
    id: "q3-3",
    unitId: 3,
    question: "The sprinkler approach to global entry means:",
    options: [
      "Using intensive distribution domestically",
      "Entering many foreign markets at roughly the same time",
      "Stretching the product line down-market",
      "Exclusive dealerships only",
    ],
    correctIndex: 1,
    explanation:
      "Sprinkler = simultaneous multi-market entry; not intensive distribution.",
  },
  {
    id: "q3-4",
    unitId: 3,
    question: "Points of parity (POPs) are:",
    options: [
      "Always unique to one brand only",
      "Associations that may be shared with competitors",
      "Illegal pricing tactics",
      "The same as consumer incentives",
    ],
    correctIndex: 1,
    explanation:
      "POPs include category, competitive, and correlational points of parity.",
  },
  {
    id: "q4-1",
    unitId: 4,
    question: "Scoot as a brand alongside Singapore Airlines illustrates:",
    options: [
      "Up-market stretch",
      "Down-market stretch",
      "Product bundling only",
      "Time pricing",
    ],
    correctIndex: 1,
    explanation: "Lower-priced line extension to reach value-seeking segments.",
  },
  {
    id: "q4-2",
    unitId: 4,
    question: "Coupons and cash rebates are classified as:",
    options: [
      "Pricing objectives",
      "Consumer incentives (short-run sales tools)",
      "Points of difference",
      "Channel levels",
    ],
    correctIndex: 1,
    explanation:
      "Incentives boost short-term response but little permanent revenue gain.",
  },
  {
    id: "q4-3",
    unitId: 4,
    question: "Captive pricing is an example of:",
    options: [
      "Macroenvironment analysis",
      "Product mix pricing",
      "Vertical channel conflict only",
      "Psychographic segmentation",
    ],
    correctIndex: 1,
    explanation:
      "Product mix pricing includes captive, two-part, loss-leader, bundling, etc.",
  },
  {
    id: "q5-1",
    unitId: 5,
    question:
      "Conflict between a manufacturer's online store and its department store partners is:",
    options: [
      "Horizontal conflict",
      "Multichannel conflict",
      "Goal superordination",
      "Incremental innovation",
    ],
    correctIndex: 1,
    explanation:
      "Same manufacturer, multiple channels, same market → multichannel conflict.",
  },
  {
    id: "q5-2",
    unitId: 5,
    question: "Franchising involves:",
    options: [
      "Government-only procurement",
      "Licensor owns mark/system; franchisee pays for rights and follows the system",
      "Zero-level channel only",
      "Loss-leader pricing only",
    ],
    correctIndex: 1,
    explanation: "Three characteristics: mark license, payment, business system.",
  },
  {
    id: "q5-3",
    unitId: 5,
    question:
      "Informational vs transformational appeals are part of:",
    options: [
      "Step 6 — creative approach in communication development",
      "Product mix depth",
      "CLV calculation",
      "Sprinkler entry",
    ],
    correctIndex: 0,
    explanation: "Message appeal choice sits in the creative approach step.",
  },
  {
    id: "q5-4",
    unitId: 5,
    question: "Credibility of a message source includes:",
    options: [
      "Reach, frequency, impact",
      "Expertise, trustworthiness, and likability",
      "Width, length, depth",
      "Initiator and decider roles",
    ],
    correctIndex: 1,
    explanation: "Source characteristics from the communication model.",
  },
  {
    id: "q1-4",
    unitId: 1,
    question: "The six macroenvironment forces include all EXCEPT:",
    options: [
      "Demographic and technological",
      "Sociocultural and economic",
      "Competitive parity",
      "Political and natural",
    ],
    correctIndex: 2,
    explanation:
      "Macro forces are demographic, sociocultural, economic, technological, political, natural — not competitive parity (positioning concept).",
  },
  {
    id: "q1-5",
    unitId: 1,
    question: "Focus groups and surveys are examples of:",
    options: [
      "Secondary data sources",
      "Research approaches in the research plan",
      "Pricing methods",
      "Channel conflict types",
    ],
    correctIndex: 1,
    explanation: "They are research approaches/methods listed under developing the research plan.",
  },
  {
    id: "q2-4",
    unitId: 2,
    question: "Motivation, perception, emotions and memory are:",
    options: [
      "Bases for market segmentation",
      "Key psychological processes in consumer behaviour",
      "Product mix dimensions",
      "Channel service outputs",
    ],
    correctIndex: 1,
    explanation: "These four psychological processes influence buying behaviour.",
  },
  {
    id: "q2-5",
    unitId: 2,
    question: "Customer lifetime value is primarily concerned with:",
    options: [
      "One-time transaction margin only",
      "Monetary value customers create over their relationship with the firm",
      "Number of store locations",
      "Advertising reach",
    ],
    correctIndex: 1,
    explanation: "CLV sums revenue minus acquisition, retention and cross-selling costs over the customer tenure.",
  },
  {
    id: "q3-5",
    unitId: 3,
    question: "Buyer-readiness stages progress from unaware toward:",
    options: [
      "Decline and maturity",
      "Purchase intent",
      "Vertical conflict",
      "Loss-leader pricing",
    ],
    correctIndex: 1,
    explanation:
      "Behavioural variable: unaware → aware → informed → interested → desire → purchase intent.",
  },
  {
    id: "q3-6",
    unitId: 3,
    question: "A brand mantra and points of parity relate chiefly to:",
    options: [
      "Brand positioning",
      "Franchising contracts",
      "Consumer incentives",
      "Macroenvironment analysis",
    ],
    correctIndex: 0,
    explanation: "Positioning workflow includes frame of reference, PODs, POPs, mantra.",
  },
  {
    id: "q4-4",
    unitId: 4,
    question: "When a physical product is hard to differentiate, firms often compete through:",
    options: [
      "Services differentiation",
      "Vertical integration only",
      "Decline stage harvesting",
      "Geographic segmentation only",
    ],
    correctIndex: 0,
    explanation: "Adding valued services (delivery, support) can differentiate the offering.",
  },
  {
    id: "q4-5",
    unitId: 4,
    question: "Markup pricing and target-rate-of-return pricing are:",
    options: [
      "Consumer incentives",
      "Pricing methods (not price adaptation)",
      "Product mix pricing",
      "Channel levels",
    ],
    correctIndex: 1,
    explanation: "Do not confuse pricing methods with objectives, adaptation, or incentives.",
  },
  {
    id: "q5-5",
    unitId: 5,
    question: "Multichannel distribution means:",
    options: [
      "Using only one exclusive dealer",
      "Two or more channels to reach segments or need states in one market",
      "Eliminating all intermediaries",
      "The same as intensive distribution",
    ],
    correctIndex: 1,
    explanation: "Multiple channels coordinate product, place and cost for different segments or needs.",
  },
  {
    id: "q6-1",
    unitId: 6,
    question: "New-to-the-world innovation is best described as:",
    options: [
      "Creating entirely new product categories or markets",
      "Changing only package colour",
      "Horizontal channel conflict",
      "Customer-segment pricing",
    ],
    correctIndex: 0,
    explanation: "Contrasts with incremental innovation in Unit 6 coverage.",
  },
  {
    id: "q6-2",
    unitId: 6,
    question: "Incremental innovation typically means:",
    options: [
      "Improving or extending existing offerings",
      "Only CSR reporting",
      "Zero-level channels",
      "Exclusive distribution",
    ],
    correctIndex: 0,
    explanation: "Contrasts with new-to-the-world innovation in Unit 6 broad coverage.",
  },
  {
    id: "q6-3",
    unitId: 6,
    question: "For Unit 6 CSR questions, you should be prepared to:",
    options: [
      "Memorise only innovation types",
      "Apply CSR domains and formats to a given organisation",
      "Define channel levels",
      "List all advertising types",
    ],
    correctIndex: 1,
    explanation: "Summary emphasises discuss and apply CSR to cases.",
  },
  {
    id: "mix-1",
    unitId: 0,
    question:
      "Which revision source does the module summary explicitly require alongside this note?",
    options: [
      "Only social media trends",
      "iSmartGuide, textbook Kotler 16e, seminars, handouts, past papers",
      "Competitors' annual reports only",
      "Optional reading not in syllabus",
    ],
    correctIndex: 1,
    explanation:
      "Exam prep list: seminars, handouts, iSmartGuide, textbook, past papers.",
  },
];

export type ScenarioQuestion = {
  id: string;
  unitId: number;
  prompt: string;
  modelAnswer: string;
  checklist: string[];
};

export const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: "s1",
    unitId: 1,
    prompt:
      "A fitness app targets working adults in urban Malaysia. Explain needs, wants, and demands for this service.",
    modelAnswer:
      "Need: health, belonging, or esteem (apply relevant Maslow levels only). Want: convenient digital workouts shaped by busy urban lifestyle and social emphasis on wellness. Demand: working adults with disposable income and willingness to subscribe — describe profile (age, income, payment via app stores).",
    checklist: [
      "Applied to specific product",
      "Society shaping wants",
      "Ability and willingness to pay",
    ],
  },
  {
    id: "s2",
    unitId: 2,
    prompt:
      "Outline how a marketer can support a consumer buying a first electric vehicle through all five decision stages.",
    modelAnswer:
      "Recognition: advertising on fuel savings/climate. Search: reviews, dealer test drives, comparison sites. Evaluation: highlight PODs (range, warranty) and address risk. Purchase: financing, trade-in, clear pricing. Post-purchase: charging support, satisfaction surveys, loyalty/community.",
    checklist: [
      "All five stages named",
      "Marketer actions at each",
      "Product-specific examples",
    ],
  },
  {
    id: "s3",
    unitId: 3,
    prompt:
      "Differentiate segmentation from factors influencing consumer behaviour using a skincare brand example.",
    modelAnswer:
      "Segmentation divides the market (e.g. behavioural: heavy vs light users; demographic: Gen Z in cities). CB factors explain why one person in that segment perceives, feels, or decides (e.g. social reference groups, motivation for clear skin). Segmentation is market structure; CB is individual process.",
    checklist: ["Clear distinction", "Brand example", "No conflation"],
  },
  {
    id: "s4",
    unitId: 5,
    prompt:
      "A brand runs a review platform and referral rewards to encourage customers to share experiences. Is this word-of-mouth as a communication tool? Explain.",
    modelAnswer:
      "Yes — the firm deliberately facilitates and encourages sharing about the brand (platform + incentives), which is managed WOM as a communication tool. Organic chat between consumers without marketing design would not suffice alone in an exam WOM question.",
    checklist: ["Designed marketing activity", "Facilitate sharing", "Not organic only"],
  },
];
