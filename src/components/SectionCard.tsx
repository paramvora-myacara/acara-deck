import React from "react";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <div className={`glass-card rounded-3xl p-6 md:p-8 pt-10 md:pt-12 border border-gray-200 dark:border-white/20 shadow-md dark:shadow-xl shadow-gray-200/50 dark:shadow-white/5 ${className}`}>
      {children}
    </div>
  );
} 