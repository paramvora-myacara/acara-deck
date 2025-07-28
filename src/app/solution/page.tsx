'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const solutionCards: Omit<CardData, 'slug'>[] = [
  {
    title: "Smart Matching",
    content: [
      "AI learns what lenders like",
      "Matches developers to right lenders",
      "Gets smarter over time",
    ],
    videoUrl: "/AcaraDemo720p.mp4",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
  {
    title: "30-Second Deal Docs",
    content: [
      "Drag and drop any documents",
      "AI builds your OM instantly",
      "Always up-to-date",
      "Ask questions, get answers",
    ],
    videoUrl: "/OMDemoAcaraDeck720p.mp4",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
  {
    title: "One Platform for Everything",
    content: [
      "Developers raise capital",
      "Lenders find deals",
      "Everyone wins",
    ],
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
  {
    title: "Full-Service Support",
    content: [
      "Expert broker team",
      "Wide lender network",
      "White-glove service",
    ],
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
];

export default function SolutionPage() {
  return (
    <InteractiveCardPage
      pageTitle="Our Solution"
      cards={solutionCards.map(card => ({...card, slug: ''}))}
    />
  );
} 