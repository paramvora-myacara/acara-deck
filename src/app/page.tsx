'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Play, ExternalLink, MessageCircle } from "lucide-react";
import ContactUsModal from "@/components/ContactUsModal";
import ProblemsAndSolutionsFunnel, { problemCards, solutionCards, type ProblemCard, type SolutionCard } from "@/components/ProblemsAndSolutionsFunnel";
import CompetitiveAnalysisGraph from "@/components/CompetitiveAnalysisGraph";

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
    accentColor: "text-red-600 dark:text-red-400"
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
    accentColor: "text-red-600 dark:text-red-400"
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
    accentColor: "text-red-600 dark:text-red-400"
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
    accentColor: "text-red-600 dark:text-red-400"
  }
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

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [selectedCard, setSelectedCard] = useState<{ type: 'problem' | 'solution', index: number }>({ type: 'solution', index: 0 });

  const handleProblemSelect = (index: number) => {
    setSelectedProblem(index);
  };

  const handleCardSelect = (type: 'problem' | 'solution', index: number) => {
    setSelectedCard({ type, index });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
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
            {'AI-Powered. Borrower-Controlled. Commercial Lending, Simplified.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://capmatch.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              View Live Demo
            </a>
            <a 
              href="https://capmatch.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Site
            </a>
          </div>
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
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
            Understanding the CRE Market
          </h2>
          <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
            In Commercial Real Estate, there are 3 key players: <span className="font-semibold">Borrowers</span> who need capital, <span className="font-semibold">Lenders</span> who have capital, and <span className="font-semibold">Advisors</span> who connect them.
          </p>
          
          {/* Horizontal Timeline */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-lg">Borrower Needs Capital</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">For property acquisition, refinancing, or development</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-lg">Advisor Searches</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Scours personal network for potential lenders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-lg">Lender Evaluates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Reviews deal based on limited information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</span>
              </div>
              <h3 className="font-semibold text-lg">Deal Closes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Or doesn't - 50% fail due to poor matching</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Current Reality:</span> This process takes 2-4 weeks, relies on personal networks, and fails half the time. In a $4.8 trillion market, this inefficiency represents billions in lost opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center mb-12">
            Why CRE Lending is Broken
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left 40% - Problem Funnel */}
            <div className="lg:col-span-2 space-y-4">
              {problemCardsForProblemsSection.map((card, idx) => {
                const cardWidths = [90, 80, 70, 60];
                const cardWidth = cardWidths[idx] || 60;
                
                return (
                  <motion.div
                    key={idx}
                    onClick={() => handleProblemSelect(idx)}
                    className={`relative glass-card rounded-xl p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[130px] lg:h-[150px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
                      selectedProblem === idx ? 'ring-4 ring-red-400 dark:ring-red-500' : ''
                    }`}
                    style={{
                      marginLeft: `${100 - cardWidth}%`,
                      width: `${cardWidth}%`,
                    }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <h3 className={`text-xl lg:text-2xl xl:text-3xl font-semibold ${card.textColor} text-center leading-tight`}>
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>

            {/* Right 40% - Content Display */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full">
                <h3 className={`text-3xl font-semibold ${problemCardsForProblemsSection[selectedProblem].textColor} mb-6 text-center`}>
                  {problemCardsForProblemsSection[selectedProblem].title}
                </h3>
                <ul className="list-disc list-outside space-y-4 pl-6">
                  {problemCardsForProblemsSection[selectedProblem].content.map((item, itemIdx) => (
                    <li key={itemIdx} className={`text-lg font-light ${problemCardsForProblemsSection[selectedProblem].accentColor}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center mb-8 md:mb-12">
            How CapMatch Fixes Everything
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Left 40% - Complete Funnel using the component */}
            <div className="lg:col-span-2 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)]">
              <div className="glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full">
                <ProblemsAndSolutionsFunnel 
                  onCardSelect={handleCardSelect}
                  selectedCard={selectedCard}
                />
              </div>
            </div>

            {/* Right 40% - Content Display */}
            <div className="lg:col-span-3 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)]">
              <div className={`glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br ${
                selectedCard.type === 'problem' 
                  ? 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20' 
                  : 'from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20'
              } border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-full`}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
            The $10B Opportunity
          </h2>
          
          <div className="space-y-8">
            {/* First 3 cards stacked vertically */}
            {marketCards.slice(0, 3).map((card, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-3xl p-10 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-semibold text-purple-900 dark:text-purple-300 mb-8">
                  {card.title}
                </h3>
                <ul className="list-disc list-outside space-y-5 pl-8 text-left">
                  {card.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-xl text-purple-700 dark:text-purple-400 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </motion.div>
            ))}
            
            {/* 4th card with competitive analysis graph */}
            <motion.div
              className="glass-card rounded-3xl p-10 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-semibold text-purple-900 dark:text-purple-300 mb-8">
                We Own the Best Spot
              </h3>
              <CompetitiveAnalysisGraph />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
            The Team to Execute
          </h2>
          <p className="text-xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
            $6B+ in combined transaction volume and 20+ years of expertise in real estate, lending, and technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-3xl p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-700 dark:text-indigo-400 mb-4 font-medium">
                  {member.role}
                </p>
                <ul className="list-disc list-outside space-y-2 pl-6 text-sm text-indigo-700 dark:text-indigo-400">
                  {member.content.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 max-w-2xl mx-auto">
            <p className="text-lg text-indigo-700 dark:text-indigo-400 mb-4">
              <span className="font-semibold">Current Team Size:</span> 10
            </p>
            <p className="text-lg text-indigo-700 dark:text-indigo-400">
              <span className="font-semibold">Roles Filled:</span> Chief Market Advisor, Head of Growth, Head of Communications, VP Communications, VP Engineering, Head of Investor Relations
            </p>
          </div>
        </div>
      </section>

      {/* Investment Ask Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-8">
            Join Our Mission
          </h2>
          <p className="text-xl text-black/70 dark:text-white/70 mb-12 max-w-4xl mx-auto">
            We're raising $2 million as a pre-seed round to revolutionize how the CRE markets work.
          </p>
          
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
        </div>
      </section>

      <ContactUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
} 