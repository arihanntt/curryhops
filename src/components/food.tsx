'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FoodMenuHero() {
  const ref = useRef(null);
  
  // Track scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // PARALLAX EFFECT:
  // As you scroll down (0 -> 1), move the background image DOWN by 20%.
  // This creates the "stuck" depth effect.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={ref} 
      className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y,
          // Scale image up slightly so no gaps appear when it moves
          scale: 1.15 
        }}
      >
        <Image
          src="/images/foodbg.jpg" // Ensure this image path is correct in your public folder
          alt="Menu Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mx-auto">
        <p
          className="text-white text-lg md:text-xl mb-2"
          style={{ fontFamily: 'var(--font-vibes)' }}
        >
          Delicious plates for you
        </p>

        <h1
          className="text-white text-5xl md:text-6xl font-bold mb-6 tracking-wide"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          MENU
        </h1>

        <p
          className="text-gray-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 italic font-light"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Experience the bold, authentic flavors of India — from rich curries and smoky tandoori
          to vibrant street-style bites, all crafted with tradition and passion.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/menu?type=food">
            <button className="w-full sm:w-auto text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-semibold">
              Food Menu
            </button>
          </Link>

          <Link href="/menu?type=bar">
            <button className="w-full sm:w-auto text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-semibold">
              Bar Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}