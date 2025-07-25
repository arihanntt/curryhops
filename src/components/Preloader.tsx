'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (adjust as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F1927] transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo-light.png"
          alt="Curry & Hops Brewing Co. Loading"
          width={150}
          height={56}
          className="animate-spin-slow object-contain"
          priority
        />
        <p
          className="mt-4 text-[#F4A948] text-lg font-medium"
          style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}