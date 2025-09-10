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
  title: "The $4.8 Trillion Opportunity ",
  subtitle: "Commercial Real Estate lending is massive, fragmented, and ripe for disruption",
  mainDescription: "This year, <span class=\"font-semibold\">$957 billion</span> in commercial real estate loans need refinancing. Yet the process hasn't changed since the 1980s. Here's how it works today:",
  keyPlayers: [
    {
      icon: "Building2",
      title: "Borrowers",
      subtitle: "Property Owners & Developers",
      descriptions: [
        "Own an estimated <b>5 million+</b> apartment buildings (5+ units) across the U.S.",
        "<b>96%</b> have active debt that needs constant refinancing.",
        "Their <b>biggest challenge</b>: finding the right lender among <b>3,000+</b> options."
      ]
    },
    {
      icon: "Briefcase",
      title: "Advisors",
      subtitle: "Loan Brokers & Originators",
      descriptions: [
        "<b>120,000</b> licensed brokers who should be placing debt but lack the tools and connections.",
        "The process is so inefficient that originators keep <b>60%+ of commissions</b>, and the industry misses <b>$4B in fees</b> annually."
      ]
    },
    {
      icon: "Bank",
      title: "Lenders",
      subtitle: "Banks, Funds & Agencies",
      descriptions: [
        "<b>3,000+</b> lenders, each has different criteria, rates, and appetites—impossible to track manually.",
        "With no standardization, it's <b>impossible to efficiently compare deals</b> from different brokers."
      ]
    }
  ],
  processTimeline: [
    {
      step: "1",
      title: "Borrower Needs $10M",
      time: "Week 1",
      description: "Property owner needs to refinance or purchase. Time is critical - deals move fast.",
      problem: "No visibility into which of 3,000 lenders want their deal"
    },
    {
      step: "2",
      title: "Advisor Scrambles",
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
      "<b>There are no real CRE lending companies</b> - just marquees with independent contractors working in silos",
      "<b>50% of borrowers go direct to lenders</b> - and miss better rates because they only know 1-2 banks",
      "<b>New debt funds emerged post-COVID</b> - institutional investors created 1,000+ new lenders that borrowers don't even know exist",
      "<b>$100B+ in fees annually</b> - yet delivered through phone calls, PDFs, and personal relationships"
    ]
  }
};

// Tagline options
const taglineOptions = [
  "The Operating System for $4.8 Trillion in CRE Debt",
  "Where AI Meets Commercial Real Estate Finance",
  "Uber for Commercial Real Estate Lending",
  "The Bloomberg Terminal for CRE Debt Markets",
  "Making CRE Lending Work Like It Should"
];

// Problems: optimized content
const problemCardsForProblemsSection = [
  {
    title: "Borrowers are invisible to 99% of lenders",
    content: [
      "<b>Only 5-10 lenders see each deal</b> - brokers show deals only to their personal contacts, missing 2,990+ other active lenders who might offer better terms.",
      "<b>50% of deals fail from poor matching</b> - borrowers don't know what lenders want, so they waste time pitching to the wrong ones.",
      "<b>Leaving millions on the table</b> - a 0.25% rate difference on a $50M loan costs $125,000/year. Borrowers never know what they missed."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    title: "120,000 brokers can't place debt efficiently",
    content: [
      "<b>Zero infrastructure for loan brokers</b> - licensed professionals with no platform, no leads, no standardized process. Each rebuilds the wheel.",
      "<b>60%+ commission to originator</b> - inefficiency means brokers keep most fees just to survive, making the model unscalable.",
      "<b>$4B in missed commissions annually</b> - brokers who could place debt don't, because the process is too complex without proper tools."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    title: "Deal documents take 6-8 weeks to create",
    content: [
      "<b>Analyst teams burn 160 hours per deal</b> - manually assembling offering memorandums from scattered PDFs, emails, and spreadsheets.",
      "<b>Every change triggers complete rewrites</b> - no version control means confusion, delays, and deals dying from stale information.",
      "<b>Static PDFs in a dynamic market</b> - by the time the OM is done, market conditions changed. Lenders see outdated info."
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
    title: "Massive TAM, Immediate Revenue",
    content: [
      "<b>$957 billion needs refinancing in 2025 alone</b> - unprecedented volume as COVID-era loans mature and rates normalize. This creates a once-in-a-decade disruption opportunity.",
      "<b>Our serviceable addressable market: $100 billion in loans</b> - capturing just 10% of annual refinancing volume at 1% fees generates $1 billion in revenue.",
      "<b>Market expanding to $6 trillion by 2030</b> - as more investors discover CRE debt yields (8-12%), capital floods in. We're positioned to be the infrastructure layer for this growth."
    ]
  },
  {
    title: "Revenue Streams That Compound",
    content: [
      "<b>Transaction Fees (1% of loan amount):</b> Our primary revenue stream comes from a 1% fee (industry standard) on the total loan amount.<ul><li class='ml-4'><b>Unit Economics:</b> We project our revenue based on a conservative estimate: <br/>- 100 brokers join our platform. <br/>- Each broker manages a $50M loan book (conservative, as the industry average is $60M and median is $40M), for a total of $5B in volume. <br/>- A 1% commission on this volume generates $50M in fees. <br/>- We take a 60% share, resulting in <b>$30M in annual revenue</b>. (The remaining 40% is given to the broker as a referral fee).<br/><br/><b>Why this is conservative:</b> The CRE broker market follows a Pareto distribution (80/20 rule). With 120,000 brokers in the US, the top 20% consists of 24,000 brokers. Our target of 100 brokers is just <b>0.42%</b> of this high-performing group, making our projections highly achievable.</li></ul>",
      "<b>Platform Subscription Fees:</b> We will offer a suite of subscription-based services, including:<ul><li class='ml-4'><b>AI Markets Advisor:</b> This subscription automates deal coordination, reducing client costs. It also enables us to manage deals internally, allowing us to capture 100% of the transaction fee—a significant increase from the 60% from brokered deals.</li><li class='ml-4'><b>White Glove Service:</b> A premium service for clients who want a hands-on, managed experience.</li><li class='ml-4'><b>Refi Radar & Bloomberg of CRE:</b> A data-driven service for lenders that identifies the optimal time to refinance.</li></ul>",
      "<b>Direct Arbitrage:</b> By targeting real estate brokers directly, we eliminate referral fees, increasing our margins."
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

// Team: optimized content
const teamMembers = [
  {
    name: "Dr. Jeff Richmond",
    role: "Co-Founder & CEO",
    content: [
      "<b>Built and scaled to $2B+ annual revenue</b> at eXp Realty - knows how to build massive, tech-enabled marketplaces in traditional industries.",
      "<b>Deep CRE operator experience</b> through ACARA Management - understands borrower pain firsthand, having refinanced $500M+ in properties.",
      "<b>Serial entrepreneur in PropTech</b> - co-founded OZ Listings (acquired) and built multiple AI-powered real estate platforms."
    ]
  },
  {
    name: "Todd Vitzthum",
    role: "Co-Founder & Executive Chairman",
    content: [
      "<b>Closed $3B+ in CRE transactions</b> over 20+ years at Greystone, Cushman & Wakefield, and CBRE - has the relationships and credibility to onboard top lenders.",
      "<b>Managed 50+ loan brokers</b> at peak - understands exactly why the current model is broken and how to fix it.",
      "<b>Active LP in 15+ real estate funds</b> - brings instant credibility and connections with institutional capital partners."
    ]
  },
  {
    name: "Michael Krueger",
    role: "Chief Legal Officer",
    content: [
      "<b>Structured $1B+ in CRE funds</b> as Partner at Lucosky Brookman LLP - ensures compliance with complex lending regulations from day one.",
      "<b>Nationally recognized Opportunity Zone expert</b> - literally wrote the playbook on new CRE financing structures, positioning us for emerging markets.",
      "<b>Board advisor to 3 PropTech unicorns</b> - brings lessons learned from scaling in regulated financial markets."
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
  headline: "The Operating System for $4.8T CRE Debt",
  askAmount: "$3.5M Pre-Seed Round",
  useOfFunds: [
    {
      category: "Product & AI Development - 40%",
      details: "To support the technical team to build out very good existing proof of concept models into production grade products."
    },
    {
      category: "Marketing & Communication - 20%",
      details: "Setting up the marketing and communication infrastructure to onboard most of the customers onto the platform."
    },
    {
      category: "Proprietary Data Purchase - 15%",
      details: "For information about every lender in the US, every borrower in the US, and every building in the US. This data will be used to build out our communication and customer targeting mechanisms."
    },
    {
      category: "Sales & Customer Success - 10%",
      details: "Funds allocated to building a dedicated sales team and customer success function to ensure the success and expansion of initial customers. This investment enables scalable customer acquisition and retention."
    },
    {
      category: "Compliance & Operations - 10%",
      details: "Ensuring we operate in a compliance-friendly manner from the very beginning and minimizing OpEx costs for the business."
    },
    {
      category: "Working Capital/Contingency - 5%",
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

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(-1);
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const [expandedMarketCards, setExpandedMarketCards] = useState<Record<string, boolean>>({
    "Revenue Streams That Compound": true,
    "Why We Win: Network Effects + AI Moat": true
  });
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});

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
            {taglineOptions[0]}
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

      {/* CRE Education Section */}
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

      {/* Solutions Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center mb-8 md:mb-12">
                CapMatch - The Complete Solution
              </h2>
            </FadeIn>

            {/* Split into two halves horizontally */}
            <div className="space-y-6">
              {/* Top Half - Lead Generation */}
              <div className="w-full">
                <FadeIn delay={0.1}>
                  <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-8">
                    Lead Generation
                  </h3>
                </FadeIn>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Activate 120k Brokers Card */}
                  <FadeIn delay={0.15}>
                    <div className="glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full min-h-[300px] flex flex-col justify-center">
                      <h4 className="text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4 text-center">
                        Activate 120k Brokers
                      </h4>
                      <div className="text-left">
                        <ul className="list-disc list-outside pl-6 space-y-3">
                          <li className="text-base md:text-lg text-black dark:text-white">
                            <b>Instant lender network access</b> - Every licensed broker gets immediate access to our 3,000+ verified lenders
                          </li>
                          <li className="text-base md:text-lg text-black dark:text-white">
                            <b>AI-powered deal matching</b> - Our platform automatically matches broker deals with the right lenders
                          </li>
                          <li className="text-base md:text-lg text-black dark:text-white">
                            <b>Commission optimization</b> - Streamlined process allows brokers to focus on relationships, not paperwork
                          </li>
                        </ul>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Direct Borrower Connection Card */}
                  <FadeIn delay={0.2}>
                    <div className="glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full min-h-[300px] flex flex-col justify-center">
                      <h4 className="text-2xl md:text-3xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center">
                        Direct Borrower Connection
                      </h4>
                      <div className="text-left">
                        <ul className="list-disc list-outside pl-6 space-y-3">
                          <li className="text-base md:text-lg text-black dark:text-white">
                            <b>Skip the middleman</b> - Property owners connect directly with lenders when they need speed
                          </li>
                          <li className="text-base md:text-lg text-black dark:text-white">
                            <b>Real-time rate discovery</b> - See live rates from multiple lenders instantly, not weeks later
                          </li>
                          <li className="text-base md:text-lg text-black dark:text-white">
                            <b>Transparent process</b> - Track application status, requirements, and next steps in real-time
                          </li>
                        </ul>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Bottom Half - 4 Column Solution Cards */}
              <div className="w-full">
                <FadeIn delay={0.25}>
                  <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-8">
                    Complete Platform Solutions
                  </h3>
                </FadeIn>
                
                <div className="relative">
                  {/* Grid container for cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {/* One platform from first call to wire transfer */}
                    <FadeIn delay={0.3}>
                      <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 self-start ${expandedSolutions[0] ? '' : 'min-h-[140px]'} flex flex-col`}>
                        <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                          One platform from first call to wire transfer
                        </h4>
                        {expandedSolutions[0] && (
                          <div className="flex-1 flex flex-col justify-center">
                            <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-3">
                              <li><b>Borrowers:</b> Build your profile once, use forever. <b>No redundant data entry</b> - just update deal specifics. Track all lender interest in real-time.</li>
                              <li><b>Lenders:</b> <b>Standardized deal packages</b> for instant comparison. Chat with borrowers, request docs, and close deals all in one place.</li>
                              <li><b>Advisors:</b> Manage <b>unlimited deals simultaneously</b> with our workflow automation. One dashboard for all borrowers, lenders, and documents.</li>
                            </ul>
                            {/* Video Section */}
                            <div className="mt-6 flex-grow relative">
                              <div className="w-full h-full flex items-center justify-center">
                                <DriveVideo previewUrl={solutionVideos.unifiedPlatform} />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="mt-6 flex justify-center">
                          <button
                            type="button"
                            onClick={() => toggleSolutionCard(0)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-transform"
                            aria-expanded={!!expandedSolutions[0]}
                            aria-label={expandedSolutions[0] ? 'Collapse' : 'Expand'}
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSolutions[0] ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </FadeIn>

                    {/* 30-second OMs with live updates */}
                    <FadeIn delay={0.35}>
                      <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 self-start ${expandedSolutions[1] ? '' : 'min-h-[140px]'} flex flex-col`}>
                        <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                          30-second OMs with live updates
                        </h4>
                        {expandedSolutions[1] && (
                          <div className="flex-1 flex flex-col justify-center">
                            <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-3">
                              <li><b>Borrowers:</b> Drag and drop any documents - our AI extracts, organizes, and creates your OM in <b>30 seconds, not 3 weeks</b>.</li>
                              <li><b>Lenders:</b> See <b>live, dynamic OMs</b> that update in real-time. Ask our AI questions about any deal and get instant answers with sources.</li>
                              <li><b>Advisors:</b> <b>Save 160 hours per deal</b>. No more manual package creation. Focus on relationships while AI handles documentation.</li>
                            </ul>
                            {/* Video Section */}
                            <div className="mt-6 flex-grow relative">
                              <div className="w-full h-full flex items-center justify-center">
                                <DriveVideo previewUrl={solutionVideos.thirtySecondOMs} />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="mt-6 flex justify-center">
                          <button
                            type="button"
                            onClick={() => toggleSolutionCard(1)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-transform"
                            aria-expanded={!!expandedSolutions[1]}
                            aria-label={expandedSolutions[1] ? 'Collapse' : 'Expand'}
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSolutions[1] ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </FadeIn>

                    {/* AI predicts perfect matches */}
                    <FadeIn delay={0.4}>
                      <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 self-start ${expandedSolutions[2] ? '' : 'min-h-[140px]'} flex flex-col`}>
                        <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                          AI predicts perfect matches
                        </h4>
                        {expandedSolutions[2] && (
                          <div className="flex-1 flex flex-col justify-center">
                            <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-3">
                              <li><b>Borrowers:</b> <b>75% higher success rate</b> - our AI knows exactly which lenders want your deal based on similar successful transactions.</li>
                              <li><b>Lenders:</b> <b>10x more qualified deals</b> with our white-glove curation service. Only see deals that match your investment thesis.</li>
                              <li><b>Advisors:</b> <b>Close deals 3x faster</b> with AI-powered matching. Higher success rates mean better reputation and more referrals.</li>
                            </ul>
                            {/* Video Section */}
                            <div className="mt-6 flex-grow relative">
                              <div className="w-full h-full flex items-center justify-center">
                                <DriveVideo previewUrl={solutionVideos.aiMatchmaking} />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="mt-6 flex justify-center">
                          <button
                            type="button"
                            onClick={() => toggleSolutionCard(2)}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-transform"
                            aria-expanded={!!expandedSolutions[2]}
                            aria-label={expandedSolutions[2] ? 'Collapse' : 'Expand'}
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedSolutions[2] ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </FadeIn>

                    {/* Customer Lifetime Value */}
                    <FadeIn delay={0.45}>
                      <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 self-start ${expandedSolutions[3] ? '' : 'min-h-[140px]'} flex flex-col`}>
                        <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                          Customer Life Time Value
                        </h4>
                        {expandedSolutions[3] && (
                          <div className="flex-1 flex flex-col justify-center">
                            <ul className="list-disc list-outside pl-6 text-black dark:text-white space-y-3">
                              <li><b>Customer lock-in:</b> Profiles, docs, and lender threads stay on-platform, compounding value over time.</li>
                              <li><b>Takeout financing:</b> One-click move from bridge/construction to perm with reusable data and auto-packages.</li>
                              <li><b>Refinancing - RefiRadar:</b> <b>Watches market conditions 24/7</b> to tell you the best time to refinance your loan for best terms - <b>perfect loan, at the perfect time, with the perfect lender</b>.</li>
                              </ul>
                            </div>
                          )}
                          <div className="mt-6 flex justify-center">
                            <button
                              type="button"
                              onClick={() => toggleSolutionCard(3)}
                              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-transform"
                              aria-expanded={!!expandedSolutions[3]}
                              aria-label={expandedSolutions[3] ? 'Collapse' : 'Expand'}
                            >
                              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSolutions[3] ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Arrows between cards - only visible on xl screens and above */}
                  <div className="hidden xl:block absolute inset-0 pointer-events-none">
                    {/* Arrow 1: Card 1 to Card 2 */}
                    <div className="absolute transform -translate-y-1/2" style={{ left: 'calc(25% - 1.1rem)', top: '70px' }}>
                      <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    
                    {/* Arrow 2: Card 2 to Card 3 */}
                    <div className="absolute transform -translate-y-1/2" style={{ left: 'calc(50% - 0.75rem)', top: '70px' }}>
                      <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    
                    {/* Arrow 3: Card 3 to Card 4 */}
                    <div className="absolute transform -translate-y-1/2" style={{ left: 'calc(75% - 0.45rem)', top: '70px' }}>
                      <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Market Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
              The $1 Trillion Market Opportunity
            </h2>
            <div className="space-y-8">
              {/* First 3 cards stacked vertically */}
              {optimizedMarketCards.slice(0, 3).map((card, idx) => {
                const isExpandable = true;
                const isExpanded = !!expandedMarketCards[card.title];
                return (
                  <motion.div
                    key={idx}
                    className="glass-card rounded-3xl p-0 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-6xl mx-auto overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between text-left px-10 py-8 ${isExpandable ? 'cursor-pointer' : 'cursor-default'}`}
                      onClick={() => isExpandable && toggleMarketCard(card.title)}
                      aria-expanded={isExpanded}
                      aria-controls={`market-card-content-${idx}`}
                    >
                      <h3 className="text-3xl font-semibold text-black dark:text-white">
                        {card.title}
                      </h3>
                      {isExpandable && (
                        <ChevronDown
                          className={`w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>

                    {/* Content */}
                    {(!isExpandable || isExpanded) && (
                      <div id={`market-card-content-${idx}`} className="px-10 pb-10">
                        <div className="glass-card rounded-2xl p-6 bg-white/70 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 shadow-sm">
                          <ul className="list-disc list-outside space-y-5 pl-8 text-left">
                            {(card.content || []).map((item, itemIdx) => (
                              <li key={itemIdx} className="text-xl text-black dark:text-white leading-relaxed" 
                                  dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* 4th card with competitive analysis graph */}
              <motion.div
                className="glass-card rounded-3xl p-10 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-semibold text-black dark:text-white mb-8">
                  {optimizedMarketCards[3].title}
                </h3>
                <CompetitiveAnalysisGraph />
                {optimizedMarketCards[3].additionalContext && (
                  <div className="mt-4" dangerouslySetInnerHTML={{ __html: optimizedMarketCards[3].additionalContext as string }} />
                )}
              </motion.div>
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
                The Team to Execute
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
                  <span className="font-semibold">Current Team Size:</span> 10
                </p>
                <p className="text-lg text-indigo-700 dark:text-indigo-400">
                  <span className="font-semibold">Roles Filled:</span> Chief Market Advisor, Head of Growth, Head of Communications, VP Communications, VP Engineering, Head of Investor Relations
                </p>
              </div>
            </FadeIn>

            {/* Investment Ask Section */}
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
                    {/* 18-Month Timeline Card */}
                    <FadeIn>
                      <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5">
                        <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6 text-center">
                          18-Month Timeline <span className="text-lg font-medium">(Accelerated for Ready Customers)</span>
                        </h3>
                        {/* Timeline Phases with aligned sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                          {[
                            {
                              number: '1',
                              title: 'Platform Rush',
                              months: 'Month 1',
                              content: [
                                { type: 'bullets', value: ['Platform MVP, first deals, refine from real data'] },
                                { type: 'success', value: '3 customers, $150M+ volume' }
                              ]
                            },
                            {
                              number: '2',
                              title: 'Data Integration', // swapped title
                              months: 'Months 2-6',
                              content: [
                                { type: 'bullets', value: ['Integrate proprietary data and customer acquisition'] },
                                { type: 'success', value: '15 customers, $750M+ volume' }
                              ]
                            },
                            {
                              number: '3',
                              title: 'Expansion', // swapped title
                              months: 'Months 7-12',
                              content: [
                                { type: 'bullets', value: ['Scale to 30+ customers with marketing ramp-up '] },
                                { type: 'success', value: '30+ customers, $1.5B+ volume' }
                              ]
                            },
                            {
                              number: '4',
                              title: 'Scaling',
                              months: 'Months 13-18',
                              content: [
                                { type: 'bullets', value: ['50+ customers, market leadership'] },
                                { type: 'success', value: '50+ customers, $2.5B+ volume' }
                              ]
                            }
                          ].map((phase, idx) => (
                            <div
                              key={phase.number}
                              className="glass-card rounded-2xl p-6 bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 flex flex-col h-full text-center"
                            >
                              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{phase.number}</span>
                              </div>
                              <h4 className="text-xl font-semibold text-blue-700 dark:text-blue-300 min-h-[2.5rem] flex items-center justify-center mb-0">{phase.title}</h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300 min-h-[1.5rem] flex items-center justify-center mb-0">{phase.months}</p>
                              {/* Spacer for alignment */}
                              <div className="min-h-[2.5rem] flex items-end justify-center mb-0">
                                <span className="invisible">spacer</span>
                              </div>
                              {/* Content: focus bullet and success */}
                              <div className="flex-1 flex flex-col justify-start">
                                {/* Focus bullet */}
                                <div className="flex flex-col items-center justify-center min-h-[4.75rem]">
                                  {Array.isArray(phase.content[0].value) && (
                                    <ul className="list-disc pl-5 mb-2 text-black dark:text-white text-sm space-y-1 w-full text-left">
                                      <li className="min-h-[2.5rem] flex items-center">{phase.content[0].value[0]}</li>
                                    </ul>
                                  )}
                                </div>
                                {/* Success */}
                                <div className="flex flex-col items-center justify-center min-h-[2.5rem] mt-auto">
                                  {(() => {
                                    const val = Array.isArray(phase.content[1].value) ? phase.content[1].value.join(', ') : phase.content[1].value;
                                    const [customer, volume] = val.split(', ');
                                    return (<>
                                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-center w-full">{customer}</span>
                                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-center w-full">{volume}</span>
                                    </>);
                                  })()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Key Success Milestones Table */}
                        <div className="overflow-x-auto mb-10">
                          <table className="min-w-full text-sm md:text-base text-left border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                              <tr>
                                <th className="px-4 py-2 font-semibold">Timeline</th>
                                <th className="px-4 py-2 font-semibold">Customer Goal</th>
                                <th className="px-4 py-2 font-semibold">Deal Volume Goal</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-2">Month 1</td>
                                <td className="px-4 py-2">3 customers processing</td>
                                <td className="px-4 py-2">$150M+ volume</td>
                              </tr>
                              <tr className="border-t border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-2">Month 6</td>
                                <td className="px-4 py-2">15 active customers</td>
                                <td className="px-4 py-2">$750M+ volume</td>
                              </tr>
                              <tr className="border-t border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-2">Month 12</td>
                                <td className="px-4 py-2">30+ active customers</td>
                                <td className="px-4 py-2">$1.5B+ volume</td>
                              </tr>
                              <tr className="border-t border-gray-200 dark:border-gray-700">
                                <td className="px-4 py-2">Month 18</td>
                                <td className="px-4 py-2">50+ customers</td>
                                <td className="px-4 py-2">$2.5B+ volume</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* Risks & Mitigation */}
                        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-4xl mx-auto text-center">
                          <h4 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-4 text-center">Primary Funding Needs</h4>
                          <div className="flex flex-col gap-6">
                            {/* Platform Development Resources */}
                            <div className="rounded-xl bg-white/80 dark:bg-gray-900/40 border border-red-200 dark:border-red-700 p-5 shadow-sm">
                              <div className="text-lg font-bold text-red-700 dark:text-red-300 mb-1">Platform development resources</div>
                              <div className="text-base text-black dark:text-white mb-1">
                                Hire experienced CRE fintech developers immediately
                              </div>
                            </div>
                            {/* Customer Onboarding Support */}
                            <div className="rounded-xl bg-white/80 dark:bg-gray-900/40 border border-yellow-200 dark:border-yellow-700 p-5 shadow-sm">
                              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-1">Customer onboarding support</div>
                              <div className="text-base text-black dark:text-white mb-1">
                                Dedicated customer success team, start with simplest deals
                              </div>
                            </div>
                            {/* Regulatory & Compliance Investment */}
                            <div className="rounded-xl bg-white/80 dark:bg-gray-900/40 border border-yellow-200 dark:border-yellow-700 p-5 shadow-sm">
                              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-1">Regulatory & compliance investment</div>
                              <div className="text-base text-black dark:text-white mb-1">
                                Legal counsel from day 1, early compliance investment
                              </div>
                            </div>
                          </div>
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
          </SectionCard>
        </div>
      </section>

      <ContactUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
} 