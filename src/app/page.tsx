'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  AlertTriangle, 
  Lightbulb, 
  LineChart, 
  Users,
  Expand
} from "lucide-react";

export default function HomePage() {
  const investmentCards = [
    {
      id: "problem",
      title: "Problem",
      icon: <AlertTriangle className="w-10 h-10" />,
      summary: "Finding each other is hard. Creating deal docs takes forever.",
      gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
      textColor: "text-red-900 dark:text-red-300",
      accentColor: "text-red-700 dark:text-red-400"
    },
    {
      id: "solution", 
      title: "Solution",
      icon: <Lightbulb className="w-10 h-10" />,
      summary: "Smart matching. 30-second deal docs. One platform for everything.",
      gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-indigo-900 dark:text-indigo-300",
      accentColor: "text-indigo-700 dark:text-indigo-400"
    },
    {
      id: "market",
      title: "Market", 
      icon: <LineChart className="w-10 h-10" />,
      summary: "$4.8 trillion market. Multiple revenue streams. We're different.",
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20", 
      textColor: "text-purple-900 dark:text-purple-300",
      accentColor: "text-purple-700 dark:text-purple-400"
    },
    {
      id: "team",
      title: "Team",
      icon: <Users className="w-10 h-10" />,
      summary: "20+ years experience. Proven track records. Ready to scale.",
      gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
      textColor: "text-emerald-900 dark:text-emerald-300",
      accentColor: "text-emerald-700 dark:text-emerald-400"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center min-h-screen p-4 md:p-8">
        <div className="text-center w-full max-w-7xl mx-auto pt-16 md:pt-24">
          <div className="flex justify-center">
            <Image 
              src="/ACARALogo.png" 
              alt="Acara Capital Logo"
              width={500}
              height={150}
              priority
            />
          </div>
          <p className="mt-4 text-lg md:text-xl text-black/70 dark:text-white/70 font-light whitespace-pre-line">
            {'AI-Powered. Borrower-Controlled.\nCommercial Lending,\nSimplified.'}
          </p>
          <a href="https://acara-cap-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
            @https://acara-cap-frontend.onrender.com/
          </a>
        </div>
        
        <div id="investment-cards" className="w-full max-w-7xl mx-auto mt-12 flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {investmentCards.map((card, idx) => (
              <Link
                key={idx}
                href={`/${card.id}`}
                className={`glass-card rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 hover:shadow-lg dark:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fadeIn group relative overflow-hidden flex flex-col justify-center`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 dark:from-white/[0.04] dark:to-white/[0.02] pointer-events-none" />
                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`${card.textColor}`}>{card.icon}</div>
                    <h3 className={`text-2xl font-semibold ${card.textColor}`}>
                      {card.title}
                    </h3>
                  </div>
                  <Expand className={`w-6 h-6 ${card.textColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
                
                <p className={`text-lg leading-relaxed font-light ${card.accentColor}`}>
                  {card.summary}
                </p>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
} 