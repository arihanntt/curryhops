'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function FoodMenuHero() {
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Detect mobile and handle scroll for parallax effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setOffsetY(window.scrollY * 0.25);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage: 'url(/images/foodbg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: isMobile ? `translateY(${offsetY}px)` : undefined,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <p
          className="text-white text-lg mb-2"
          style={{ fontFamily: 'var(--font-vibes)' }}
        >
          Delicious plates for you
        </p>

        <h1
          className="text-white text-5xl md:text-4xl font-bold mb-6"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          MENU
        </h1>

        <p
          className="text-white max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Experience the bold, authentic flavors of India — from rich curries and smoky tandoori
          to vibrant street-style bites, all crafted with tradition and passion.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/menu?type=food">
            <button className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
              Food Menu
            </button>
          </Link>

          <Link href="/menu?type=bar">
            <button className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
              Bar Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
