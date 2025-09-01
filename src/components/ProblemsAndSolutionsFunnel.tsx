'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import FunnelBackground from "@/components/FunnelBackground";

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
    title: "Borrowers feel invisible",
    content: [
      "Borrowers miss deals because finding the right lenders is tough—up to 50% of opportunities lost to poor matching.",
      "Access is limited to brokers' personal networks, excluding broader options.",
      "Without insight into lender preferences, borrowers can't market effectively or present their strongest case."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Industry is fragmented",
    content: [
      "Advisors build deal flow from scratch amid no centralized lead generation — with ~120,000 U.S. brokers unable to place debt efficiently, underscoring this core inefficiency.",
      "No shared platform or standards means silos and reinvented workflows for every client.",
      "One-on-one relationships demand high commission splits (often 60%+), creating an unscalable model."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Lending is slow",
    content: [
      "Deal info is scattered across platforms and formats like PDFs, spreadsheets, and images, slowing everything down.",
      "Assembling a full deck demands weeks of analyst time—often 2-4 weeks per deal.",
      "Updates force complete rewrites, with no version control causing confusion and wasted hours."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Lenders cannot choose",
    content: [
      "Lenders get deals only from limited partners, not the open market, keeping preferences hidden from the industry.",
      "Without standardization, comparing deals is impossible due to inconsistent documentation.",
      "No central platform drags down due diligence, verifications, and projections amid outdated tech and poor version control."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
];

// Solution cards data
const solutionCards: SolutionCard[] = [
  {
    title: "We bring deal flow",
    role: "Access nationwide deal flow from established leaders, dealer networks, and state-of-the-art outbound marketing.",
    content: [
      "<b>Borrowers:</b> Present deals to the largest lender network, regardless of your broker connections.",
      "<b>Lenders:</b> Receive high-quality, third-party vetted deals tailored to your preferences.",
      "<b>Advisors:</b> Activate 120K brokers to place debt deals with centralized leads and deal flow.",
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "Unified platform",
    role: "One centralized platform for the entire journey from idea to wire transfer.",
    content: [
      "<b>Borrowers:</b> Manage multiple projects efficiently, eliminate redundant data entry, and enjoy a streamlined, win-win funding process.",
      "<b>Lenders:</b> Access diversified deal flow in a standardized format for quick evaluation. Interact with borrowers and advisors on the same platform, with integrated third-party verification.",
      "<b>Advisors:</b> Benefit from a single source for data and conversations, simplifying management of multiple borrowers and lenders with one unified process for all deals.",
    ],
    videoUrl: "https://drive.google.com/file/d/1_Y5xZF_ZG9hDC4-G6PHrfXOOGatv2sR4/preview",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "AI makes it fast",
    role: "Generate OMs and Due Diligence vaults in 30 seconds, with live updates and version control.",
    content: [
      "<b>Borrowers:</b> Drag and drop information for Borrower and Project Resumes just once, with live updates for changing variables and a dynamic OM on your dashboard (no static PDFs).",
      "<b>Lenders:</b> Always access the latest information, compare deals side-by-side, and get live AI insights directly from the OM.",
      "<b>Advisors:</b> Use a single repository for all communication and documentation, with a consistent workflow that converts deals in days, not months.",
    ],
    videoUrl: "https://drive.google.com/file/d/1iS4vGiqMrPHtEb1y7MiJmP04ixaAHCZq/preview",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "Matchmaking",
    role: "Leverage AI for precise, curated matchmaking between lenders and borrowers.",
    content: [
      "<b>Borrowers:</b> Get enhanced resume curation, visibility into available lenders, and higher success rates in securing loans.",
      "<b>Lenders:</b> Discover only relevant matches through our subscription white-glove service, enabling faster capital deployment.",
      "<b>Advisors:</b> Match with superior deals for higher conversions and better commission cuts from lenders.",
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
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
        <div className="absolute left-[2%] top-[15%] w-[42%] space-y-4 md:space-y-5 lg:space-y-6">
          {problemCards.map((card, idx) => {
            const cardWidths = [98, 92, 86, 80];
            const cardWidth = cardWidths[idx] || 80;
            
            return (
              <motion.div
                key={idx}
                onClick={() => onCardSelect('problem', idx)}
                className={`relative glass-card rounded-xl p-4 md:p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-24 md:h-28 lg:h-32 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
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
                <h3 className={`text-base md:text-lg lg:text-xl font-semibold ${card.textColor} text-center leading-tight px-2`}>
                  {card.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* Solution Cards (Right Side) */}
        <div className="absolute right-[2%] top-[15%] w-[42%] space-y-4 md:space-y-5 lg:space-y-6">
          {solutionCards.map((card, idx) => {
            const cardWidths = [98, 92, 86, 80];
            const cardWidth = cardWidths[idx] || 80;
            
            return (
              <motion.div
                key={idx}
                onClick={() => onCardSelect('solution', idx)}
                className={`relative glass-card rounded-xl p-4 md:p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-24 md:h-28 lg:h-32 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
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
                <h3 className={`text-base md:text-lg lg:text-xl font-semibold ${card.textColor} text-center leading-tight px-2`}>
                  {card.title}
                </h3>
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
