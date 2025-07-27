'use client';

import Link from "next/link";

export default function ProblemPage() {
  const problemCards = [
    {
      title: "Finding Each Other is Hard",
      content: [
        "Developers can't find the right lenders",
        "Lenders can't find good projects",
        "Everyone wastes time searching",
      ],
      gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
      textColor: "text-red-900 dark:text-red-300",
      accentColor: "text-red-700 dark:text-red-400"
    },
    {
      title: "Creating Deal Docs Takes Forever",
      content: [
        "Making an OM (deal pitch) takes weeks",
        "Info scattered across emails, spreadsheets, PDFs",
        "When anything changes, start over",
        "No version control = confusion",
      ],
      gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
      textColor: "text-red-900 dark:text-red-300",
      accentColor: "text-red-700 dark:text-red-400"
    },
    {
      title: "120,000 Brokers Not Placing Debt",
      content: [
        "Licensed to do it, but don't",
        "No platform exists for them",
        "Huge untapped potential",
      ],
      gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
      textColor: "text-red-900 dark:text-red-300",
      accentColor: "text-red-700 dark:text-red-400"
    },
    {
      title: "Developers Struggle to Market",
      content: [
        "Not good at reaching investors",
        "No standard format to compare deals",
        "Money left on the table",
      ],
      gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
      textColor: "text-red-900 dark:text-red-300",
      accentColor: "text-red-700 dark:text-red-400"
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center min-h-screen p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto pt-16 md:pt-24 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                The Problem
            </h1>
            <Link href="/" className="mt-4 inline-block text-lg text-blue-500 hover:underline">
                &larr; Back to Home
            </Link>
        </header>

        <div className="w-full max-w-7xl mx-auto flex-grow my-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {problemCards.map((card, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn flex flex-col justify-center`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative">
                  <h3 className={`text-2xl font-semibold ${card.textColor} mb-4`}>
                    {card.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {card.content.map((item, itemIdx) => (
                      <li key={itemIdx} className={`text-lg font-light ${card.accentColor}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
} 