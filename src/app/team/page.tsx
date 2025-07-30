'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const teamMembers: Omit<CardData, 'slug'>[] = [
  {
    title: "Todd Vitzthum",
    role: "Cofounder and Executive Chairman",
    content: [
      "20+ years CRE experience",
      "CBRE, Cushman & Wakefield veteran",
      "Deal-making expert",
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "Dr. Jeff Richmond",
    role: "Co-Founder & CEO",
    content: [
      "Growth strategy leader",
      "Capital markets expert",
      "Business development pro",
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
      "Securities attorney, Partner at Lucosky Brookman LLP",
      "Real estate law specialist",
      "Legal strategy advisor",
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "Param Vora",
    role: "CTO & AI Expert",
    content: [
      "AI technology expert",
      "Product management leader",
      "MS in Artificial Intelligence",
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
];

export default function TeamPage() {
  return (
    <InteractiveCardPage
      pageTitle="Our Team"
      cards={teamMembers.map(member => ({...member, slug: ''}))}
    />
  );
} 