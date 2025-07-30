'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";
import CompetitiveAnalysisGraph from "@/components/CompetitiveAnalysisGraph";

const marketCards: Omit<CardData, 'slug'>[] = [
    {
      title: "Massive Market",
      content: [
        "$4.8 trillion in CRE debt",
        "$957 billion needs refinancing in 2025",
        "We estimate $10 billion with a 1% fee",
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "Multiple Revenue Streams",
      content: [
        "Lender subscriptions",
        "Debt Placement fees",
        "Data and insights",
        
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "How We'll Use Funding",
      content: [
        "Finalize platform MVP and advisor onboarding",
        "Expand capital network coverage and data feeds",
        "Launch revenue-generating beta with curated deal flow",
        "Secure regulatory, compliance, and underwriting infrastructure",
        "This funding will activate the next phase of platform development, advisor onboarding, and monetization.",
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
            cards={marketCards.map(card => ({...card, slug: ''}))}
        />
    );
} 