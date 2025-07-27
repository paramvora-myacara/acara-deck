'use client';

import Link from "next/link";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Todd Vitzthum",
      role: "President & CRE Expert",
      points: [
        "20+ years CRE experience",
        "CBRE, Cushman & Wakefield veteran",
        "Deal-making expert",
      ],
      gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
      textColor: "text-emerald-900 dark:text-emerald-300",
      accentColor: "text-emerald-700 dark:text-emerald-400"
    },
    {
      name: "Dr. Jeff Richmond",
      role: "Co-Founder & Strategy Leader",
      points: [
        "Growth strategy leader",
        "Capital markets expert",
        "Business development pro",
      ],
      gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
      textColor: "text-emerald-900 dark:text-emerald-300",
      accentColor: "text-emerald-700 dark:text-emerald-400"
    },
    {
      name: "Michael Krueger",
      role: "Legal Counsel",
      points: [
        "Corporate attorney",
        "Real estate law specialist",
        "Legal strategy advisor",
      ],
      gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
      textColor: "text-emerald-900 dark:text-emerald-300",
      accentColor: "text-emerald-700 dark:text-emerald-400"
    },
    {
      name: "Param Vora",
      role: "CTO & AI Expert",
      points: [
        "AI technology expert",
        "Product management leader",
        "MS in Artificial Intelligence",
      ],
      gradient: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20",
      textColor: "text-emerald-900 dark:text-emerald-300",
      accentColor: "text-emerald-700 dark:text-emerald-400"
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
            Our Team
          </h1>
          <Link href="/" className="mt-4 inline-block text-lg text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </header>

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-3xl p-8 bg-gradient-to-br ${member.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative">
                  <h3 className={`text-2xl font-semibold ${member.textColor}`}>{member.name}</h3>
                  <p className={`text-lg font-medium ${member.accentColor} mb-4`}>{member.role}</p>
                  <ul className="space-y-2">
                    {member.points.map((point, pointIdx) => (
                      <li key={pointIdx} className={`text-lg font-light ${member.accentColor}`}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 