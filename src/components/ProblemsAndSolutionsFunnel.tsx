'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import FunnelBackground from "@/components/FunnelBackground";

// Helper to bold key metrics and requested keywords in short strings
function boldMetrics(text: string): string {
  let result = text
    // $ amounts like $50M, $957B, $1,000,000
    .replace(/\$\s?\d{1,3}(?:[,\d]{0,3})*(?:\.\d+)?\s?(?:B|M|K)?/g, match => `<b>${match}</b>`)
    // Numbers with B/M/K suffix like 957B, 50M
    .replace(/\b\d+(?:\.\d+)?\s?(?:B|M|K)\b/g, match => `<b>${match}</b>`)
    // Percentages like 99%, 60%
    .replace(/\b\d+(?:\.\d+)?%\b/g, match => `<b>${match}</b>`)
    // Large comma-separated numbers like 120,000 or 3,000+
    .replace(/\b\d{1,3}(?:,\d{3})+(?:\+)?\b/g, match => `<b>${match}</b>`)
    // Simple ranges like 2-4 or 6-8
    .replace(/\b\d+\s?-\s?\d+\b/g, match => `<b>${match}</b>`);

  const keywords = [
    // Problem-side emphasis
    'invisible',
    "can't place debt", 'cant place debt',
    'weeks',
    "can't find deals", 'cant find deals',
    // Solution-side emphasis
    'lender', 'sees', 'deal', 'instantly',
    'platform', 'first call', 'wire transfer',
    '30-second oms', '30 second oms', 'perfect matches'
  ];

  for (const raw of keywords) {
    const pattern = new RegExp(`(\\b${raw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b)`, 'gi');
    result = result.replace(pattern, '<b>$1</b>');
  }

  return result;
}

// Problem cards data
interface ProblemCard {
  title: string;
  content: string[];
  gradient: string;
  textColor: string;
  accentColor: string;
  dotColor: string;
}

interface SolutionCard {
  title: string;
  content: string[];
  role?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  gradient: string;
  textColor: string;
  accentColor: string;
  dotColor: string;
}

const problemCards: ProblemCard[] = [
  {
    title: "Borrowers are invisible to 99% of lenders",
    content: [
      "<b>Only 5-10 lenders see each deal</b> — brokers show deals only to their personal contacts, missing 2,990+ other active lenders who might offer better terms.",
      "<b>50% of deals fail from poor matching</b> — borrowers don't know what lenders want, so they waste time pitching to the wrong ones.",
      "<b>Leaving millions on the table</b> — a 0.25% rate difference on a $50M loan costs $125,000/year. Borrowers never know what they missed."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "120,000 brokers can't place debt efficiently",
    content: [
      "<b>Zero infrastructure for loan brokers</b> — licensed professionals with no platform, no leads, no standardized process. Each rebuilds the wheel.",
      "<b>60%+ commission to originator</b> — inefficiency means brokers keep most fees just to survive, making the model unscalable.",
      "<b>$4B in missed commissions annually</b> — brokers who could place debt don't, because the process is too complex without proper tools."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Deal documents take 6-8 weeks to create",
    content: [
      "<b>Analyst teams burn 160 hours per deal</b> — manually assembling offering memorandums from scattered PDFs, emails, and spreadsheets.",
      "<b>Every change triggers complete rewrites</b> — no version control means confusion, delays, and deals dying from stale information.",
      "<b>Static PDFs in a dynamic market</b> — by the time the OM is done, market conditions changed. Lenders see outdated info."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Lenders can't find deals they want",
    content: [
      "<b>3,000 lenders fighting for deal flow</b> — but only see deals from their limited broker network, missing 95% of the market.",
      "<b>Can't compare deals efficiently</b> — every broker sends different formats. No standardization means manual review of each deal.",
      "<b>$957B refinancing in 2025</b> — lenders have capital to deploy but can't find the right deals fast enough in this tsunami of opportunity."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
];

// Solution cards data (optimized)
const solutionCards: SolutionCard[] = [
  {
    title: "Every lender sees your deal instantly",
    role: "AI-powered marketplace connecting 30,000 borrowers with 3,000+ lenders",
    content: [
      "<b>Borrowers:</b> Your deal reaches <b>all 3,000+ active lenders</b> in seconds, not just the 5-10 your broker knows. Our AI ensures only qualified lenders see it.",
      "<b>Lenders:</b> See <b>every deal that matches your criteria</b> — geography, asset type, loan size — automatically filtered and ranked by AI.",
      "<b>Advisors:</b> Activate all <b>120,000 licensed brokers</b> as originators with instant access to our lender network and deal flow."
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "One platform from first call to wire transfer",
    role: "The first end-to-end CRE lending operating system",
    content: [
      "<b>Borrowers:</b> Build your profile once, use forever. <b>No redundant data entry</b> — just update deal specifics. Track all lender interest in real-time.",
      "<b>Lenders:</b> <b>Standardized deal packages</b> for instant comparison. Chat with borrowers, request docs, and close deals all in one place.",
      "<b>Advisors:</b> Manage <b>unlimited deals simultaneously</b> with our workflow automation. One dashboard for all borrowers, lenders, and documents."
    ],
    videoUrl: "https://drive.google.com/file/d/1_Y5xZF_ZG9hDC4-G6PHrfXOOGatv2sR4/preview",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "30-second OMs with live updates",
    role: "AI transforms scattered documents into institutional-grade packages instantly",
    content: [
      "<b>Borrowers:</b> Drag and drop any documents — our AI extracts, organizes, and creates your OM in <b>30 seconds, not 3 weeks</b>.",
      "<b>Lenders:</b> See <b>live, dynamic OMs</b> that update in real-time. Ask our AI questions about any deal and get instant answers with sources.",
      "<b>Advisors:</b> <b>Save 160 hours per deal</b>. No more manual package creation. Focus on relationships while AI handles documentation."
    ],
    videoUrl: "https://drive.google.com/file/d/1iS4vGiqMrPHtEb1y7MiJmP04ixaAHCZq/preview",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "AI predicts perfect matches",
    role: "Machine learning trained on thousands of successful deals",
    content: [
      "<b>Borrowers:</b> <b>75% higher success rate</b> — our AI knows exactly which lenders want your deal based on similar successful transactions.",
      "<b>Lenders:</b> <b>10x more qualified deals</b> with our white-glove curation service. Only see deals that match your investment thesis.",
      "<b>Advisors:</b> <b>Close deals 3x faster</b> with AI-powered matching. Higher success rates mean better reputation and more referrals."
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-black dark:text-white",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  }
];

interface ProblemsAndSolutionsFunnelProps {
  onCardSelect: (type: 'problem' | 'solution', index: number) => void;
  selectedCard: { type: 'problem' | 'solution', index: number };
}

export default function ProblemsAndSolutionsFunnel({ onCardSelect, selectedCard }: ProblemsAndSolutionsFunnelProps) {
  return (
    <div className="relative w-full h-full">
      {/* Funnel Background */}
      <div className="hidden md:block absolute inset-0 z-0">
        <FunnelBackground />
      </div>
      
      {/* Funnel Layout */}
      <div className="relative z-10 h-full">
        {/* Problem Cards (Left Side) */}
        <div className="absolute left-[2%] top-[2%] w-[42%] space-y-4 md:space-y-5 lg:space-y-6">
          {problemCards.map((card, idx) => {
            const cardWidths = [98, 92, 86, 80];
            const cardWidth = cardWidths[idx] || 80;
            
            return (
              <motion.div
                key={idx}
                onClick={() => onCardSelect('problem', idx)}
                className={`relative glass-card rounded-xl p-4 md:p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[125px] md:h-[146px] lg:h-[166px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
                  selectedCard.type === 'problem' && selectedCard.index === idx ? 'ring-4 ring-red-400 dark:ring-red-500' : ''
                }`}
                style={{
                  marginLeft: `${100 - cardWidth}%`,
                  width: `${cardWidth}%`,
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className={`text-sm md:text-base lg:text-lg font-semibold ${card.textColor} text-center leading-tight px-2`} dangerouslySetInnerHTML={{ __html: boldMetrics(card.title) }} />
              </motion.div>
            );
          })}
        </div>

        {/* Mapping Arrows */}
        <div className="absolute left-[44%] top-[2%] w-[12%] h-full hidden md:block">
          {problemCards.map((_, idx) => {
            return (
              <motion.div
                key={idx}
                className="absolute w-full"
                style={{
                  // Responsive positioning using CSS calc for proper vertical centering
                  top: `calc(${idx} * (125px + 1rem) + 62.5px)`, // Mobile: card height 125px, spacing 1rem
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: idx * 0.2 + 0.4, duration: 0.6 }}
              >
                                 {/* Mobile/Base Arrow */}
                 <div className="md:hidden">
                   <svg width="100%" height="24" viewBox="0 0 100 24" className="overflow-visible drop-shadow-sm">
                      <defs>
                        <marker
                         id={`arrowhead-base-${idx}`}
                         markerWidth="12"
                         markerHeight="10"
                         refX="10"
                         refY="5"
                         orient="auto"
                       >
                         <polygon
                           points="0 0, 12 5, 0 10"
                           fill="#4B5563"
                           className="dark:fill-gray-300"
                         />
                       </marker>
                     </defs>
                     <line
                       x1="0"
                       y1="12"
                       x2="88"
                       y2="12"
                       stroke="#4B5563"
                       strokeWidth="3"
                       markerEnd={`url(#arrowhead-base-${idx})`}
                       className="dark:stroke-gray-300"
                       style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                     />
                   </svg>
                 </div>

                 {/* Medium Screen Arrow */}
                 <div className="hidden md:block lg:hidden">
                   <svg width="100%" height="24" viewBox="0 0 100 24" className="overflow-visible drop-shadow-sm"
                        style={{
                          transform: `translateY(${(146 + 20) * idx + 73 - (125 + 16) * idx - 62.5}px)`
                        }}>
                     <defs>
                       <marker
                         id={`arrowhead-md-${idx}`}
                         markerWidth="12"
                         markerHeight="10"
                         refX="10"
                         refY="5"
                         orient="auto"
                       >
                         <polygon
                           points="0 0, 12 5, 0 10"
                           fill="#4B5563"
                           className="dark:fill-gray-300"
                         />
                       </marker>
                     </defs>
                     <line
                       x1="0"
                       y1="12"
                       x2="88"
                       y2="12"
                       stroke="#4B5563"
                       strokeWidth="3"
                       markerEnd={`url(#arrowhead-md-${idx})`}
                       className="dark:stroke-gray-300"
                       style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                     />
                   </svg>
                 </div>

                 {/* Large Screen Arrow */}
                 <div className="hidden lg:block">
                   <svg width="100%" height="24" viewBox="0 0 100 24" className="overflow-visible drop-shadow-sm"
                        style={{
                          transform: `translateY(${(166 + 24) * idx + 83 - (125 + 16) * idx - 62.5}px)`
                        }}>
                     <defs>
                       <marker
                         id={`arrowhead-lg-${idx}`}
                         markerWidth="12"
                         markerHeight="10"
                         refX="10"
                         refY="5"
                         orient="auto"
                       >
                         <polygon
                           points="0 0, 12 5, 0 10"
                           fill="#4B5563"
                           className="dark:fill-gray-300"
                         />
                       </marker>
                     </defs>
                     <line
                       x1="0"
                       y1="12"
                       x2="88"
                       y2="12"
                       stroke="#4B5563"
                       strokeWidth="3"
                       markerEnd={`url(#arrowhead-lg-${idx})`}
                       className="dark:stroke-gray-300"
                       style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
                     />
                   </svg>
                 </div>
              </motion.div>
            );
          })}
        </div>

        {/* Solution Cards (Right Side) */}
        <div className="absolute right-[2%] top-[2%] w-[42%] space-y-4 md:space-y-5 lg:space-y-6">
          {solutionCards.map((card, idx) => {
            const cardWidths = [98, 92, 86, 80];
            const cardWidth = cardWidths[idx] || 80;
            
            return (
              <motion.div
                key={idx}
                onClick={() => onCardSelect('solution', idx)}
                className={`relative glass-card rounded-xl p-4 md:p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[125px] md:h-[146px] lg:h-[166px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
                  selectedCard.type === 'solution' && selectedCard.index === idx ? 'ring-4 ring-emerald-400 dark:ring-emerald-500' : ''
                }`}
                style={{
                  marginRight: `${100 - cardWidth}%`,
                  width: `${cardWidth}%`,
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className={`text-sm md:text-base lg:text-lg font-semibold ${card.textColor} text-center leading-tight px-2`} dangerouslySetInnerHTML={{ __html: boldMetrics(card.title) }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Export the card data for use in the parent component
export { problemCards, solutionCards };
export type { ProblemCard, SolutionCard };
