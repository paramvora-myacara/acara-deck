'use client';
import Image from "next/image";

const competitors = [
  // CapMatch (Top-Right) - Centered and enlarged
  { name: 'CapMatch', automation: 8, integration: 8, logoUrl: '/CapMatchLogo.png' },

  // AI-Driven & Fragmented (Top-Left)
  { name: 'Henry AI', automation: 8.5, integration: 4, logoUrl: '/logos/HenryAILogo.png' },
  { name: 'Bryckel', automation: 8, integration: 1.5, logoUrl: '/logos/BryckelLogo.png' },
  { name: 'Cherre', automation: 6.5, integration: 2.5, logoUrl: '/logos/cherreLogo.png' },

  // Manual & Unified (Bottom-Right)
  { name: 'Northmarq', automation: 2.5, integration: 8, logoUrl: '/logos/NorthMarqLogo.png' },
  { name: 'CBRE', automation: 1, integration: 9, logoUrl: '/logos/CBRELogo.png' },

  // Manual & Fragmented (Bottom-Left) - Readjusted for clarity
  { name: 'VTS', automation: 4.5, integration: 3.5, logoUrl: '/logos/VTSLogo.png' },
  { name: 'RCM1', automation: 3, integration: 3.5, logoUrl: '/logos/RCM1Logo.png' },
  { name: 'Buildout', automation: 4, integration: 1, logoUrl: '/logos/BuildoutLogo.png' },
  { name: 'LoopNet', automation: 1.5, integration: 2, logoUrl: '/logos/LoopNetLogo.png' },
  { name: 'Traditional Brokers', automation: 0.5, integration: 3, text: true },
];

const CompetitiveAnalysisGraph = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 py-8 md:p-12 bg-white dark:bg-gray-900/50 rounded-2xl">
      <div className="relative w-full aspect-square">
        {/* Axis Lines & Labels */}
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-600 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 h-0.5 w-full bg-gray-300 dark:bg-gray-600 -translate-y-1/2"></div>
        <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full py-2 text-xs md:text-sm font-semibold text-teal-500">AI-DRIVEN</p>
        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full py-2 text-xs md:text-sm font-semibold text-red-500">MANUAL</p>
        <p className="absolute bottom-1/2 left-2 mb-1 text-xs md:text-sm font-semibold text-red-500">FRAGMENTED</p>
        <p className="absolute bottom-1/2 right-2 mb-1 text-xs md:text-sm font-semibold text-teal-500 text-right">UNIFIED</p>
        
        {/* Competitor Points */}
        {competitors.map(c => {
          const yPos = (c.automation - 5) / 5;
          const xPos = (c.integration - 5) / 5;
          const isCapMatch = c.name === 'CapMatch';

          return (
            <div
              key={c.name}
              className={`absolute transition-all duration-500`}
              style={{ 
                top: `${50 - yPos * 50}%`,
                left: `${50 + xPos * 50}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={`relative ${isCapMatch ? 'w-60 h-30 md:w-120 md:h-60' : 'w-14 h-7 md:w-24 md:h-12'}`}>
                {c.logoUrl ? (
                  <Image
                    src={c.logoUrl}
                    alt={`${c.name} Logo`}
                    fill
                    sizes={isCapMatch ? "(max-width: 768px) 240px, 480px" : "(max-width: 768px) 56px, 96px"}
                    style={{ objectFit: 'contain' }}
                    className={isCapMatch ? 'drop-shadow-lg' : ''}
                  />
                ) : c.text ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-center text-[9px] md:text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Traditional Brokers
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompetitiveAnalysisGraph;
