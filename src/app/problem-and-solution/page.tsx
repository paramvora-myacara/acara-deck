'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import FunnelBackground from "@/components/FunnelBackground";
import { Modal } from "@/components/Modal/Modal";
import { Expand } from "lucide-react";

// Problem cards data from the problem page - using the same structure as InteractiveCardPage
interface ProblemCard {
  title: string;
  content: string[];
  gradient: string;
  textColor: string;
  accentColor: string;
  dotColor: string;
}

interface SolutionCard {
  title: string;
  content: string[];
  role?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  gradient: string;
  textColor: string;
  accentColor: string;
  dotColor: string;
}

const problemCards: ProblemCard[] = [
  {
    title: "Borrowers feel INVISIBLE",
    content: [
      "Borrowers miss deals because finding the right lenders is tough—up to 50% of opportunities lost to poor matching.",
      "Access is limited to brokers' personal networks, excluding broader options.",
      "Without insight into lender preferences, borrowers can't market effectively or present their strongest case."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Industry is FRAGMENTED",
    content: [
      "Advisors build deal flow from scratch amid no centralized lead generation — with ~120,000 U.S. brokers unable to place debt efficiently, underscoring this core inefficiency.",
      "No shared platform or standards means silos and reinvented workflows for every client.",
      "One-on-one relationships demand high commission splits (often 60%+), creating an unscalable model."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Lending is SLOW",
    content: [
      "Deal info is scattered across platforms and formats like PDFs, spreadsheets, and images, slowing everything down.",
      "Assembling a full deck demands weeks of analyst time—often 2-4 weeks per deal.",
      "Updates force complete rewrites, with no version control causing confusion and wasted hours."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
  {
    title: "Lenders CANNOT CHOOSE",
    content: [
      "Lenders get deals only from limited partners, not the open market, keeping preferences hidden from the industry.",
      "Without standardization, comparing deals is impossible due to inconsistent documentation.",
      "No central platform drags down due diligence, verifications, and projections amid outdated tech and poor version control."
    ],
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600 dark:bg-red-400"
  },
];

// Solution cards data from the solution page - using the same structure as InteractiveCardPage
const solutionCards: SolutionCard[] = [
  {
    title: "We bring DEAL FLOW",
    role: "Access nationwide deal flow from established leaders, dealer networks, and state-of-the-art outbound marketing.",
    content: [
      "<b>Borrowers:</b> Present deals to the largest lender network, regardless of your broker connections.",
      "<b>Lenders:</b> Receive high-quality, third-party vetted deals tailored to your preferences.",
      "<b>Advisors:</b> Activate 120K brokers to place debt deals with centralized leads and deal flow.",
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "UNIFIED CapMatch Platform",
    role: "One centralized platform for the entire journey from idea to wire transfer.",
    content: [
      "<b>Borrowers:</b> Manage multiple projects efficiently, eliminate redundant data entry, and enjoy a streamlined, win-win funding process.",
      "<b>Lenders:</b> Access diversified deal flow in a standardized format for quick evaluation. Interact with borrowers and advisors on the same platform, with integrated third-party verification.",
      "<b>Advisors:</b> Benefit from a single source for data and conversations, simplifying management of multiple borrowers and lenders with one unified process for all deals.",
    ],
    imageUrl: "/OnePlatformImg.png",
    imageAlt: "One Platform for Everything",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "AI makes it FAST",
    role: "Generate OMs and Due Diligence vaults in 30 seconds, with live updates and version control.",
    content: [
      "<b>Borrowers:</b> Drag and drop information for Borrower and Project Resumes just once, with live updates for changing variables and a dynamic OM on your dashboard (no static PDFs).",
      "<b>Lenders:</b> Always access the latest information, compare deals side-by-side, and get live AI insights directly from the OM.",
      "<b>Advisors:</b> Use a single repository for all communication and documentation, with a consistent workflow that converts deals in days, not months.",
    ],
    videoUrl: "https://drive.google.com/file/d/1Q9tFheLjW5pcQPmDKmM9X3cYY52pdiV2/preview",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
  {
    title: "<br/>Matchmaking<br/> <br/>",
    role: "Leverage AI for precise, curated matchmaking between lenders and borrowers.",
    content: [
      "<b>Borrowers:</b> Get enhanced resume curation, visibility into available lenders, and higher success rates in securing loans.",
      "<b>Lenders:</b> Discover only relevant matches through our subscription white-glove service, enabling faster capital deployment.",
      "<b>Advisors:</b> Match with superior deals for higher conversions and better commission cuts from lenders.",
    ],
    videoUrl: "/CapMatchDemo720p.mp4",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-600 dark:bg-emerald-400"
  },
];

// Helper function for video component
function DriveVideo({ previewUrl }: { previewUrl: string }) {
  const [useIframe, setUseIframe] = useState(false);
  const idMatch = previewUrl.match(/\/d\/([^/]+)/);
  const directUrl = idMatch ? `https://drive.google.com/uc?export=download&id=${idMatch[1]}` : null;

  if (useIframe || !directUrl) {
    return (
      <iframe
        src={previewUrl}
        className="rounded-lg w-full max-w-4xl h-80 md:h-96 border-0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Video content"
      />
    );
  }

  return (
    <video
      src={directUrl}
      controls
      playsInline
      className="rounded-lg w-full h-full object-contain"
      onError={() => setUseIframe(true)}
    />
  );
}

export default function ProblemAndSolutionPage() {
  const [selectedCard, setSelectedCard] = useState<{ type: 'problem' | 'solution', index: number } | null>(null);

  const handleCardClick = (type: 'problem' | 'solution', index: number) => {
    setSelectedCard({ type, index });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const getSelectedCardData = () => {
    if (!selectedCard) return null;
    
    if (selectedCard.type === 'problem') {
      return problemCards[selectedCard.index];
    } else {
      return solutionCards[selectedCard.index];
    }
  };

  const selectedCardData = getSelectedCardData();

  // Type guard functions
  const isSolutionCard = (card: ProblemCard | SolutionCard): card is SolutionCard => {
    return 'role' in card;
  };

  const hasImage = (card: ProblemCard | SolutionCard): card is SolutionCard & { imageUrl: string } => {
    return isSolutionCard(card) && !!card.imageUrl;
  };

  const hasVideo = (card: ProblemCard | SolutionCard): card is SolutionCard & { videoUrl: string } => {
    return isSolutionCard(card) && !!card.videoUrl;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center min-h-screen p-4 md:p-8 pt-16 pb-20">
        <header className="w-full max-w-7xl mx-auto mb-12 text-center pt-8 relative">

          
          {/* Title with ampersand on centerline */}
          <div className="flex justify-center items-center mb-4">
            {/* Desktop: Complex grid layout */}
            <div className="hidden md:grid text-4xl md:text-6xl font-bold tracking-tight grid-cols-3 gap-0 items-center max-w-fit">
              <span className="text-red-600 dark:text-red-400 text-right">Problems</span>
              <span className="text-black dark:text-white text-center px-4"> & </span>
              <span className="text-left">
                <span className="text-emerald-600 dark:text-emerald-400">Solutions</span>
              </span>
            </div>
            
            {/* Mobile: Simple centered title */}
            <div className="md:hidden text-3xl font-bold tracking-tight text-center">
              <span className="text-red-600 dark:text-red-400">Problems</span>
              <span className="text-black dark:text-white mx-2">&</span>
              <span className="text-emerald-600 dark:text-emerald-400">Solutions</span>
            </div>
          </div>
          

        </header>

                 {/* Funnel Layout */}
         <div className="w-full max-w-7xl mx-auto relative mt-6 md:mt-8" data-funnel-container>
           {/* Funnel Background - Desktop Only */}
           <div className="hidden md:block">
             <FunnelBackground />
           </div>
           
           {/* Desktop Funnel Layout */}
           <div className="relative hidden md:block z-10">
                         {/* Problem Cards (Left Side) - PERFECTLY CENTERED in funnel */}
            <div className="absolute left-[16%] top-[3%] w-[32%] space-y-4 lg:space-y-5">
              {problemCards.map((card, idx) => {
                // Calculate widths to fit within centered funnel - decreasing sizes
                const cardWidths = [90, 80, 70, 60]; // Decreasing widths for funnel effect
                const cardWidth = cardWidths[idx] || 60;
                 
                 return (
                                                                          <motion.div
                   key={idx}
                   data-problem-card
                   onClick={() => handleCardClick('problem', idx)}
                   className={`relative glass-card rounded-xl p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[130px] lg:h-[150px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                    style={{
                      marginLeft: `${100 - cardWidth}%`,
                      width: `${cardWidth}%`,
                    }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Expand className="absolute top-2 right-2 h-5 w-5 opacity-70 text-gray-400" aria-hidden />
                     <h3 
                       className={`text-xl lg:text-2xl xl:text-3xl font-semibold ${card.textColor} text-center leading-tight`}
                       dangerouslySetInnerHTML={{ __html: card.title }}
                     />
                   </motion.div>
                 );
               })}
             </div>

                         {/* Solution Cards (Right Side) - PERFECTLY CENTERED in funnel */}
            <div className="absolute right-[16%] top-[3%] w-[32%] space-y-4 lg:space-y-5">
              {solutionCards.map((card, idx) => {
                // Use same widths as problem cards for symmetry - decreasing sizes
                const cardWidths = [90, 80, 70, 60]; // Decreasing widths for funnel effect
                const cardWidth = cardWidths[idx] || 60;
                 
                 return (
                                                                          <motion.div
                   key={idx}
                   data-solution-card
                   onClick={() => handleCardClick('solution', idx)}
                   className={`relative glass-card rounded-xl p-5 lg:p-6 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[130px] lg:h-[150px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                    style={{
                      marginRight: `${100 - cardWidth}%`,
                      width: `${cardWidth}%`,
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Expand className="absolute top-2 right-2 h-5 w-5 opacity-70 text-gray-400" aria-hidden />
                                         <h3 
                      className={`text-xl lg:text-2xl xl:text-3xl font-semibold ${card.textColor} text-center leading-tight`}
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                   </motion.div>
                 );
               })}
             </div>

                         {/* Spacer to maintain layout height - scaled up for bigger funnel */}
            <div className="h-[480px] lg:h-[560px] xl:h-[640px]" />
           </div>



                     {/* Mobile Layout - Stacked Vertically */}
          <div className="block md:hidden space-y-6 relative z-10">
             {/* Problems Section */}
             <div>
               <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 text-center mb-4">Problems</h2>
               <div className="space-y-3">
                 {problemCards.map((card, idx) => (
                   <motion.div
                     key={idx}
                     onClick={() => handleCardClick('problem', idx)}
                     className={`relative glass-card rounded-xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[120px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                   >
                     <Expand className="absolute top-2 right-2 h-5 w-5 opacity-70 text-gray-400" aria-hidden />
                     <h3 
                       className={`text-2xl font-semibold ${card.textColor} text-center leading-tight`}
                       dangerouslySetInnerHTML={{ __html: card.title }}
                     />
                   </motion.div>
                 ))}
               </div>
             </div>

             {/* Arrow pointing down */}
             <div className="flex justify-center py-4">
               <div className="text-4xl text-gray-400 dark:text-gray-600">↓</div>
             </div>

             {/* Solutions Section */}
             <div>
               <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 text-center mb-4">Solutions</h2>
               <div className="space-y-3">
                 {solutionCards.map((card, idx) => (
                   <motion.div
                     key={idx}
                     onClick={() => handleCardClick('solution', idx)}
                     className={`relative glass-card rounded-xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[120px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: (problemCards.length * 0.1) + (idx * 0.1) }}
                   >
                     <Expand className="absolute top-2 right-2 h-5 w-5 opacity-70 text-gray-400" aria-hidden />
                     <h3 
                       className={`text-2xl font-semibold ${card.textColor} text-center leading-tight`}
                       dangerouslySetInnerHTML={{ __html: card.title }}
                     />
                   </motion.div>
                 ))}
               </div>
             </div>
           </div>
         </div>

         {/* Modal for displaying card content */}
         <Modal isOpen={selectedCard !== null} onClose={handleCloseModal}>
           {selectedCardData && (
             <div className={`relative glass-card rounded-3xl p-8 bg-gradient-to-br ${selectedCardData.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn h-full`}>
               <div className="flex flex-col h-full">
                 <div>
                   <h3 className="text-3xl font-semibold text-center mb-6" style={{ color: selectedCardData.textColor }} dangerouslySetInnerHTML={{ __html: selectedCardData.title }} />
                   {isSolutionCard(selectedCardData) && selectedCardData.role && (
                     <p className="text-xl font-medium text-center mb-6" style={{ color: selectedCardData.accentColor }}>{selectedCardData.role}</p>
                   )}
                   
                   <ul className="list-disc list-outside space-y-6 mb-4 pl-6">
                     {selectedCardData.content.map((item, itemIdx) => (
                         <li key={itemIdx} className="text-lg font-light" style={{ color: selectedCardData.accentColor }} dangerouslySetInnerHTML={{ __html: item }} />
                     ))}
                   </ul>
                 </div>
                 
                 {hasImage(selectedCardData) && (
                   <div className="mt-4 flex-grow relative min-h-[300px] md:min-h-[400px]">
                     <Image 
                       src={selectedCardData.imageUrl} 
                       alt={selectedCardData.imageAlt || 'Solution image'}
                       fill
                       className="rounded-lg object-contain" 
                       unoptimized
                     />
                   </div>
                 )}
                 
                 {hasVideo(selectedCardData) && (
                   <div className="mt-4 flex-grow relative min-h-[300px] md:min-h-[400px]">
                     {selectedCardData.videoUrl.includes('drive.google.com') ? (
                       <div className="w-full h-full flex items-center justify-center">
                         <DriveVideo previewUrl={selectedCardData.videoUrl} />
                       </div>
                     ) : (
                       <video
                         src={selectedCardData.videoUrl}
                         autoPlay
                         loop
                         muted
                         playsInline
                         className="rounded-lg w-full h-full object-contain"
                       />
                     )}
                   </div>
                 )}
               </div>
             </div>
           )}
         </Modal>
      </main>
    </div>
  );
} 