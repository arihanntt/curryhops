'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const [hasMounted, setHasMounted] = useState(false);
  const { scrollY } = useScroll();

  // Define scroll-based Y transforms for parallax
  const guitarY = useTransform(scrollY, [0, 600], [0, 100]);
  const beerY = useTransform(scrollY, [0, 600], [0, -80]);
  const dishesY = useTransform(scrollY, [0, 600], [0, 60]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section className="relative bg-[#060617] text-[#FFEFDB] py-24 px-6 md:px-12 lg:px-20 z-10 mt-[-5rem] overflow-hidden">
      {/* Parallax Background Images */}
      {hasMounted && (
        <>
          {/* Guitar Right */}
          <motion.div
            style={{ y: guitarY }}
            className="hidden md:block absolute right-[-10px] bottom-50 w-64 md:w-72 opacity-10 pointer-events-none z-0"
          >
            <Image
              src="/images/guitar1.png"
              alt="Guitar"
              width={288}
              height={288}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Beer Left */}
          <motion.div
            style={{ y: beerY }}
            className="hidden md:block absolute left-[-100px] top-24 w-52 md:w-60 opacity-10 pointer-events-none z-0"
          >
            <Image
              src="/images/beer1.png"
              alt="Beer"
              width={240}
              height={240}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Dishes Center (Bottom) */}
          <motion.div
            style={{ y: dishesY }}
            className="hidden md:block absolute left-1/2 bottom-[-60px] transform -translate-x-1/2 w-52 md:w-64 opacity-10 pointer-events-none z-0"
          >
            <Image
              src="/images/dishes1.png"
              alt="Dishes"
              width={256}
              height={256}
              className="w-full h-auto"
            />
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center relative z-10">
        {/* Left: Text */}
        <div className="space-y-8 text-center md:text-left flex flex-col items-center md:items-start">
          <p
            className="text-[#F4A948] italic text-5xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            About Our Restaurant
          </p>
          <blockquote
            className="text-2xl md:text-3xl font-semibold leading-snug"
            style={{ fontFamily: "'Avenir LT STD', sans-serif" }}
          >
            Our pub is always fun atmosphere, <br className="hidden md:inline" />
            the freshest beer and delicious food. <br className="hidden md:inline" />
            You always want to come back again.
          </blockquote>
        </div>

        {/* Right: Feature Icons */}
        <div className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-3 md:text-left md:justify-items-start text-center">
          <div className="flex flex-col items-center md:items-start space-y-3">
            <Image
              src="/images/music.png"
              alt="Live Music"
              width={64}
              height={64}
              className="object-contain"
            />
            <span className="font-semibold text-white text-sm sm:text-base">Live Music</span>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <Image
              src="/images/dishes.png"
              alt="Amazing Dishes"
              width={64}
              height={64}
              className="object-contain"
            />
            <span className="font-semibold text-white text-sm sm:text-base">Amazing Dishes</span>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-3">
            <Image
              src="/images/beer.png"
              alt="Craft Beer"
              width={64}
              height={64}
              className="object-contain"
            />
            <span className="font-semibold text-white text-sm sm:text-base">Craft Beer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
