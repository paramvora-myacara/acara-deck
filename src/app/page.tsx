'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, ExternalLink, MessageCircle, Building2, Briefcase, Landmark } from "lucide-react";
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
  const [useIframe, setUseIframe] = useState(false);
  const idMatch = previewUrl.match(/\/d\/([^/]+)/);
  const directUrl = idMatch ? `https://drive.google.com/uc?export=download&id=${idMatch[1]}` : null;

  if (useIframe || !directUrl) {
    return (
      <iframe
        src={previewUrl}
        className="rounded-lg w-full h-48 md:h-64 lg:h-80 border-0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Video content"
      />
    );
  }

  return (
    <video
      src={directUrl}
      controls
      playsInline
      className="rounded-lg w-full h-48 md:h-64 lg:h-80 object-contain"
      onError={() => setUseIframe(true)}
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
      title: "30,000 Borrowers",
      subtitle: "Property Owners & Developers",
      description: "Own 100,000+ apartment buildings (20+ units) across the U.S. - 96% have active debt that needs constant refinancing"
    },
    {
      icon: "Briefcase",
      title: "120,000 Advisors",
      subtitle: "Loan Brokers & Originators",
      description: "Licensed brokers who should be placing debt, but most can't - they lack tools, leads, and lender connections"
    },
    {
      icon: "Bank",
      title: "3,000+ Lenders",
      subtitle: "Banks, Funds & Agencies",
      description: "From regional banks to new debt funds, each with different criteria, rates, and appetites - impossible to track manually"
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
      "<b>Transaction Fees (1% of loan amount):</b> $10B revenue potential on $1T in loans. Industry standard pricing with 10x better service.",
      "<b>AI Advisor Platform:</b> Brokers subscribe for tools. Land-and-expand model with upsells.",
      "<b>Data & Intelligence Layer:</b> Proprietary market data becomes the 'Bloomberg of CRE' - high-margin recurring revenue from every market participant."
    ]
  },
  {
    title: "Why We Win: Network Effects + AI Moat",
    content: [
      "<b>Two-sided network effects:</b> Every borrower attracts lenders, every lender attracts borrowers. Competitors can't replicate our liquidity.",
      "<b>Data moat deepens daily:</b> Each transaction trains our AI. We'll know more about CRE lending patterns than anyone else within 18 months.",
      "<b>Platform lock-in:</b> Once borrowers build profiles and lenders integrate workflows, switching costs become prohibitive.",
      "<b>Winner-take-most dynamics:</b> Like Uber or Airbnb, the market will consolidate around 1-2 platforms. We're 18 months ahead."
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
      category: "Product & AI Development",
      percentage: "40%",
      details: "Complete MVP, integrate 3,000+ lender APIs, train matching algorithms"
    },
    {
      category: "Lender & Advisor Onboarding",
      percentage: "30%",
      details: "Onboard first 100 lenders and 1,000 advisors - critical mass for network effects"
    },
    {
      category: "Customer Acquisition",
      percentage: "20%",
      details: "Target $100M in LOIs from borrowers - proof of demand for Series A"
    },
    {
      category: "Compliance & Operations",
      percentage: "10%",
      details: "State lending licenses, SOC2 compliance, audit infrastructure"
    }
  ],
  milestones: [
    "Q1 2025: Launch beta with 25 lenders, 100 advisors",
    "Q2 2025: Process first $100M in loans (proof of concept)",
    "Q3 2025: Reach $500M in loan volume (product-market fit)",
    "Q4 2025: Series A ready with $1B+ in annual volume run rate"
  ],
  whyNow: [
    "<b>Perfect storm of opportunity:</b> $957B refinancing wave + AI capabilities + market dislocation from rate changes",
    "<b>Regulatory tailwinds:</b> New banking regulations favor marketplace lending over traditional bank lending",
    "<b>Industry ready for change:</b> COVID proved digital transformation works in CRE. Stakeholders actively seeking solutions.",
    "<b>First-mover advantage:</b> 18-month window before competitors can catch up. Winner takes most of the market."
  ],
  callToAction: "Schedule a demo to see how we're already processing real deals with committed lenders and borrowers."
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
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);

  const handleProblemSelect = (index: number) => {
    setSelectedProblem(index);
  };

  const handleTeamMemberSelect = (index: number) => {
    setSelectedTeamMember(index);
  };

  const toggleMarketCard = (title: string) => {
    setExpandedMarketCards(prev => ({ ...prev, [title]: !prev[title] }));
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
                          <p className="mt-3 text-base text-gray-800 dark:text-gray-200">{kp.description}</p>
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
            <div className="space-y-12">
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
                        <ul className="list-disc list-outside pl-6 grid grid-rows-[1fr_1fr_1fr] gap-3 h-full">
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
                        <ul className="list-disc list-outside pl-6 grid grid-rows-[1fr_1fr_1fr] gap-3 h-full">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* One platform from first call to wire transfer */}
                  <FadeIn delay={0.3}>
                    <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full ${solutionsExpanded ? 'min-h-[280px]' : 'min-h-[140px]'} flex flex-col`}>
                      <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                        One platform from first call to wire transfer
                      </h4>
                      {solutionsExpanded && (
                        <div className="flex-1 flex flex-col justify-center">
                          <ul className="list-disc list-outside pl-6 text-black dark:text-white grid grid-rows-[1fr_1fr_1fr] gap-3 h-full">
                            <li><b>Borrowers:</b> Build your profile once, use forever. <b>No redundant data entry</b> — just update deal specifics. Track all lender interest in real-time.</li>
                            <li><b>Lenders:</b> <b>Standardized deal packages</b> for instant comparison. Chat with borrowers, request docs, and close deals all in one place.</li>
                            <li><b>Advisors:</b> Manage <b>unlimited deals simultaneously</b> with our workflow automation. One dashboard for all borrowers, lenders, and documents.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </FadeIn>

                  {/* 30-second OMs with live updates */}
                  <FadeIn delay={0.35}>
                    <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full ${solutionsExpanded ? 'min-h-[280px]' : 'min-h-[140px]'} flex flex-col`}>
                      <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                        30-second OMs with live updates
                      </h4>
                      {solutionsExpanded && (
                        <div className="flex-1 flex flex-col justify-center">
                          <ul className="list-disc list-outside pl-6 text-black dark:text-white grid grid-rows-[1fr_1fr_1fr] gap-3 h-full">
                            <li><b>Borrowers:</b> Drag and drop any documents — our AI extracts, organizes, and creates your OM in <b>30 seconds, not 3 weeks</b>.</li>
                            <li><b>Lenders:</b> See <b>live, dynamic OMs</b> that update in real-time. Ask our AI questions about any deal and get instant answers with sources.</li>
                            <li><b>Advisors:</b> <b>Save 160 hours per deal</b>. No more manual package creation. Focus on relationships while AI handles documentation.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </FadeIn>

                  {/* AI predicts perfect matches */}
                  <FadeIn delay={0.4}>
                    <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full ${solutionsExpanded ? 'min-h-[280px]' : 'min-h-[140px]'} flex flex-col`}>
                      <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                        AI predicts perfect matches
                      </h4>
                      {solutionsExpanded && (
                        <div className="flex-1 flex flex-col justify-center">
                          <ul className="list-disc list-outside pl-6 text-black dark:text-white grid grid-rows-[1fr_1fr_1fr] gap-3 h-full">
                            <li><b>Borrowers:</b> <b>75% higher success rate</b> — our AI knows exactly which lenders want your deal based on similar successful transactions.</li>
                            <li><b>Lenders:</b> <b>10x more qualified deals</b> with our white-glove curation service. Only see deals that match your investment thesis.</li>
                            <li><b>Advisors:</b> <b>Close deals 3x faster</b> with AI-powered matching. Higher success rates mean better reputation and more referrals.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </FadeIn>

                  {/* Customer Lifetime Value */}
                  <FadeIn delay={0.45}>
                    <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full ${solutionsExpanded ? 'min-h-[280px]' : 'min-h-[140px]'} flex flex-col`}>
                      <h4 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400 mb-4 text-center min-h-[5.5rem] md:min-h-[5.5rem] flex items-center justify-center">
                        Customer Life Time Value
                      </h4>
                      {solutionsExpanded && (
                        <div className="flex-1 flex flex-col justify-center">
                          <ul className="list-disc list-outside pl-6 text-black dark:text-white grid grid-rows-[1fr_1fr_1fr] gap-3 h-full">
                            <li><b>Customer lock-in:</b> Profiles, docs, and lender threads stay on‑platform, compounding value over time.</li>
                            <li><b>Takeout financing:</b> One‑click move from bridge/construction to perm with reusable data and auto‑packages.</li>
                            <li><b>Refinancing — RefiRadar:</b> Always‑on monitoring triggers the best refi moment and starts the workflow.</li>
                            </ul>
                          </div>
                        )}
                    </div>
                  </FadeIn>
                </div>

                {/* Consolidated expand/collapse button */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setSolutionsExpanded(prev => !prev)}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-md"
                    aria-expanded={solutionsExpanded}
                  >
                    {solutionsExpanded ? 'Hide details' : 'Show details'}
                  </button>
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
          </SectionCard>
        </div>
      </section>

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 text-left items-stretch">
              <FadeIn>
                <div className="glass-card rounded-2xl p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 h-full">
                  <h3 className="text-2xl font-semibold text-amber-700 dark:text-amber-300 mb-4">Use of Funds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {optimizedInvestmentAsk.useOfFunds.map((u, i) => (
                      <div key={i} className="rounded-xl bg-white/70 dark:bg-gray-900/40 border border-amber-200/60 dark:border-amber-800/40 px-5 py-4 md:px-6 md:py-6 min-h-28 md:min-h-32 flex items-center justify-center text-center text-black dark:text-white text-base md:text-lg leading-relaxed">
                        <span className="font-semibold">{u.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="glass-card rounded-2xl p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 h-full">
                  <h3 className="text-2xl font-semibold text-amber-700 dark:text-amber-300 mb-4">Why Now</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {optimizedInvestmentAsk.whyNow.map((w, i) => (
                      <div key={i} className="flex items-start gap-3 text-black dark:text-white py-2 leading-relaxed">
                        <span className="mt-2 w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 flex-shrink-0"></span>
                        <span dangerouslySetInnerHTML={{ __html: w }} />
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