'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function FoodMenuHero() {
  const [offsetY, setOffsetY] = useState(0);
  const bgRef = useRef(null);

  // Mobile fallback parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setOffsetY(window.scrollY * 0.25); // Adjust parallax strength
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform transform-gpu"
        style={{
          zIndex: 0,
          transform: window.innerWidth < 768 ? `translateY(${offsetY}px)` : 'none',
        }}
      >
        <Image
          src="/images/foodbg.jpg"
          alt="Background"
          fill
          className="object-cover"
          style={{
            backgroundAttachment: window.innerWidth >= 768 ? 'fixed' : 'scroll',
            backgroundPosition: 'center',
          }}
          priority
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <p className="text-white text-lg mb-2" style={{ fontFamily: 'var(--font-vibes)' }}>
          Delicious plates for you
        </p>

        <h1 className="text-white text-5xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-poppins)' }}>
          FOOD MENU
        </h1>

        <p
          className="text-white max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8 italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Experience the bold, authentic flavors of India — from rich curries and smoky tandoori to vibrant street-style bites, all crafted with tradition and passion.
        </p>

        <button className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
          FULL LIST
        </button>
      </div>
    </section>
  );
}