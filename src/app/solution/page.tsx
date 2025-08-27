'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const solutionCards: Omit<CardData, 'slug'>[] = [
  {
    title: "We bring the Deal Flow",
    role: "Access nationwide deal flow from established leaders, dealer networks, and state-of-the-art outbound marketing.",
    content: [
      "<b>Borrowers:</b> Present deals to the largest lender network, regardless of your broker connections.",
      "<b>Lenders:</b> Receive high-quality, third-party vetted deals tailored to your preferences.",
      "<b>Advisors:</b> Activate 120K brokers to place debt deals with centralized leads and deal flow.",
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "CapMatch Platform",
    role: "One centralized platform for the entire journey from idea to wire transfer.",
    content: [
      "<b>Borrowers:</b> Manage multiple projects efficiently, eliminate redundant data entry, and enjoy a streamlined, win-win funding process.",
      "<b>Lenders:</b> Access diversified deal flow in a standardized format for quick evaluation. Interact with borrowers and advisors on the same platform, with integrated third-party verification.",
      "<b>Advisors:</b> Benefit from a single source for data and conversations, simplifying management of multiple borrowers and lenders with one unified process for all deals.",
    ],
    imageUrl: "/OnePlatformImg.png",
    imageAlt: "One Platform for Everything",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
  {
    title: "AI-Powered Deal Documentation",
    role: "Generate OMs and Due Diligence vaults in 30 seconds, with live updates and version control.",
    content: [
      "<b>Borrowers:</b> Drag and drop information for Borrower and Project Resumes just once, with live updates for changing variables and a dynamic OM on your dashboard (no static PDFs).",
      "<b>Lenders:</b> Always access the latest information, compare deals side-by-side, and get live AI insights directly from the OM.",
      "<b>Advisors:</b> Use a single repository for all communication and documentation, with a consistent workflow that converts deals in days, not months.",
    ],
    videoUrl: "https://drive.google.com/file/d/1iS4vGiqMrPHtEb1y7MiJmP04ixaAHCZq/view?usp=400",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-400",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
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
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
    dotColor: "bg-emerald-700 dark:bg-emerald-400"
  },
];

export default function SolutionPage() {
  return (
    <InteractiveCardPage
      pageTitle="Our Solution"
      byline={`"We're basically 'Uber'-izing Commercial Real Estate"`}
      cards={solutionCards.map(card => ({...card, slug: ''}))}
    />
  );
} 