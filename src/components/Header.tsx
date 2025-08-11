'use client';

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 py-1.5">
        <Link href="/" className="inline-block">
          <Image
            src="/CapMatchLogo.png"
            alt="CapMatch Logo"
            width={120}
            height={40}
            className="h-20 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
} 