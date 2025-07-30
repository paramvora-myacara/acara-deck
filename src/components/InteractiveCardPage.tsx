'use client';

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Modal } from './Modal/Modal';

export interface CardData {
  title: string;
  content: string[];
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  slug: string;
  gradient: string;
  textColor: string;
  accentColor: string;
  dotColor: string;
  customComponent?: React.ReactNode;
  role?: string;
}

type InteractiveCardPageProps = {
  pageTitle: string;
  byline?: string;
  cards: CardData[];
  showRoleAsByline?: boolean;
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

function InteractiveCardPageComponent({ pageTitle, byline, cards: initialCards, showRoleAsByline = false }: InteractiveCardPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cards = initialCards.map(card => ({...card, slug: slugify(card.title)}));

  const cardSlug = searchParams.get('card');
  const selectedCardIndex = cardSlug ? cards.findIndex(c => c.slug === cardSlug) : -1;

  const handleSelectCard = (idx: number) => {
    const newPath = `${pathname}?card=${cards[idx].slug}`;
    router.push(newPath, { scroll: false });
  };
  
  const handleClose = () => {
    router.back();
  };

  const mainCard = selectedCardIndex !== -1 ? cards[selectedCardIndex] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
            {pageTitle}
          </h1>
          {byline && (
            <p className="mt-4 text-lg md:text-xl text-black/70 dark:text-white/70 font-light italic">
              {byline}
            </p>
          )}
          <Link href="/" className="mt-4 inline-block text-lg text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </header>

        <motion.div
          key="grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                onClick={() => handleSelectCard(idx)}
                className={`cursor-pointer group glass-card rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 flex flex-col items-center justify-center h-48 relative`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Expand className={`w-6 h-6 ${card.textColor} opacity-60 group-hover:opacity-100 transition-opacity absolute top-4 right-4`} />
                <h3 className={`text-2xl text-center font-semibold ${card.textColor} mb-2`} dangerouslySetInnerHTML={{ __html: card.title }} />
                {showRoleAsByline && card.role && (
                  <p className={`text-lg text-center font-medium ${card.accentColor} opacity-80`}>{card.role}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <Modal isOpen={selectedCardIndex !== -1} onClose={handleClose}>
            {mainCard && (
                <div className={`relative glass-card rounded-3xl p-8 bg-gradient-to-br ${mainCard.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn h-full`}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedCardIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full"
                      >
                        <div>
                          <h3 className={`text-2xl font-semibold ${mainCard.textColor} mb-6`} dangerouslySetInnerHTML={{ __html: mainCard.title }} />
                          {mainCard.role && (
                            <p className={`text-lg font-medium ${mainCard.accentColor} mb-6`}>{mainCard.role}</p>
                          )}
                          
                          <ul className="list-disc list-inside space-y-6 mb-4">
                            {mainCard.content.map((item, itemIdx) => (
                                <li key={itemIdx} className={`text-lg font-light ${mainCard.accentColor}`}>
                                {item}
                                </li>
                            ))}
                          </ul>
                        </div>
                        {mainCard.imageUrl && (
                          <div className="mt-4 flex-grow relative min-h-[300px] md:min-h-[400px]">
                            <Image 
                              src={mainCard.imageUrl} 
                              alt={mainCard.imageAlt || 'Solution image'}
                              fill
                              className="rounded-lg object-contain" 
                            />
                          </div>
                        )}
                        {mainCard.videoUrl && (
                          <div className="mt-4 flex-grow relative min-h-[300px] md:min-h-[400px]">
                            <video
                              src={mainCard.videoUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="rounded-lg w-full h-full object-contain"
                            />
                          </div>
                        )}
                        {mainCard.customComponent && (
                          <div className="mt-4">
                            {mainCard.customComponent}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </Modal>

      </main>
    </div>
  );
}

export default function InteractiveCardPage(props: InteractiveCardPageProps) {
  return (
    <Suspense>
      <InteractiveCardPageComponent {...props} />
    </Suspense>
  );
} 