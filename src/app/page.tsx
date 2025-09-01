'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, ExternalLink, MessageCircle } from "lucide-react";
import ContactUsModal from "@/components/ContactUsModal";
import ProblemsAndSolutionsFunnel, { problemCards, solutionCards, type ProblemCard, type SolutionCard } from "@/components/ProblemsAndSolutionsFunnel";
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

// Problem cards data for the problems section
const problemCardsForProblemsSection = [
  {
    id: 0,
    title: "Borrowers feel invisible",
    content: [
      "Borrowers miss deals because finding the right lenders is tough—up to 50% of opportunities lost to poor matching.",
      "Access is limited to brokers' personal networks, excluding broader options.",
      "Without insight into lender preferences, borrowers can't market effectively or present their strongest case."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    id: 1,
    title: "Industry is fragmented",
    content: [
      "Advisors build deal flow from scratch amid no centralized lead generation — with ~120,000 U.S. brokers unable to place debt efficiently, underscoring this core inefficiency.",
      "No shared platform or standards means silos and reinvented workflows for every client.",
      "One-on-one relationships demand high commission splits (often 60%+), creating an unscalable model."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    id: 2,
    title: "Lending is slow",
    content: [
      "Deal info is scattered across platforms and formats like PDFs, spreadsheets, and images, slowing everything down.",
      "Assembling a full deck demands weeks of analyst time—often 2-4 weeks per deal.",
      "Updates force complete rewrites, with no version control causing confusion and wasted hours."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
  {
    id: 3,
    title: "Lenders cannot choose",
    content: [
      "Lenders get deals only from limited partners, not the open market, keeping preferences hidden from the industry.",
      "Without standardization, comparing deals is impossible due to inconsistent documentation.",
      "No central platform drags down due diligence, verifications, and projections amid outdated tech and poor version control."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white"
  },
];

// Market cards data
const marketCards = [
  {
    title: "Massive Market",
    content: [
      "<b>Explosive CRE Debt Market and Refinancing Surge:</b> U.S. CRE debt stands at $4.8 trillion in mid-2025, with $957 billion urgently needing refinancing this year amid soaring rates and economic strain—unlocking massive disruption potential.",
      "<b>Fee-Based Revenue Opportunity:</b> Capturing just a fraction of the refinancing market at a 1% fee could generate up to $10 billion(TAM) in annual revenue for a scalable, tech-enabled solution.",
      "<b>Accelerating Growth (2025-2030):</b> From $4.8 trillion and $957 billion in refinancings in 2025, the market surges to $5.2 trillion by 2027 via digital adoption and access democratization; by 2028-2030, it hits $5.5-$6 trillion, empowering disruptors to seize share with AI efficiencies and rapid deals.",
    ]
  },
  {
    title: "Multiple Revenue Streams",
    content: [
      "<b>Debt Placement Fees:</b> Earn a straightforward 1% fee on the total debt placed through the platform.",
      "<b>Lender Subscriptions:</b> Charge premium service fees for white-glove, personally curated deal flow access, delivering tailored opportunities to lenders and fostering long-term, recurring income.",
      "<b>Data and Insights:</b> Monetize proprietary industry data while training an <b>AI Markets Advisor</b> to evolve into the state-of-the-art platform expert, unlocking advanced analytics and advisory services for sustained growth.",
    ]
  },
  {
    title: "How We'll Use Funding",
    content: [
      "<b>Finalize platform MVP and advisor onboarding</b>",
      "<b>Expand capital network coverage and data feeds</b>",
      "<b>Launch revenue-generating beta with curated deal flow</b>",
      "<b>Secure regulatory, compliance, and underwriting infrastructure</b>",
      "<b>This funding will activate the next phase of platform development, advisor onboarding, and monetization.</b>",
    ]
  }
];

// Team data
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

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [selectedCard, setSelectedCard] = useState<{ type: 'problem' | 'solution', index: number }>({ type: 'solution', index: 0 });
  const [selectedTeamMember, setSelectedTeamMember] = useState(0);
  const [expandedMarketCards, setExpandedMarketCards] = useState<Record<string, boolean>>({
    "Multiple Revenue Streams": true
  });

  const handleProblemSelect = (index: number) => {
    setSelectedProblem(index);
  };

  const handleCardSelect = (type: 'problem' | 'solution', index: number) => {
    setSelectedCard({ type, index });
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
            {'Uber for Commercial Real Estate Lending'}
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
            View Live Demo
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
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
                Understanding the CRE Market
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
                In Commercial Real Estate, there are 3 key players: <span className="font-semibold">Borrowers</span> who need capital, <span className="font-semibold">Lenders</span> who have capital, and <span className="font-semibold">Advisors</span> who connect them.
              </p>
            </FadeIn>
            {/* Horizontal Timeline */}
            <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12">
              <FadeIn>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <h3 className="font-semibold text-lg">Borrower Needs Capital</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">For property acquisition, refinancing, or development</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <h3 className="font-semibold text-lg">Advisor Searches</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Scours personal network for potential lenders</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
                  </div>
                  <h3 className="font-semibold text-lg">Lender Evaluates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Reviews deal based on limited information</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</span>
                  </div>
                  <h3 className="font-semibold text-lg">Deal Closes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Or doesn't - 50% fail due to poor matching</p>
                </div>
              </FadeIn>
            </div>

            <FadeIn>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Current Reality:</span> This process takes 2-4 weeks, relies on personal networks, and fails half the time. In a $4.8 trillion market, this inefficiency represents billions in lost opportunities.
                </p>
              </div>
            </FadeIn>
          </SectionCard>
        </div>
      </section>

      {/* Problems Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <SectionCard>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center mb-12">
                Why CRE Lending is Broken
              </h2>
            </FadeIn>
            
            {/* Mobile-Friendly Expandable Cards */}
            <div className="space-y-4 md:space-y-6">
              {problemCardsForProblemsSection.map((card, idx) => {
                const isExpanded = selectedProblem === idx;
                
                return (
                  <motion.div
                    key={idx}
                    className="glass-card rounded-3xl overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {/* Header - Always Visible */}
                    <button
                      onClick={() => handleProblemSelect(isExpanded ? -1 : idx)}
                      className="w-full p-6 md:p-8 text-left hover:bg-red-100/50 dark:hover:bg-red-900/10 transition-colors duration-200 flex items-center justify-between"
                    >
                      <h3 className={`text-2xl md:text-3xl font-semibold ${card.textColor} leading-tight`}>
                        {card.title}
                      </h3>
                      <ChevronDown 
                        className={`w-6 h-6 md:w-7 md:h-7 ${card.textColor} transition-transform duration-200 flex-shrink-0 ml-4 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0 
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-red-200 dark:border-red-800/30">
                        <ul className="list-disc list-outside space-y-3 md:space-y-4 pl-6 pt-6">
                          {card.content.map((item, itemIdx) => (
                            <motion.li 
                              key={itemIdx} 
                              className={`text-base md:text-lg font-light ${card.accentColor} leading-relaxed`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                              transition={{ delay: itemIdx * 0.1 + 0.1 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Call to Action */}
            <FadeIn delay={0.4}>
              <div className="mt-12 text-center">
                <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 font-light">
                  These problems cost the industry <span className="font-bold text-red-600 dark:text-red-400">billions</span> annually
                </p>
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
                How CapMatch Fixes Everything
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
              {/* Left 40% - Complete Funnel using the component */}
              <FadeIn className="lg:col-span-2 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)]">
                <div className="glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full">
                  <ProblemsAndSolutionsFunnel 
                    onCardSelect={handleCardSelect}
                    selectedCard={selectedCard}
                  />
                </div>
              </FadeIn>

              {/* Right 40% - Content Display */}
              <FadeIn className="lg:col-span-3 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)]">
                <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full">
                  {selectedCard.type === 'problem' ? (
                    <>
                      <h3 className={`text-2xl md:text-3xl font-semibold ${problemCards[selectedCard.index].textColor} mb-4 md:mb-6 text-center`}>
                        {problemCards[selectedCard.index].title}
                      </h3>
                      <ul className="list-disc list-outside space-y-3 md:space-y-4 pl-6">
                        {problemCards[selectedCard.index].content.map((item, itemIdx) => (
                          <li key={itemIdx} className={`text-base md:text-lg font-light ${problemCards[selectedCard.index].accentColor}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h3 className={`text-2xl md:text-3xl font-semibold ${solutionCards[selectedCard.index].textColor} mb-4 md:mb-6 text-center`}>
                        {solutionCards[selectedCard.index].title}
                      </h3>
                      {solutionCards[selectedCard.index].role && (
                        <p className={`text-lg md:text-xl font-medium ${solutionCards[selectedCard.index].accentColor} mb-4 md:mb-6 text-center`}>
                          {solutionCards[selectedCard.index].role}
                        </p>
                      )}
                      <ul className="list-disc list-outside space-y-3 md:space-y-4 pl-6 mb-4 md:mb-6">
                        {solutionCards[selectedCard.index].content.map((item, itemIdx) => (
                          <li key={itemIdx} className={`text-base md:text-lg font-light ${solutionCards[selectedCard.index].accentColor}`} 
                              dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                      {solutionCards[selectedCard.index].videoUrl && (
                        <div className="mt-4 md:mt-6">
                          <DriveVideo previewUrl={solutionCards[selectedCard.index].videoUrl!} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Market Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <SectionCard>
            <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
              The $10B Market Opportunity
            </h2>
            <div className="space-y-8">
              {/* First 3 cards stacked vertically */}
              {marketCards.slice(0, 3).map((card, idx) => {
                const isExpandable = card.title === "Massive Market" || card.title === "How We'll Use Funding" || card.title === "Multiple Revenue Streams";
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
                            {card.content.map((item, itemIdx) => (
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
                  We Own the Best Spot
                </h3>
                <CompetitiveAnalysisGraph />
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
                Join Our Mission
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
                We're raising <span className="font-bold">$3.5 million</span> as a pre-seed round to revolutionize how the CRE markets work.
              </p>
            </FadeIn>
            <FadeIn>
              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-2xl mx-auto">
                <p className="text-lg text-amber-600 dark:text-amber-300 mb-6">
                  This funding will activate the next phase of platform development, advisor onboarding, and monetization.
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