'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const problemCards: Omit<CardData, 'slug'>[] = [
  {
    title: "Finding Each Other is Hard",
    content: [
      "Developers can't find the right lenders",
      "Lenders can't find good projects",
      "Everyone wastes time searching",
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
  {
    title: "Creating Deal Docs Takes Forever",
    content: [
      "Making an OM (deal pitch) takes weeks",
      "Info scattered across emails, spreadsheets, PDFs",
      "When anything changes, start over",
      "No version control = confusion",
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
  {
    title: "120,000 Brokers Not Placing Debt",
    content: [
      "Licensed to do it, but don't",
      "No platform exists for them",
      "Huge untapped potential",
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
  {
    title: "Developers Struggle to Market",
    content: [
      "Not good at reaching investors",
      "No standard format to compare deals",
      "Money left on the table",
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
];

export default function ProblemPage() {
  return (
    <InteractiveCardPage
      pageTitle="The Problem"
      cards={problemCards.map(card => ({...card, slug: ''}))}
    />
  );
} 