'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";
import CompetitiveAnalysisGraph from "@/components/CompetitiveAnalysisGraph";

const marketCards: Omit<CardData, 'slug'>[] = [
    {
      title: "Massive Market",
      content: [
        "<b>Explosive CRE Debt Market and Refinancing Surge:</b> U.S. CRE debt stands at $4.8 trillion in mid-2025, with $957 billion urgently needing refinancing this year amid soaring rates and economic strain-unlocking massive disruption potential.",
        "<b>Fee-Based Revenue Opportunity:</b> Capturing just a fraction of the refinancing market at a 1% fee could generate up to $10 billion(TAM) in annual revenue for a scalable, tech-enabled solution.",
        "<b>Accelerating Growth (2025-2030):</b> From $4.8 trillion and $957 billion in refinancings in 2025, the market surges to $5.2 trillion by 2027 via digital adoption and access democratization; by 2028-2030, it hits $5.5-$6 trillion, empowering disruptors to seize share with AI efficiencies and rapid deals.",
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "Multiple Revenue Streams",
      content: [
        "<b>Debt Placement Fees:</b> Earn a straightforward 1% fee on the total debt placed through the platform.",
        "<b>Lender Subscriptions:</b> Charge premium service fees for white-glove, personally curated deal flow access, delivering tailored opportunities to lenders and fostering long-term, recurring income.",
        "<b>Data and Insights:</b> Monetize proprietary industry data while training an <b>AI Markets Advisor</b> to evolve into the state-of-the-art platform expert, unlocking advanced analytics and advisory services for sustained growth.",
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "How We'll Use Funding",
      content: [
        "<b>Finalize platform MVP and advisor onboarding</b>",
        "<b>Expand capital network coverage and data feeds</b>",
        "<b>Launch revenue-generating beta with curated deal flow</b>",
        "<b>Secure regulatory, compliance, and underwriting infrastructure</b>",
        "<b>This funding will activate the next phase of platform development, advisor onboarding, and monetization.</b>",
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "We Own the Best Spot",
      content: [],
      customComponent: <CompetitiveAnalysisGraph />,
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
];

export default function MarketPage() {
    return (
        <InteractiveCardPage
            pageTitle="Market Opportunity"
            byline={`"Disrupt CRE Debt: $10B Goldmine Awaits!"`}
            cards={marketCards.map(card => ({...card, slug: ''}))}
        />
    );
} 