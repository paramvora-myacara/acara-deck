'use client';

import Link from "next/link";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import CompetitorChart from './components/CompetitorChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function MarketPage() {
    const marketCards = [
        {
          title: "Massive Market",
          type: "chart",
          chartType: "bar",
          data: {
            labels: ['$4.8T CRE Debt', '$957B Refi 2025', '$10B Target'],
            datasets: [
              {
                label: 'Market Size ($B)',
                data: [4800, 957, 10],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
        },
        {
          title: "Multiple Revenue Streams",
          type: "chart",
          chartType: "pie",
          data: {
            labels: ['Lender Subscriptions', 'Deal Closing Fees', 'Data & Insights', 'White-Label'],
            datasets: [
              {
                label: 'Revenue Streams',
                data: [35, 45, 15, 5],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
        },
        {
          title: "How We'll Use Funding",
          type: "chart",
          chartType: "pie",
          data: {
            labels: ['Product Development', 'Team Growth', 'Marketing'],
            datasets: [
              {
                label: 'Funding Allocation',
                data: [40, 35, 25],
                backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
        },
        {
          title: "We Own the Best Spot",
          type: "custom",
          gradient: "from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20",
          textColor: "text-purple-900 dark:text-purple-300",
        },
      ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <header className="w-full max-w-7xl mx-auto mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
            Market Opportunity
          </h1>
          <Link href="/" className="mt-4 inline-block text-lg text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
        </header>

        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {marketCards.map((card, idx) => (
              <div
                key={idx}
                className={`glass-card rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 animate-fadeIn`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative">
                  <h3 className={`text-2xl font-semibold ${card.textColor} mb-4`}>
                    {card.title}
                  </h3>
                  {card.type === 'chart' && card.chartType === 'bar' && <Bar data={card.data} />}
                  {card.type === 'chart' && card.chartType === 'pie' && <Pie data={card.data} />}
                  {card.type === 'custom' && <CompetitorChart />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 