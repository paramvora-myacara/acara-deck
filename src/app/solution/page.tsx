'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type SolutionCard = {
  title: string;
  slug: string;
  content: string[];
  gradient: string;
  textColor: string;
  accentColor: string;
  dotColor: string;
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function SolutionPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [readCards, setReadCards] = useState<Set<number>>(new Set());
  const [readOrder, setReadOrder] = useState<number[]>([]);

  const solutionCards: SolutionCard[] = [
    {
      title: "Smart Matching",
      slug: slugify("Smart Matching"),
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
      slug: slugify("30-Second Deal Docs"),
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
      slug: slugify("One Platform for Everything"),
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
      slug: slugify("Full-Service Support"),
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

  const cardSlug = searchParams.get('card');
  const selectedCard = cardSlug ? solutionCards.findIndex(c => c.slug === cardSlug) : null;

  useEffect(() => {
    if (selectedCard !== null) {
      if (!readCards.has(selectedCard)) {
        setReadCards(prev => new Set(prev).add(selectedCard));
        setReadOrder(prev => [...prev, selectedCard]);
      }
    }
  }, [selectedCard, readCards]);

  const handleSelectCard = (idx: number | null) => {
    const newPath = idx === null ? pathname : `${pathname}?card=${solutionCards[idx].slug}`;
    router.push(newPath, { scroll: false });
  };

  const mainCard = selectedCard !== null ? solutionCards[selectedCard] : null;

  const previewCards = solutionCards
    .map((card, idx) => ({ ...card, originalIndex: idx, animationDelay: Math.random() * 1.5 }))
    .filter((_, idx) => idx !== selectedCard)
    .sort((a, b) => {
      const aIsRead = readCards.has(a.originalIndex);
      const bIsRead = readCards.has(b.originalIndex);

      if (aIsRead && !bIsRead) return 1;
      if (!aIsRead && bIsRead) return -1;

      if (aIsRead && bIsRead) {
        return readOrder.indexOf(a.originalIndex) - readOrder.indexOf(b.originalIndex);
      }
      
      return a.originalIndex - b.originalIndex;
    });


  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
            Our Solution
          </h1>
          <Link href="/" className="mt-4 inline-block text-lg text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </header>

        <AnimatePresence>
          {selectedCard === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {solutionCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => handleSelectCard(idx)}
                    className={`cursor-pointer glass-card rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 flex items-center justify-center h-48 relative`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Expand className={`w-6 h-6 ${card.textColor} opacity-60 group-hover:opacity-100 transition-opacity absolute top-4 right-4`} />
                    <h3 className={`text-2xl text-center font-semibold ${card.textColor}`}>
                      {card.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 flex-1"
            >
              {/* Preview Pane */}
              <motion.div
                className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } }}
              >
                <div className="p-2 md:p-4 rounded-2xl border border-gray-200/50 dark:border-white/10 h-full bg-black/5 dark:bg-white/5">
                  <div className="flex md:flex-col gap-4 h-full justify-start">
                    {previewCards.map((card) => (
                      <motion.div
                        key={card.originalIndex}
                        onClick={() => handleSelectCard(card.originalIndex)}
                        className={`relative cursor-pointer glass-card rounded-2xl p-4 flex-1 md:flex-none bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md flex items-center justify-between`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h3 className={`text-sm text-left font-semibold ${card.textColor}`}>
                          {card.title}
                        </h3>
                        {!readCards.has(card.originalIndex) && (
                          <motion.div 
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${card.dotColor}`}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                              delay: card.animationDelay
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Card */}
              {mainCard && (
                <motion.div
                  className="w-full md:w-2/3 lg:w-3/4 order-1 md:order-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                >
                  <div
                    className={`glass-card rounded-3xl p-8 bg-gradient-to-br ${mainCard.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn h-full`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className={`text-2xl font-semibold ${mainCard.textColor} mb-4`}>
                          {mainCard.title}
                        </h3>
                        
                        <ul className="list-disc list-inside space-y-2 mb-4">
                          {mainCard.content.map((item, itemIdx) => (
                              <li key={itemIdx} className={`text-lg font-light ${mainCard.accentColor}`}>
                              {item}
                              </li>
                          ))}
                        </ul>
                        {mainCard.imageUrl && (
                          <div className="mt-4">
                            <Image 
                              src={mainCard.imageUrl} 
                              alt={mainCard.imageAlt || 'Solution image'}
                              width={500} 
                              height={300}
                              className="rounded-lg object-cover" 
                            />
                          </div>
                        )}
                        {mainCard.videoUrl && (
                          <div className="mt-4">
                            <video
                              src={mainCard.videoUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="rounded-lg w-full"
                            />
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
} 