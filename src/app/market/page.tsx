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
        "Deal closing fees",
        "Data and insights",
        "White-label partnerships",
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "How We'll Use Funding",
      content: [
        "Product development: 40%",
        "Team growth: 35%",
        "Marketing: 25%",
      ],
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400",
      dotColor: "bg-purple-700 dark:bg-purple-400"
    },
    {
      title: "We Own the Best Spot",
      content: [
        "Most competitors do one thing:",
        "LoopNet, RCM1: Old marketplaces (manual work)",
        "VTS, Buildout: Single tools (no AI)",
        "Cherre, Bryckel: Smart data (narrow focus)",
        "ACARA CAP sits alone in the top-right:",
      ],
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