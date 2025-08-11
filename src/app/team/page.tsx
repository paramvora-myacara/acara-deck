'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";
import Link from "next/link";

const teamMembers: Omit<CardData, 'slug'>[] = [
  {
    title: "Dr. Jeff Richmond",
    role: "Co-Founder & CEO",
    content: [
      "Drove $2B+ in annual transaction volume through strategic business development and growth leadership at eXp Realty.",
      "Co-founder of CapMatch and OZ Listings, delivering AI-powered capital markets solutions for multifamily and Opportunity Zone investments.",
      "Chief Operating Partner at ACARA Management, a private equity firm focused on OZ development and capital structuring."
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "Todd Vitzthum",
    role: "Co-Founder & Executive Chairman",
    content: [
      "Executed over $3B in commercial real estate transactions across a 20+ year career, with senior leadership roles at Greystone, Cushman & Wakefield, and CBRE.",
      "As Managing Partner at ACARA Management, he leads multifamily investment strategy and oversees Opportunity Zone deployment across the firm's portfolio.",
      "Co-founder of CapMatch and OZ Listings, he drives the creation of tech-enabled capital platforms and national real estate marketplaces."
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "Michael Krueger",
    role: "Chief Legal Officer",
    content: [
      "Corporate & Securities Partner at Lucosky Brookman LLP, advising family offices, private equity funds, and high-net-worth clients on real estate, finance, and corporate structuring.",
      "Nationally recognized OZ expert and \"California Trailblazer,\" with deep experience in QOF/QOZB formation, SEC compliance, and complex capital stack negotiations.",
      "As Chief Legal Officer at ACARA Management, he leads legal strategy for fund deployment, regulatory alignment, and Opportunity Zone execution."
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "Param Vora",
    role: "Chief Technology Officer",
    content: [
      "Former CTO of Solarcheckr, where he drove a 650% increase in financing approvals and led the company through a successful acquisition.",
      "Built advanced AI copilots and automation pipelines as Director of AI at The Cool Down, which grew to over 60 million monthly visits and became the fastest-growing U.S. media brand in early 2025.",
      "With 7+ years in machine learning and a master's in AI, he leads CapMatch's technology vision across underwriting, automation, and investor intelligence."
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
];

export default function TeamPage() {
  const teamInfoComponent = (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 hover:shadow-lg dark:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fadeIn group relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/[0.02] dark:to-white/[0.01] pointer-events-none" />
        
        <p className="text-lg leading-relaxed font-light italic text-emerald-600 dark:text-emerald-300 text-center mb-6">
          Current Team size:  10
        </p>

        <div className="flex justify-center">
          <p className="text-lg leading-relaxed font-light text-emerald-700 dark:text-emerald-400 text-center">
            Roles filled: Chief Market Advisor, Head of Growth, Head of Communications, VP Communications, VP Engineering, Head of Investor Relations
          </p>
        </div>
      </div>
    </div>
  );

  const cards = teamMembers.map(member => ({ ...member, slug: member.title.toLowerCase().replace(/\s+/g, '-') }));

  return (
    <InteractiveCardPage
      pageTitle="Leadership Team"
      byline="$6B+ in combined transaction volume and 20+ years of expertise in real estate, lending, and technology."
      cards={cards}
      showRoleAsByline={true}
    >
      {teamInfoComponent}
    </InteractiveCardPage>
  );
} 