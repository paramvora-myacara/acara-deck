'use client';

import InteractiveCardPage, { CardData } from "@/components/InteractiveCardPage";

const solutionCards: Omit<CardData, 'slug'>[] = [
  {
    title: "We bring the Deal Flow",
    role: "Access nationwide deal flow from established leaders, dealer networks, and state-of-the-art outbound marketing.",
    content: [
      "Borrowers: Present deals to the largest lender network, regardless of your broker connections.",
      "Lenders: Receive high-quality, third-party vetted deals tailored to your preferences.",
      "Advisors: Activate 120K brokers to place debt deals with centralized leads and deal flow.",
    ],
    videoUrl: "/AcaraDemo720p.mp4",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
  {
    title: "CapMatch Platform",
    role: "One centralized platform for the entire journey from idea to wire transfer.",
    content: [
      "Borrowers: Manage multiple projects efficiently, eliminate redundant data entry, and enjoy a streamlined, win-win funding process.",
      "Lenders: Access diversified deal flow in a standardized format for quick evaluation. Interact with borrowers and advisors on the same platform, with integrated third-party verification.",
      "Advisors: Benefit from a single source for data and conversations, simplifying management of multiple borrowers and lenders with one unified process for all deals.",
    ],
    imageUrl: "/OnePlatformImg.png",
    imageAlt: "One Platform for Everything",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
  {
    title: "AI-Powered Deal Documentation",
    role: "Generate OMs and Due Diligence vaults in 30 seconds, with live updates and version control.",
    content: [
      "Borrowers: Drag and drop information for Borrower and Project Resumes just once, with live updates for changing variables and a dynamic OM on your dashboard (no static PDFs).",
      "Lenders: Always access the latest information, compare deals side-by-side, and get live AI insights directly from the OM.",
      "Advisors: Use a single repository for all communication and documentation, with a consistent workflow that converts deals in days, not months.",
    ],
    videoUrl: "/OMDemoAcaraDeck720p.mp4",
    gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
    textColor: "text-indigo-900 dark:text-indigo-300",
    accentColor: "text-indigo-700 dark:text-indigo-400",
    dotColor: "bg-indigo-700 dark:bg-indigo-400"
  },
  {
    title: "Matchmaking",
    role: "Leverage AI for precise, curated matchmaking between lenders and borrowers.",
    content: [
      "Borrowers: Get enhanced resume curation, visibility into available lenders, and higher success rates in securing loans.",
      "Lenders: Discover only relevant matches through our subscription white-glove service, enabling faster capital deployment.",
      "Advisors: Match with superior deals for higher conversions and better commission cuts from lenders.",
    ],
    videoUrl: "/AcaraDemo720p.mp4",
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
      byline={`"We're basically 'Uber'-izing Commercial Real Estate"`}
      cards={solutionCards.map(card => ({...card, slug: ''}))}
    />
  );
} 