'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Problem cards data from the problem page
const problemCards = [
  {
    title: "Borrowers feel INVISIBLE",
    content: "Borrowers miss deals because finding the right lenders is tough—up to 50% of opportunities lost to poor matching.",
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "Industry is FRAGMENTED",
    content: "Deal info is scattered across platforms and formats, slowing everything down and creating inefficiencies.",
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "Lending is SLOW",
    content: "Assembling deal docs demands weeks of analyst time, with updates forcing complete rewrites.",
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "Lenders CANNOT CHOOSE",
    content: "Lenders get deals only from limited partners, with no standardization making deal comparison impossible.",
    gradient: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    accentColor: "text-red-600 dark:text-red-400",
  },
];

// Solution cards data from the solution page
const solutionCards = [
  {
    title: "We bring DEAL FLOW",
    content: "Access nationwide deal flow from established leaders, dealer networks, and state-of-the-art outbound marketing.",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "UNIFIED CapMatch Platform",
    content: "One centralized platform for the entire journey from idea to wire transfer, eliminating fragmentation.",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "AI makes it FAST",
    content: "Generate OMs and Due Diligence vaults in 30 seconds, with live updates and version control.",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "<br/>MATCHMAKING<br/> <br/>",
    content: "Leverage AI for precise, curated matchmaking between lenders and borrowers for higher success rates.",
    gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
    textColor: "text-emerald-900 dark:text-emerald-300",
    accentColor: "text-emerald-700 dark:text-emerald-400",
  },
];

export default function ProblemAndSolutionPage() {
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
         <div className="w-full max-w-7xl mx-auto relative -mt-8 md:-mt-12">
           {/* Desktop Funnel Layout */}
           <div className="relative hidden md:block">
             {/* Problem Cards (Left Side) */}
             <div className="absolute left-[5%] top-0 w-[40%] space-y-4 lg:space-y-6">
               {problemCards.map((card, idx) => {
                 // Calculate widths to ensure symmetrical sizing across rows
                 const cardWidths = [85, 75, 65, 55]; // Decreasing widths for funnel effect
                 const cardWidth = cardWidths[idx] || 55;
                 
                 return (
                   <motion.div
                     key={idx}
                     className={`glass-card rounded-2xl p-6 lg:p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[150px] lg:h-[180px] flex items-center justify-center`}
                     style={{
                       marginLeft: `${100 - cardWidth}%`,
                       width: `${cardWidth}%`,
                     }}
                     initial={{ opacity: 0, x: -50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.2 }}
                   >
                     <h3 
                       className={`text-xl lg:text-2xl xl:text-3xl font-semibold ${card.textColor} text-center leading-tight`}
                       dangerouslySetInnerHTML={{ __html: card.title }}
                     />
                   </motion.div>
                 );
               })}
             </div>

             {/* Solution Cards (Right Side) */}
             <div className="absolute right-[5%] top-0 w-[40%] space-y-4 lg:space-y-6">
               {solutionCards.map((card, idx) => {
                 // Use same widths as problem cards for symmetry
                 const cardWidths = [85, 75, 65, 55]; // Decreasing widths for funnel effect
                 const cardWidth = cardWidths[idx] || 55;
                 
                 return (
                   <motion.div
                     key={idx}
                     className={`glass-card rounded-2xl p-6 lg:p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[150px] lg:h-[180px] flex items-center justify-center`}
                     style={{
                       marginRight: `${100 - cardWidth}%`,
                       width: `${cardWidth}%`,
                     }}
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.2 }}
                   >
                     <h3 
                       className={`text-xl lg:text-2xl xl:text-3xl font-semibold ${card.textColor} text-center leading-tight`}
                       dangerouslySetInnerHTML={{ __html: card.title }}
                     />
                   </motion.div>
                 );
               })}
             </div>

             {/* Spacer to maintain layout height */}
             <div className="h-[500px] lg:h-[600px] xl:h-[700px]" />
           </div>



           {/* Mobile Layout - Stacked Vertically */}
           <div className="block md:hidden space-y-6">
             {/* Problems Section */}
             <div>
               <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 text-center mb-4">Problems</h2>
               <div className="space-y-3">
                 {problemCards.map((card, idx) => (
                   <motion.div
                     key={idx}
                     className={`glass-card rounded-xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[120px] flex items-center justify-center`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                   >
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
                     className={`glass-card rounded-xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 h-[120px] flex items-center justify-center`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: (problemCards.length * 0.1) + (idx * 0.1) }}
                   >
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
      </main>
    </div>
  );
} 