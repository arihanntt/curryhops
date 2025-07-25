'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function About() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  const swirlY = useTransform(scrollY, [0, 600], [0, 40]);
  const wavesY = useTransform(scrollY, [0, 600], [0, -30]);

  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative bg-[#0c0f0f] text-white px-6 md:px-20 pt-20 pb-16 overflow-hidden z-10 mt-[-5rem]"
    >
      {/* Decorative SVGs */}
      {mounted && (
        <>
          <motion.div
  style={{ y: swirlY }}
  animate={{ rotate: [0, 5, -5, 0] }}
  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
  className="hidden md:block absolute right-[45%] top-14 opacity-20 z-0"
>
  <Image src="/images/swirl.svg" alt="Decor" width={500} height={500} />
</motion.div>


          
        </>
      )}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10 relative z-10">
        {/* Left: Text */}
        <div className="space-y-5">
          <p
  className="text-[#D9B68A] italic text-3xl md:text-4xl"
  style={{ fontFamily: "'Great Vibes', cursive" }}
>
  About Us
</p>

<h2 className="text-2xl md:text-4xl font-bold leading-snug">
  A Journey of Flavors <br />
  <span className="text-[#D9B68A]">Born in India</span>
</h2>

<p className="text-gray-300 leading-relaxed text-sm md:text-base">
  Our kitchen brings together time-honored recipes from the heart of India — from the rich curries of the north
  to the fiery tandoors and delicate street bites. Each dish is a celebration of culture, crafted with fresh
  ingredients and traditional spices.
</p>
<p className="text-gray-300 leading-relaxed text-sm md:text-base">
  Whether you crave buttery naan, sizzling kebabs, or soul-warming chai, our food is a tribute to Indian hospitality — warm, vibrant, and unforgettable.
</p>


          <button className="border px-6 py-2 mt-2 border-white hover:bg-white hover:text-black transition text-sm">
            View More
          </button>
        </div>

        {/* Right: Image */}
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
  src="/images/about-image.jpg"
  alt="About Dish"
  width={700}
  height={700}
  className="rounded-xl w-full h-[500px] object-cover shadow-xl"
/>

        </div>
      </div>
    </section>
  );
}
