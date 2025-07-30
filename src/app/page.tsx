'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  AlertTriangle, 
  Lightbulb, 
  LineChart, 
  Users,
  Expand,
  MessageCircle
} from "lucide-react";

export default function HomePage() {
  const investmentCards = [
    {
      id: "problem",
      title: "Problem",
      icon: <AlertTriangle className="w-16 h-16" />,
      summary: "\"CRE is not an industry - it's just a bunch of marquees on top of independent contractors.\"",
      gradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20",
      textColor: "text-red-800 dark:text-red-200",
      accentColor: "text-red-600 dark:text-red-300"
    },
    {
      id: "solution", 
      title: "Solution",
      icon: <Lightbulb className="w-16 h-16" />,
      summary: "\"We're basically 'Uber'-izing Commercial Real Estate\"",
      gradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-indigo-800 dark:text-indigo-200",
      accentColor: "text-indigo-600 dark:text-indigo-300"
    },
    {
      id: "market",
      title: "Market", 
      icon: <LineChart className="w-16 h-16" />,
      summary: "\"Disrupt CRE Debt: $10B Goldmine Awaits!\"",
      gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20", 
      textColor: "text-purple-800 dark:text-purple-200",
      accentColor: "text-purple-600 dark:text-purple-300"
    },
    {
      id: "team",
      title: "Team",
      icon: <Users className="w-16 h-16" />,
      summary: "\"20+ years experience. Proven track records. Ready to scale.\"",
      gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
      textColor: "text-emerald-800 dark:text-emerald-200",
      accentColor: "text-emerald-600 dark:text-emerald-300"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center min-h-screen p-4 md:p-8">
        <div className="text-center w-full max-w-7xl mx-auto pt-4 md:pt-6">
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
            {'AI-Powered. Borrower-Controlled. Commercial Lending, Simplified.'}
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
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/[0.02] dark:to-white/[0.01] pointer-events-none" />
                <Expand className={`absolute top-4 right-4 w-6 h-6 ${card.textColor} opacity-60 group-hover:opacity-100 transition-opacity z-10`} />
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`${card.textColor}`}>{card.icon}</div>
                    <h3 className={`text-4xl font-semibold ${card.textColor}`}>
                      {card.title}
                    </h3>
                  </div>
                </div>
                
                <p className={`text-lg leading-relaxed font-light italic ${card.accentColor} text-center`}>
                  {card.summary}
                </p>
              </Link>
            ))}
        </div>

        {/* Ask Card */}
        <div className="w-full max-w-7xl mx-auto mt-8">
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 hover:shadow-lg dark:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fadeIn group relative overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/[0.02] dark:to-white/[0.01] pointer-events-none" />
            
            <p className="text-lg leading-relaxed font-light italic text-amber-600 dark:text-amber-300 text-center mb-6">
              We're raising 2.5 million as a pre seed round to revolutionize how the CRE markets work
            </p>

            <div className="flex justify-center">
              <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 