'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const teamMembers: Omit<CardData, 'slug'>[] = [
  {
    title: "Jeff Richmond, PhD",
    role: "Co-Founder & CEO",
    content: [
      "Dr. Jeff Richmond scaled real estate operations at eXp Realty from 2016, co-founding \"The Community\" to train over 10,000 brokers globally.",
      "He built a high-performing team generating $1M+ in GCI, selling 162 homes in his third year.",
      "As co-founder of OZlistings, he drives innovation in Opportunity Zone marketplaces alongside Todd Vitzthum"
    ],
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "Todd Vitzthum",
    role: "Co-Founder & Executive",
    content: [
      "Todd executed $3B+ in commercial real estate transactions over 20+ years as Executive Vice President at Greystone, Executive Managing Director at Cushman & Wakefield, and Senior Vice President at CBRE.",
      "As President of ACARA, he leads multifamily investments and Opportunity Zone strategies.",
      "As co-founder of OZlistings with Jeff Richmond, he innovates national platforms for real estate marketplaces."
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
      "Michael specializes in securities law and real estate finance as Partner at Lucosky Brookman LLP, advising on SEC compliance and capital raising.",
      "He structured deals from $2.5M to $9M and handled 100+ bankruptcy filings.",
      "Formerly at Newmeyer Dillion, his in-house counsel experience ensures regulatory precision in lending."
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
      "Param led Solarcheckr as CTO to acquisition, speeding up financing approvals for residential solar and battery installations by 650%",
      "As Director of AI at The Cool Down - the fastest growing media company in the US, he built out State of the Art AI pipelines and copilots from scratch.",
      "With 7+ years in machine learning and AI, he has a masters degree in Machine Learning and AI."
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
      pageTitle="Leadership Team"
      byline="$6B+ in combined transaction experience and 20+ years of expertise in real estate, lending, and technology."
      cards={teamMembers.map(card => ({...card, slug: ''}))}
      showRoleAsByline={true}
    />
  );
} 