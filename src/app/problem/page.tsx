'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const problemCards: Omit<CardData, 'slug'>[] = [
  {
    title: "Finding Lenders is <i>HARD</i>",
    content: [
      "Borrowers miss deals because finding the right lenders is tough—up to 50% of opportunities lost to poor matching.",
      "Access is limited to brokers' personal networks, excluding broader options.",
      "Without insight into lender preferences, borrowers can't market effectively or present their strongest case."
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
  {
    title: "Deal docs take <i>FOREVER</i> - Death by 1000 papercuts",
    content: [
      "Deal info is scattered across platforms and formats like PDFs, spreadsheets, and images, slowing everything down.",
      "Assembling a full deck demands weeks of analyst time—often 2-4 weeks per deal.",
      "Updates force complete rewrites, with no version control causing confusion and wasted hours."
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
  {
    title: "Lenders have <i>CHOICES</i> but can't <i>CHOOSE</i>",
    content: [
      "Lenders get deals only from limited partners, not the open market, keeping preferences hidden from the industry.",
      "Without standardization, comparing deals is impossible due to inconsistent documentation.",
      "No central platform drags down due diligence, verifications, and projections amid outdated tech and poor version control."
    ],
    gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
    textColor: "text-red-900 dark:text-red-300",
    accentColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-700 dark:bg-red-400"
  },
  {
    title: "Advisors operate <i>ALONE</i> & Industry is <i>FRAGMENTED</i>",
    content: [
      "Advisors build deal flow from scratch amid no centralized leads generation — with ~120,000 U.S. brokers unable to place debt efficiently, underscoring this core inefficiency.",
      "No shared platform or standards means silos and reinvented workflows for every client.",
      "One-on-one relationships demand high commission splits (often 60%+), creating an unscalable model."
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
      byline={`"CRE is not an industry - it's just a bunch of marquees on top of independent contractors".`}
      cards={problemCards.map(card => ({...card, slug: ''}))}
    />
  );
}
