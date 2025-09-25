'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, ExternalLink, MessageCircle, Building2, Briefcase, Landmark, ArrowRight } from "lucide-react";
import ContactUsModal from "@/components/ContactUsModal";
import CompetitiveAnalysisGraph from "@/components/CompetitiveAnalysisGraph";
import CapMatchAnimation from "@/components/CapMatchAnimation";
import SectionCard from "@/components/SectionCard";

// Helper: reusable fade-in on scroll wrapper
const FadeIn = ({
  children,
  delay = 0,
  y = 24,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Helper function for video component to handle Google Drive URLs
function DriveVideo({ previewUrl }: { previewUrl: string }) {
  return (
    <iframe
      src={previewUrl}
      className="rounded-lg w-full h-full border-0"
      allow="autoplay; fullscreen"
      allowFullScreen
      title="Video content"
    />
  );
}

// New: CRE Education content (optimized copy)
const creEducationContent = {
  title: "The CRE 'Uber' Opportunity ",
  subtitle: "Commercial Real Estate lending is massive, fragmented, and ripe for disruption",
  mainDescription: "This year, <span class=\"font-semibold\">$957 billion</span> in commercial real estate loans need refinancing. Yet the process hasn't changed since the 1980s. Here's how it works today:",
  keyPlayers: [
    {
      icon: "Building2",
      title: "Borrowers",
      subtitle: "Property Owners & Developers",
      descriptions: [
        "Borrowers are the property owners and developers who need to refinance or purchase a property.",
        "They own an estimated <b>5 million+</b> apartment buildings (5+ units) across the U.S.",
        "<b>96%</b> have active debt that needs constant refinancing.",
        "Their <b>biggest challenge</b>: finding the right lender among <b>3,000+</b> options - 0.25% rate difference on a $50M loan costs $125,000/year.",
        
      ]
    },
    {
      icon: "Briefcase",
      title: "Advisors",
      subtitle: "Loan Brokers & Originators",
      descriptions: [
        "Advisors are licensed professionals who connect borrowers with lenders.",
        "<b>120,000</b> CRE brokers already have the license and the relationships to qualify as advisors.",
        "Most of these CRE brokers don't even know that they can be placing debt.",
        "Even the ones that do, still lack the tools required to do so efficiently.",

      ]
    },
    {
      icon: "Bank",
      title: "Lenders",
      subtitle: "Banks, Funds & Agencies",
      descriptions: [
        "Lenders are the institutions that provide the capital to borrowers. eg Wells Fargo, JPMorgan, etc.",
        "They really want to deploy capital, but are limited by the deals that the advisors are bringing to them.",
        "<b>3,000+</b> lenders, each has different criteria, rates, and appetites-impossible to track manually.",
        "With no standardization, it's <b>impossible to efficiently compare deals</b> from different brokers."
      ]
    }
  ],
  processTimeline: [
    {
      step: "1",
      title: "Borrower Needs $10M",
      time: "Week 1",
      description: "A property owner needs to refinance or purchase, so they contact their trusted broker to find a lender.",
      problem: "No visibility into which of 3,000 lenders want their deal"
    },
    {
      step: "2",
      title: "Relationship Bottleneck",
      time: "Weeks 1-2",
      description: "Broker manually calls their limited network - maybe 5-10 lenders they know personally.",
      problem: "Missing 2,990+ other lenders who might offer better terms"
    },
    {
      step: "3",
      title: "Documents Chaos",
      time: "Weeks 2-8",
      description: "Creating the loan package (OM) takes 6–8 weeks of analyst time. Every update means starting over.",
      problem: "PDFs, spreadsheets, emails - no version control, no live updates"
    },
    {
      step: "4",
      title: "Deals Drag For Months",
      time: "Months 3-6",
      description: "Lender outreach, underwriting, and revisions stretch the process to ~6 months overall.",
      problem: "Half die due to poor matching; surviving deals often accept worse terms"
    }
  ],
  marketInsight: {
    title: "The Hidden Truth About CRE Lending",
    facts: [
      "<b>There are no real CRE lending companies</b> - just marquees with independent contractors working in silos.",
      "<b>50% of borrowers go direct to lenders</b> - and miss better rates because they only know 1-2 banks.",
      "<b>$100B+ in fees annually</b> - yet delivered through phone calls, PDFs, and personal relationships."
    ]
  }
};

// Tagline options
const taglineOptions = [
  "The Operating System for $4.8 Trillion in CRE Debt",
  "Where AI Meets Commercial Real Estate Finance",
  "Uber for Commercial Real Estate (CRE) Lending",
  "The Bloomberg Terminal for CRE Debt Markets",
  "Making CRE Lending Work Like It Should"
];

// Problems: optimized content
const problemCardsForProblemsSection = [
  {
    title: "6-month average timeline with 50% deal mortality rate",
    content: [
      "Most deals die not from lack of capital, but from process inefficiency"
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    title: "Too many lenders, mismatched criteria",
    content: [
      "No efficient way to match borrowers with the right capital sources"
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    title: "No standards, no efficient matching",
    content: [
      "Manual processes that don't scale with market demand"
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    title: "Lenders can't find deals they want",
    content: [
      "<b>3,000 lenders fighting for deal flow</b> - but only see deals from their limited broker network, missing 95% of the market.",
      "<b>Can't compare deals efficiently</b> - every broker sends different formats. No standardization means manual review of each deal.",
      "<b>$957B refinancing in 2025</b> - lenders have capital to deploy but can't find the right deals fast enough in this tsunami of opportunity."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  }
];

// Market: optimized content
const optimizedMarketCards = [
  {
    title: "Massive TAM - Our Path to $10M Annual Revenue",
    content: [
      "<b>$957 billion needs refinancing in 2025 alone</b> - unprecedented volume as COVID-era loans mature and rates normalize. This creates a once-in-a-decade disruption opportunity.",
      "<b>Market expanding to $6 trillion by 2030</b> - as more investors discover CRE debt yields (8-12%), capital floods in. We're positioned to be the infrastructure layer for this growth.",
      "<b>Our Path to $10M Annual Revenue:</b> To reach $10M in annual revenue, we need to place <b>25 loans per year</b>, generating an average of <b>$400,000 in revenue per loan</b>. This represents just <b>1.91%</b> of the <b>1,307</b> commercial loans >$50M transacted in 2024 (Source: HMDA)."
    ],
    assumptions: {
      title: "Calculation Breakdown",
      points: [
        "<b>Total annual transactions >$50M (2024):</b> 1,307 commercial loans (Source: HMDA, publicly available data).",
        "<b>Standard origination fee:</b> 1% of loan amount.",
        "<b>CapMatch take:</b> 80% of origination fee ($400,000 per transaction) - a blended rate assuming a mix of broker-led deals (60% take) and direct/AI-managed deals (100% take).",
        "<b>Loans needed for $10M Annual Revenue:</b> 25 ($10M / $400k per loan).",
        "<b>Required market share:</b> 1.91% (25 loans / 1,307 total loans >$50M from 2024)."
      ]
    }
  },
  {
    title: "Revenue Streams That Compound",
    content: [
      "<b>Transaction Fees (1% of loan amount):</b> Primary revenue stream across construction, bridge, perm and refi cycles. See <b>Financial Metrics</b> below for unit economics and payback.",
      "<b>Platform Subscription Fees:</b> We will offer a suite of subscription-based services, including:<ul><li class='ml-4'><b>AI Markets Advisor:</b> This subscription automates deal coordination, reducing client costs. It also enables us to manage deals internally, allowing us to capture 100% of the transaction fee-a significant increase from the 60% from brokered deals.</li><li class='ml-4'><b>White Glove Service:</b> A premium service for clients who want a hands-on, managed experience.</li><li class='ml-4'><b>Refi Radar & Bloomberg of CRE:</b> A data-driven service for lenders that identifies the optimal time to refinance.</li></ul>",
      "<b>Direct Arbitrage:</b> By targeting real estate borrowers directly, we eliminate broker referral fees, increasing our margins."
    ]
  },
  {
    title: "Why We Win: Network Effects + AI Moat",
    content: [
      "<b>No Cold Start Problem:</b> The founding team's long-term, established relationships and deep history in recruiting allow us to overcome the cold start problem by onboarding a critical mass of lenders and borrowers from day one, ensuring immediate platform activity.",
      "<b>Regulatory Risk Assessment:</b> Our top-tier legal team has prepared a robust compliance framework. Key areas of focus include:<ul><li class='ml-4'><b>Lending Licensing:</b> Proactively securing necessary licenses, like the California Financing Law (CFL), for compliant operation in every state.</li><li class='ml-4'><b>Fair Lending Laws (ECOA):</b> Rigorous auditing of our AI matchmaking algorithm to prevent bias and ensure equitable outcomes.</li><li class='ml-4'><b>Data Privacy (GDPR/CCPA):</b> Ensuring enterprise-grade data protection and privacy compliance to build trust and expand into international markets.</li></ul>",
      "<b>Recurring Value & High Switching Costs:</b> All communication and data live on our platform. Once a deal is done, the data remains, making it seamless to execute future transactions like takeout financing and refinancing, resulting in low churn.",
      "<b>Two-Sided Network Effects:</b> By solving the cold start problem, we can quickly generate powerful network effects, where every new borrower adds value for lenders, and every new lender adds value for borrowers.",
      "<b>Data Moat Deepens Daily:</b> Each transaction trains our AI, creating a powerful data moat that makes our platform smarter and more valuable over time.",
      "<b>Winner-Take-Most Dynamics:</b> Like Uber or Airbnb, the CRE lending market will consolidate around one or two platforms. Our first-mover advantage and ability to scale quickly position us to become the dominant player, putting us 18 months ahead of any potential competition."
    ]
  },
  {
    title: "Competitive Positioning: We Own the Future",
    customComponent: "CompetitiveAnalysisGraph",
    additionalContext: `
      <p class="text-lg text-center mt-6 font-medium">
        Competitors do lending OR software. We're building the operating system for all CRE capital markets.
      </p>
    `
  }
];

// Add: Financial Metrics content (CAC, Payback, LTV) and assumptions
const financialMetrics = {
  title: "Financial Metrics & Unit Economics",
  subtitle: "CAC, Payback, and LTV assumptions grounded in CRE refinance cycles",
  assumptions: [
    "<b>Average deal size:</b> $50M CRE loan (debt placement, not equity).",
    "<b>Fee model:</b> 1% transaction fee; platform retains 60% on broker-led deals, up to 100% on in-house/AI-managed deals.",
    "<b>Refi cadence:</b> Construction (12–24 months) → Permanent; then balloon maturities typically every <b>5–10</b> years with refinance at/near maturity (sources: <a href='https://financelygroup.medium.com/how-long-are-most-commercial-real-estate-loans-typical-terms-and-durations-explained-c09273c7d3b6' target='_blank' rel='noopener noreferrer'>Financely</a>, <a href='https://financelobby.com/cre-insights/cre-loans-understanding-loan-term-vs-amortization/' target='_blank' rel='noopener noreferrer'>FinanceLobby</a>, <a href='https://www.commercialrealestate.loans/commercial-real-estate-glossary/what-are-balloon-loans-what-is-a-5-25/' target='_blank' rel='noopener noreferrer'>Janover</a>).",
    "<b>Refi size vs initial:</b> Typically similar to slightly larger due to amortization + value growth/cash-out; we assume <b>1.0×–1.1×</b> of prior balance on average (conservative).",
    "<b>LTV horizon:</b> 10 years (standard for SaaS-like LTV comparisons; aligns with one refinance cycle post-perm for many CRE assets)."
  ],
  cac: {
    title: "Customer Acquisition Cost (CAC)",
    bullets: [
      "<b>Target customer:</b> Licensed CRE brokers/originators and direct borrowers.",
      "<b>Go-to-market advantage:</b> Founding team has <b>deep CRE operator and brokerage networks</b> and experience <b>recruiting and managing 50+ loan brokers</b> (see Team: Todd Vitzthum, Greystone/Cushman & Wakefield/CBRE; Jeff Richmond's scale history at <b>eXp Realty</b>).",
      "<b>Estimated CAC (broker):</b> $3k–$7k blended (events, outbound, referral incentives, onboarding).",
      "<b>Estimated CAC (borrower direct):</b> $1k–$3k via performance marketing + partner channels.",
      "<b>Payback measured on gross margin</b> from fee revenue and subscriptions."
    ]
  },
  payback: {
    title: "Payback Period (months)",
    formula: "Payback = CAC / (ARPU × Gross Margin %)",
    examples: [
      "<b>Broker-led deal flow:</b> 6 deals/year per broker (user assumption). Annual volume ≈ <b>$300M</b>. 1% fee × 60% platform share → <b>$1.8M</b>/yr revenue per active broker; monthly ARPU ≈ <b>$150k</b>. With 70% gross margin → <b>$105k</b> monthly GM. CAC $5k ⇒ Payback ≈ <b>0.05 months</b> (~1–2 days).",
      "<b>Direct borrower flow:</b> Assume $50M closing/year per borrower cohort at 1% fee × 100% share → <b>$500k</b>/yr; monthly ARPU ≈ <b>$41.7k</b>; 70% GM → <b>$29.2k</b> GM/month. CAC $2k ⇒ Payback ≈ <b>0.07 months</b>."
    ],
    note: "These are illustrative; actual cadence depends on ramp time to first close."
  },
  ltv: {
    title: "Lifetime Value of a single deal (10-year horizon)",
    bullets: [
      "<b>Per deal relationship:</b> Expected financing touchpoints: Construction → Perm (Year ~1–2) → Refi at Year ~6–8. That is <b>~2–3 fee events</b> in 10 years.",
      "<b>Deal size dynamics:</b> Assume initial $50M; refi at 1.05× = <b>$52.5M</b> (midpoint of 1.0×–1.1×).",
      "<b>Fee capture:</b> 1% per event. Blend share 80% (midpoint of 60% broker and 100% managed).",
      "<b>Gross margin:</b> 70%."
    ],
    calc: [
      "Event 1 (Construction → Perm): $50M × 1% × 80% × 70% = <b>$280k GM</b>",
      "Event 2 (Perm → Refi): $52.5M × 1% × 80% × 70% = <b>$294k GM</b>",
      "Optional Event 3 (Additional Refi if triggered by Refi Radar): assume another $52.5M baseline → <b>$294k GM</b>",
      "<b>LTV (2 events):</b> ≈ <b>$574k GM</b>; <b>LTV (3 events):</b> ≈ <b>$868k GM</b> over 10 years."
    ],
    rationale: "Our Refi Radar proactively prompts optimal refinance timing, increasing repeat monetization and compounding LTV."
  }
};

// Team: optimized content
const teamMembers = [
  {
    name: "Dr. Jeff Richmond",
    role: "Co-Founder & CEO",
    content: [
      "Drove $2B+ in annual transaction volume through strategic business development and growth leadership at eXp Realty.",
      "Co-founder of CapMatch and OZ Listings, delivering AI-powered capital markets solutions for multifamily and Opportunity Zone investments.",
      "Chief Operating Partner at ACARA Management, a private equity firm focused on OZ development and capital structuring."
    ]
  },
  {
    name: "Todd Vitzthum",
    role: "Co-Founder & Executive Chairman",
    content: [
      "Executed over $3B in commercial real estate transactions across a 20+ year career, with senior leadership roles at Greystone, Cushman & Wakefield, and CBRE.",
      "As Managing Partner at ACARA Management, he leads multifamily investment strategy and oversees Opportunity Zone deployment across the firm's portfolio.",
      "Co-founder of CapMatch and OZ Listings, he drives the creation of tech-enabled capital platforms and national real estate marketplaces."
    ]
  },
  {
    name: "Michael Krueger",
    role: "Chief Legal Officer",
    content: [
      "Corporate & Securities Partner at Lucosky Brookman LLP, advising family offices, private equity funds, and high-net-worth clients on real estate, finance, and corporate structuring.",
      "Nationally recognized OZ expert and \"California Trailblazer,\" with deep experience in QOF/QOZB formation, SEC compliance, and complex capital stack negotiations.",
      "As Chief Legal Officer at ACARA Management, he leads legal strategy for fund deployment, regulatory alignment, and Opportunity Zone execution."
    ]
  },
  {
    name: "Param Vora",
    role: "Chief Technology Officer",
    content: [
      "Former CTO of Solarcheckr, where he drove a 650% increase in financing approvals and led the company through a successful acquisition.",
      "Built advanced AI copilots and automation pipelines as Director of AI at The Cool Down, which grew to over 60 million monthly visits and became the fastest-growing U.S. media brand in early 2025.",
      "With 7+ years in machine learning and a master's in AI, he leads CapMatch's technology vision across underwriting, automation, and investor intelligence."
    ]
  }
];

// Investment Ask: optimized content
const optimizedInvestmentAsk = {
  headline: "Operating System for $100B CRE Debt",
  askAmount: "$3.5M Pre-Seed Round",
  useOfFunds: [
    {
      category: "Product & AI Development",
      details: "To support the technical team to build out very good existing proof of concept models into production grade products."
    },
    {
      category: "Marketing & Communication",
      details: "Setting up the marketing and communication infrastructure to onboard most of the customers onto the platform."
    },
    {
      category: "Proprietary Data Purchase",
      details: "For information about every lender in the US, every borrower in the US, and every building in the US. This data will be used to build out our communication and customer targeting mechanisms."
    },
    {
      category: "Sales & Customer Success",
      details: "Funds allocated to building a dedicated sales team and customer success function to ensure the success and expansion of initial customers. This investment enables scalable customer acquisition and retention."
    },
    {
      category: "Compliance & Operations",
      details: "Ensuring we operate in a compliance-friendly manner from the very beginning and minimizing OpEx costs for the business."
    },
    {
      category: "Working Capital/Contingency",
      details: "Reserved for unexpected needs, market opportunities, and to provide flexibility for rapid market changes."
    }
  ],
  milestones: [
    "Q1 2025: Launch beta with 25 lenders, 100 advisors",
    "Q2 2025: Process first $100M in loans (proof of concept)",
    "Q3 2025: Reach $500M in loan volume (product-market fit)",
    "Q4 2025: Series A ready with $1B+ in annual volume run rate"
  ],
  callToAction: "Schedule a call to see how we're already processing real deals with committed lenders and borrowers."
};

// Add these video URLs to your solutions cards
const solutionVideos = {
  unifiedPlatform: "https://drive.google.com/file/d/1_Y5xZF_ZG9hDC4-G6PHrfXOOGatv2sR4/preview", // One platform video (CapMatch project demo)
  thirtySecondOMs: "https://drive.google.com/file/d/1iS4vGiqMrPHtEb1y7MiJmP04ixaAHCZq/preview", // 30 second OMs video (matches "AI-Powered Deal Documentation" card)
  aiMatchmaking: "/CapMatchDemo720p.mp4" // AI matchmaking video (matches "Matchmaking" card)
};

// Helper to bold notable figures and notable company names in bios
function emphasizeNotables(text: string): string {
  const companies = [
    'eXp Realty',
    'CapMatch',
    'OZ Listings',
    'ACARA Management',
    'Greystone',
    'Cushman & Wakefield',
    'CBRE',
    'Lucosky Brookman LLP',
    'SEC',
    'Solarcheckr',
    'The Cool Down'
  ];

  // Bold currency amounts, large numbers with B/M/K, and percentages
  let result = text
    .replace(/\$\s?\d{1,3}(?:[,\d]{0,3})*(?:\.\d+)?\s?(?:B|M|K|\+)?/g, match => `<b>${match}</b>`)
    .replace(/\b\d+(?:\.\d+)?\s?(?:B|M|K)\b/g, match => `<b>${match}</b>`)
    .replace(/\b\d{1,3}(?:,\d{3})+\b/g, match => `<b>${match}</b>`)
    .replace(/\b\d+%\b/g, match => `<b>${match}</b>`)
    .replace(/\b\d{1,2}\+\s?years?\b/gi, match => `<b>${match}</b>`);

  // Bold notable company/organization names
  for (const name of companies) {
    const pattern = new RegExp(`(\\b${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b)`, 'g');
    result = result.replace(pattern, '<b>$1</b>');
  }

  return result;
}

// Helper to bold market-size numbers (e.g., $4.8T, 6 trillion, 957B) and year numbers (e.g., 2025, 2030)
function emphasizeNumbersYears(text: string): string {
  return text
    // $4.8T, $957B, $6M, etc. (unit must be adjacent; no trailing letter pickup)
    .replace(/\$\s?\d{1,3}(?:[,\d]{0,3})*(?:\.\d+)?(?:T|B|M|K)?\b/gi, match => `<b>${match}</b>`)
    // 4.8T, 957B, 6M, etc. (without $)
    .replace(/\b\d+(?:\.\d+)?\s?(?:T|B|M|K)\b/gi, match => `<b>${match}</b>`)
    // Numbers before the words trillion/billion (e.g., 6 trillion, 957 billion)
    .replace(/\b(\d+(?:\.\d+)?)\s*(trillion|billion)\b/gi, (_m, num, word) => `<b>${num}</b> ${word}`)
    // Years like 1990-2099
    .replace(/\b(?:19|20)\d{2}\b/g, match => `<b>${match}</b>`);
}

// Helper to bold specific keywords in Problems section titles
function boldProblemTitle(text: string): string {
  const keywords = [
    'invisible', '99%', "can't place debt", 'cant place debt', 'weeks', "can't find deals", 'cant find deals'
  ];
  let result = text;
  for (const raw of keywords) {
    const pattern = new RegExp(`(\\b${raw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b)`, 'gi');
    result = result.replace(pattern, '<b>$1</b>');
  }
  return result;
}

// Add: perfect storm catalysts copy
const perfectStormCards = [
  {
    title: "$4.8T Market Size",
    description:
      "The size of the U.S. commercial real estate (CRE) debt market in 2025 is approximately $4.8 trillion in total outstanding debt, according to multiple major industry sources",
  },
  {
    title: "$957B Refinancing",
    description:
      "$957 billion needs refinancing in 2025 alone - unprecedented volume as COVID-era loans mature and rates normalize. This creates a once-in-a-decade disruption opportunity.",
  },
  {
    title: "Expanding to $6T",
    description:
      "Market expanding to $6 trillion by 2030. As more investors discover CRE debt yields (8-12%), capital floods in. We're positioned to be the infrastructure layer for this growth.",
  },
];

// New: Why Now cards (moved out of Perfect Storm and split into three)
const whyNowCards = [
  {
    title: "Interest Rate Environment",
    description:
      "Rising rates and shifting lending standards make selecting the right lender more critical than ever.",
  },
  {
    title: "Digital Transformation",
    description:
      "Post‑pandemic acceleration of digital adoption is transforming traditionally analog financial services.",
  },
  {
    title: "Refinancing Wave",
    description:
      "Massive volume of loans originated at low rates is coming due in a higher‑rate environment.",
  },
  {
    title: "New Debt Funds",
    description:
      "New debt funds emerged post‑COVID - institutional investors created new lenders that borrowers don't even know exist.",
  },
];

// New: Why CapMatch Wins cards (restored)
const whyWinsCards: { title: string; body: string }[] = [
  {
    title: "Network Effects",
    body: "More borrowers attract more lenders, creating a self‑reinforcing marketplace advantage",
  },
  {
    title: "Data Advantage",
    body: "Proprietary deal and lender data compounds in value; persistent records enable repeat transactions and high switching costs.",
  },
  {
    title: "Industry Expertise",
    body: "Deep CRE and lending experience combined with modern technology capabilities",
  },
  {
    title: "Full Stack Approach",
    body: "End‑to‑end platform vs point solutions – becoming the system of record for CRE lending",
  },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(-1);
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const [expandedMarketCards, setExpandedMarketCards] = useState<Record<string, boolean>>({
    "Revenue Streams That Compound": true,
    "Why We Win: Network Effects + AI Moat": true
  });
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});
  const [expandedFinancial, setExpandedFinancial] = useState<Record<string, boolean>>({
    Assumptions: false,
    CAC: false,
    Payback: false,
    LTV: false,
    CACToLTV: false,
    BurnRunway: false,
  });
  const [assumptionsExpanded, setAssumptionsExpanded] = useState(false);

  const handleProblemSelect = (index: number) => {
    setSelectedProblem(index);
  };

  const handleTeamMemberSelect = (index: number) => {
    setSelectedTeamMember(index);
  };

  const toggleMarketCard = (title: string) => {
    setExpandedMarketCards(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleSolutionCard = (idx: number) => {
    setExpandedSolutions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleFinancialCard = (key: string) => {
    setExpandedFinancial(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 pt-16 relative">
        <div className="text-center w-full max-w-7xl mx-auto">
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center gap-4">
              <Image
                src="/CapMatchLogo.png"
                alt="CapMatch Logo"
                width={100}
                height={100}
                className="h-16 w-20 md:h-20 md:w-24"
                priority
                unoptimized
              />
              <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                CapMatch
              </h1>
            </div>
          </div>
          <p className="mt-4 text-lg md:text-xl text-black/70 dark:text-white/70 font-light whitespace-pre-line mb-8">
            {taglineOptions[2]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Button moved below animation */}
          </div>
        </div>
        
        {/* Animation */}
        <div className="mt-7 w-full max-w-4xl mx-auto">
          <CapMatchAnimation heightRatio={0.48} maxHeight={520} iconScale={1.1} lineThickness={3} />
        </div>
        {/* View Live Demo Button now below animation */}
        <div className="mt-6 flex justify-center">
          <a 
            href="https://capmatch.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            View Live Site
          </a>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </section>



      {/* CRE Education Section - Exact from acara-pitch with CRE Debt Problem inserted before Hidden Reality */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
                {creEducationContent.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-8 max-w-4xl mx-auto">
                {creEducationContent.subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 mb-16 max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: creEducationContent.mainDescription }} />
            </FadeIn>

            {/* Key Players Section */}
            <div className="mb-20">
              <FadeIn delay={0.15}>
                <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                  The Key Players
                </h3>
                <p className="text-lg md:text-xl text-black/60 dark:text-white/60 mb-12 max-w-3xl mx-auto">
                  Understanding the massive ecosystem that moves nearly $1 trillion annually
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
                {creEducationContent.keyPlayers.map((kp, idx) => (
                  <FadeIn key={idx} delay={0.2 + idx * 0.05}>
                    <div className="glass-card rounded-2xl p-6 bg-white/70 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          {kp.icon === 'Building2' && <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                          {kp.icon === 'Briefcase' && <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                          {kp.icon === 'Bank' && <Landmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-black dark:text-white">{kp.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{kp.subtitle}</p>
                          <div className="mt-3 space-y-2 text-base text-gray-800 dark:text-gray-200">
                            {kp.descriptions.map((desc, i) => (
                              <p key={i} dangerouslySetInnerHTML={{ __html: desc }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-20">
              <FadeIn delay={0.35}>
                <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                  How Every Deal Dies Today
                </h3>
                <p className="text-lg md:text-xl text-black/60 dark:text-white/60 mb-12 max-w-3xl mx-auto">
                  The broken 6 month journey that costs borrowers millions and kills half of all deals
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                {creEducationContent.processTimeline.map((item, idx) => (
                  <FadeIn key={idx} delay={0.4 + idx * 0.05}>
                    <div className="text-center glass-card rounded-2xl p-6 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 flex flex-col">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.step}</span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-semibold text-xl md:text-2xl text-black dark:text-white text-center min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center">{item.title}</h3>
                          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 text-center mt-2 min-h-[1.75rem] md:min-h-[2rem] flex items-center justify-center">{item.time}</p>
                          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed text-center flex-1">{item.description}</p>
                        </div>
                        <p className="text-base md:text-lg text-red-600 dark:text-red-400 mt-5 font-semibold text-center">{item.problem}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Inserted: CRE Debt Problem (single block) before Hidden Reality */}
            <div className="mt-8 mb-10">
              <SectionCard>
                <FadeIn>
                  <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center mb-10">CRE Debt Problem</h2>
                </FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {problemCardsForProblemsSection.slice(0,3).map((card, idx) => (
                    <FadeIn key={idx} delay={0.05 * idx}>
                      <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-gray-700 h-full`}>
                        <h3 className={`text-xl md:text-2xl font-semibold mb-4 ${card.textColor}`} dangerouslySetInnerHTML={{ __html: boldProblemTitle(card.title) }} />
                        <ul className="list-disc list-outside pl-6 space-y-3 text-black dark:text-white">
                          {card.content.map((c, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: c }} />
                          ))}
                        </ul>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Market Insight Section */}
            <FadeIn delay={0.6}>
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                  The Hidden Reality
                </h3>
                <p className="text-lg md:text-xl text-black/60 dark:text-white/60 mb-8 max-w-3xl mx-auto">
                  What industry insiders know but won't admit publicly
                </p>
              </div>
              <div className="glass-card rounded-2xl p-8 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 max-w-4xl mx-auto text-left">
                <ul className="list-disc list-outside space-y-4 pl-6">
                  {creEducationContent.marketInsight.facts.map((fact: string, i: number) => (
                    <li key={i} className="text-base md:text-lg text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: fact }} />
                  ))}
                </ul>
              </div>
            </FadeIn>
          </SectionCard>
        </div>
      </section>

      {/* Perfect Storm of Opportunity */}
      <section className="flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">Perfect Storm of Opportunity</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {perfectStormCards.slice(0,3).map((card, idx) => (
                <FadeIn key={idx} delay={0.05 * idx}>
                  <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/20 dark:to-stone-900/20 border border-gray-200 dark:border-white/20 h-full">
                    <h3 className="text-xl md:text-2xl font-semibold text-amber-700 dark:text-amber-300 mb-2">{card.title}</h3>
                    <p className="text-base md:text-lg text-black/80 dark:text-white/80" dangerouslySetInnerHTML={{ __html: emphasizeNumbersYears(card.description) }} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Why Now - separate section with three nested cards */}
      <section className="flex flex-col items-center justify-center p-4 pt-0 md:p-8 md:pt-2">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">Why Now</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {whyNowCards.map((card, idx) => (
                <FadeIn key={idx} delay={0.05 * idx}>
                  <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/20 dark:to-stone-900/20 border border-gray-200 dark:border-white/20 h-full">
                    <h3 className="text-xl md:text-2xl font-semibold text-amber-700 dark:text-amber-300 mb-2">{card.title}</h3>
                    <p className="text-base md:text-lg text-black/80 dark:text-white/80">{card.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Why CapMatch Wins */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center mb-10">Why CapMatch Wins</h2>
            </FadeIn>
            {/* Full-width Cold Start card */}
            <div className="mb-8">
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20">
                <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-3 text-center">No Cold Start Problem</h3>
                <ul className="list-disc list-outside pl-6 space-y-2 text-base md:text-lg text-black/90 dark:text-white/90 max-w-5xl mx-auto">
                  <li>Proprietary lender data is available for purchase, enabling immediate market coverage.</li>
                  <li>The founding team's long-term, established relationships and deep history in recruiting allow us to onboard a critical mass of lenders and borrowers from day one, ensuring immediate platform activity.</li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {whyWinsCards.map((c, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="glass-card rounded-2xl p-6 bg-purple-50/60 dark:bg-purple-900/20 border border-gray-200 dark:border-gray-700 h-full">
                    <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">{c.title}</h3>
                    <p className="text-base md:text-lg text-black/80 dark:text-white/80">{c.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            {/* Winner-Take-Most Dynamics full-width card */}
            <div className="mt-8">
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20">
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">Competitive Positioning</h3>
                <CompetitiveAnalysisGraph />
              </div>
            </div>
          </SectionCard>
        </div>
      </section>


      {/* Team Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
                Leadership Team
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
                $6B+ in combined transaction volume and 20+ years of expertise in real estate, lending, and technology.
              </p>
            </FadeIn>

            {/* Spotlight Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
              {/* Navigation Tabs - 40% width */}
              <FadeIn className="lg:col-span-2 flex lg:flex-col justify-center items-center order-2 lg:order-1">
                <div className="flex flex-col gap-4 w-full justify-center">
                  {teamMembers.map((member, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleTeamMemberSelect(idx)}
                      className={`relative group p-4 md:p-6 rounded-2xl transition-all duration-300 border-2 w-full ${
                        selectedTeamMember === idx
                          ? 'bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 border-indigo-300 dark:border-indigo-500 shadow-lg transform scale-105'
                          : 'bg-white/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/20 dark:hover:to-blue-900/20 hover:border-indigo-200 dark:hover:border-indigo-600 hover:scale-102'
                      }`}
                      whileHover={{ scale: selectedTeamMember === idx ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="text-left">
                        <h4 className={`text-lg md:text-xl font-bold mb-1 ${
                          selectedTeamMember === idx 
                            ? 'text-indigo-900 dark:text-indigo-200' 
                            : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {member.name}
                        </h4>
                        <p className={`text-sm md:text-base font-medium ${
                          selectedTeamMember === idx 
                            ? 'text-indigo-700 dark:text-indigo-300' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {member.role}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </FadeIn>

              {/* Central Spotlight Card - 60% width */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <motion.div
                  key={selectedTeamMember}
                  className="glass-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20 shadow-lg dark:shadow-2xl shadow-gray-200/50 dark:shadow-white/10 min-h-[500px] md:min-h-[600px] flex flex-col justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-200 mb-3">
                      {teamMembers[selectedTeamMember].name}
                    </h3>
                    <p className="text-xl md:text-2xl text-indigo-700 dark:text-indigo-300 font-semibold">
                      {teamMembers[selectedTeamMember].role}
                    </p>
                  </div>
                  <div className="text-left max-w-4xl mx-auto">
                    <ul className="space-y-6">
                      {teamMembers[selectedTeamMember].content.map((item, itemIdx) => (
                        <motion.li 
                          key={itemIdx} 
                          className="text-lg md:text-xl text-black dark:text-white leading-relaxed font-light flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIdx * 0.1 + 0.2 }}
                        >
                          <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                          <span dangerouslySetInnerHTML={{ __html: emphasizeNotables(item) }} />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>

            <FadeIn>
              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 w-full max-w-7xl mx-auto">
                <p className="text-lg text-indigo-700 dark:text-indigo-400 mb-4">
                  Current Team size:  10
                </p>
                <p className="text-lg text-indigo-700 dark:text-indigo-400">
                  Roles filled: Chief Market Advisor, Head of Growth, Head of Communications, VP Communications, VP Engineering, Head of Investor Relations
                </p>
              </div>
            </FadeIn>

          </SectionCard>
        </div>
      </section>

      {/* Standalone Ask Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
                {optimizedInvestmentAsk.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
                {optimizedInvestmentAsk.askAmount}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:gap-8 mb-10 text-left items-stretch">
              <FadeIn>
                <div className="glass-card rounded-2xl p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 h-full">
                  <h3 className="text-2xl font-semibold text-amber-700 dark:text-amber-300 mb-4">Use of Funds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {optimizedInvestmentAsk.useOfFunds.map((u, i) => (
                      <div key={i} className="rounded-xl bg-white/70 dark:bg-gray-900/40 border border-amber-200/60 dark:border-amber-800/40 px-5 py-4 md:px-6 md:py-6 min-h-28 md:min-h-32 flex flex-col items-center justify-center text-center text-black dark:text-white text-base md:text-lg leading-relaxed">
                        <span className="font-semibold mb-2">{u.category}</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{u.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            <FadeIn>
              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 w-full max-w-7xl mx-auto">
                <p className="text-lg text-amber-600 dark:text-amber-300 mb-6">
                  {optimizedInvestmentAsk.callToAction}
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </button>
              </div>
            </FadeIn>
          </SectionCard>
        </div>
      </section>

      <ContactUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
} 