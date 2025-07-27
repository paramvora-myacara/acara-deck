'use client';

import Link from "next/link";

export default function MarketPage() {
    const marketCards = [
        {
          title: "Massive Market",
          content: [
            "$4.8 trillion in CRE debt",
            "$957 billion needs refinancing in 2025",
            "We target $10 billion (1% fee = $100M revenue)",
          ],
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
          accentColor: "text-purple-700 dark:text-purple-400"
        },
        {
          title: "Multiple Revenue Streams",
          content: [
            "Lender subscriptions",
            "Deal closing fees",
            "Data and insights",
            "White-label partnerships",
          ],
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
          accentColor: "text-purple-700 dark:text-purple-400"
        },
        {
          title: "How We'll Use Funding",
          content: [
            "Product development: 40%",
            "Team growth: 35%",
            "Marketing: 25%",
          ],
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
          accentColor: "text-purple-700 dark:text-purple-400"
        },
        {
          title: "We Own the Best Spot",
          content: [
            "Most competitors do one thing:",
            "LoopNet, RCM1: Old marketplaces (manual work)",
            "VTS, Buildout: Single tools (no AI)",
            "Cherre, Bryckel: Smart data (narrow focus)",
            "ACARA CAP sits alone in the top-right:",
          ],
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
          accentColor: "text-purple-700 dark:text-purple-400"
        },
      ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center min-h-screen p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto pt-16 md:pt-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
            Market Opportunity
          </h1>
          <Link href="/" className="mt-4 inline-block text-lg text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </header>

        <div className="w-full max-w-7xl mx-auto flex-grow my-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {marketCards.map((card, idx) => (
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