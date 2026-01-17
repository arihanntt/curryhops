'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FoodMenuHero() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
          scale: 1.15,
        }}
      >
        <Image
          src="/images/foodbg.jpg"
          alt="Curry & Hops Brewing Co. food menu background – Indian restaurant in Mohali"
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

        {/* ✅ SEO-CORRECT H1 */}
        <h1
  className="text-white text-5xl md:text-6xl font-bold mb-6 tracking-wide"
  style={{ fontFamily: 'var(--font-poppins)' }}
>
  Food & Bar Menu
</h1>


        {/* SEO + Brand Paragraph */}
      <p
  className="text-gray-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10 italic font-light"
  style={{ fontFamily: 'var(--font-playfair)' }}
>
  Experience bold Indian flavors — from rich curries and smoky tandoori
  to vibrant street-style bites and thoughtfully crafted beverages,
  prepared with tradition and passion.
</p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/menu?type=food">
            <span className="w-full sm:w-auto inline-block text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-semibold">
              Food Menu
            </span>
          </Link>

          <Link href="/menu?type=bar">
            <span className="w-full sm:w-auto inline-block text-white border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-semibold">
              Bar Menu
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
