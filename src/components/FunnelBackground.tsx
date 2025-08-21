'use client';

import { useEffect, useState } from 'react';

export default function FunnelBackground() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay to ensure cards are rendered
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <svg 
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Red gradient for left side (problems) */}
          <linearGradient id="problemsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.5)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgba(239, 68, 68, 0.4)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0.3)" stopOpacity="1" />
          </linearGradient>
          
          {/* Green gradient for right side (solutions) */}
          <linearGradient id="solutionsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgba(34, 197, 94, 0.4)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.3)" stopOpacity="1" />
          </linearGradient>

          {/* Funnel border gradient */}
          <linearGradient id="funnelBorder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(156, 163, 175, 0.8)" />
            <stop offset="50%" stopColor="rgba(156, 163, 175, 1)" />
            <stop offset="100%" stopColor="rgba(156, 163, 175, 0.8)" />
          </linearGradient>

          {/* Enhanced glow */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        {/* Left side funnel - RED (Problems) */}
        <path 
          d="M 15 8 L 50 8 L 50 50 L 50 92 L 35 92 L 25 50 Z"
          fill="url(#problemsGradient)"
          className="opacity-75 dark:opacity-85"
          filter="url(#softGlow)"
        />

        {/* Right side funnel - GREEN (Solutions) */}
        <path 
          d="M 50 8 L 85 8 L 75 50 L 65 92 L 50 92 L 50 50 Z"
          fill="url(#solutionsGradient)"
          className="opacity-75 dark:opacity-85"
          filter="url(#softGlow)"
        />

        {/* Funnel boundary lines */}
        <path 
          d="M 15 8 L 25 50 L 35 92"
          stroke="url(#funnelBorder)" 
          strokeWidth="1.5" 
          fill="none"
          className="opacity-70 dark:opacity-90"
        />
        
        <path 
          d="M 85 8 L 75 50 L 65 92"
          stroke="url(#funnelBorder)" 
          strokeWidth="1.5" 
          fill="none"
          className="opacity-70 dark:opacity-90"
        />

        {/* Top boundary line */}
        <line
          x1="15"
          y1="8"
          x2="85"
          y2="8"
          stroke="url(#funnelBorder)"
          strokeWidth="1.5"
          className="opacity-70 dark:opacity-90"
        />
        
        {/* Bottom boundary line */}
        <line
          x1="35"
          y1="92"
          x2="65"
          y2="92"
          stroke="url(#funnelBorder)"
          strokeWidth="1.5"
          className="opacity-70 dark:opacity-90"
        />

        {/* Center dividing line */}
        <line
          x1="50"
          y1="8"
          x2="50"
          y2="92"
          stroke="url(#funnelBorder)"
          strokeWidth="1"
          className="opacity-40 dark:opacity-60"
        />

        {/* Horizontal gradation lines that follow funnel narrowing */}
        {[18, 28, 38, 48, 58, 68, 78, 88].map((y, index) => {
          // Calculate funnel width at this level (gets narrower as y increases)
          const topWidth = 70; // 85 - 15 = 70
          const bottomWidth = 30; // 65 - 35 = 30
          const progress = (y - 8) / 84; // 0 to 1 from top to bottom
          const currentWidth = topWidth - (progress * (topWidth - bottomWidth));
          
          const centerX = 50;
          const leftX = centerX - currentWidth / 2;
          const rightX = centerX + currentWidth / 2;
          
          return (
            <line
              key={index}
              x1={leftX}
              y1={y}
              x2={rightX}
              y2={y}
              stroke="url(#funnelBorder)"
              strokeWidth="0.3"
              className="opacity-25 dark:opacity-35"
              strokeDasharray="1,2"
            />
          );
        })}

        {/* Downward flow arrows */}
        {[25, 45, 65, 85].map((y, index) => (
          <g key={index} className="opacity-30 dark:opacity-40">
            <path
              d={`M 50 ${y} L 48 ${y + 3} L 52 ${y + 3} Z`}
              fill="rgba(156, 163, 175, 0.8)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
} 