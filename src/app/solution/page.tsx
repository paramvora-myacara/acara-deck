'use client';

import Link from "next/link";
import Image from "next/image";

export default function SolutionPage() {
  const solutionCards = [
    {
      title: "Smart Matching",
      content: [
        "AI learns what lenders like",
        "Matches developers to right lenders",
        "Gets smarter over time",
      ],
      videoUrl: "/AcaraDemo720p.mp4",
      gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-indigo-900 dark:text-indigo-300",
      accentColor: "text-indigo-700 dark:text-indigo-400"
    },
    {
      title: "30-Second Deal Docs",
      content: [
        "Drag and drop any documents",
        "AI builds your OM instantly",
        "Always up-to-date",
        "Ask questions, get answers",
      ],
      imageUrl: "/solution-platform-workflow.png",
      imageAlt: "ACARA CAP platform workflow",
      gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-indigo-900 dark:text-indigo-300",
      accentColor: "text-indigo-700 dark:text-indigo-400"
    },
    {
      title: "One Platform for Everything",
      content: [
        "Developers raise capital",
        "Lenders find deals",
        "Everyone wins",
      ],
      gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-indigo-900 dark:text-indigo-300",
      accentColor: "text-indigo-700 dark:text-indigo-400"
    },
    {
      title: "Full-Service Support",
      content: [
        "Expert broker team",
        "Wide lender network",
        "White-glove service",
      ],
      gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-indigo-900 dark:text-indigo-300",
      accentColor: "text-indigo-700 dark:text-indigo-400"
    },
  ];

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

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {solutionCards.map((card, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative">
                  <h3 className={`text-2xl font-semibold ${card.textColor} mb-4`}>
                    {card.title}
                  </h3>
                  
                  {card.title === "30-Second Deal Docs" ? (
                    <>
                      <ul className="list-disc list-inside space-y-2 mb-4">
                        {card.content.map((item, itemIdx) => (
                            <li key={itemIdx} className={`text-lg font-light ${card.accentColor}`}>
                            {item}
                            </li>
                        ))}
                      </ul>
                      {card.imageUrl && (
                        <div className="mt-4">
                          <Image 
                            src={card.imageUrl} 
                            alt={card.imageAlt} 
                            width={500} 
                            height={300}
                            className="rounded-lg object-cover" 
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <ul className="list-disc list-inside space-y-2">
                        {card.content.map((item, itemIdx) => (
                            <li key={itemIdx} className={`text-lg font-light ${card.accentColor}`}>
                            {item}
                            </li>
                        ))}
                      </ul>
                      {card.videoUrl && (
                        <div className="mt-4">
                          <video
                            src={card.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 