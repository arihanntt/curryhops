'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export default function Hero() {
  const ref = useRef(null);
  
  // Track scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // PARALLAX MAGIC: 
  // As we scroll down (0 to 1), move the image DOWN by 30% of its height.
  // This counters the upward movement of the scroll, making it feel "stuck".
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Optional: Fade out the image slightly as it scrolls away for focus
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  return (
    <section 
      ref={ref}
      className="relative flex items-center justify-center min-h-[120vh] bg-gray-900 text-white overflow-hidden pt-40 sm:pt-48 md:pt-44 pb-20"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ 
          y, 
          opacity,
          // Scale slightly up to prevent white gaps at edges during movement
          scale: 1.15 
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Restaurant Hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay - Stays fixed to container to darken image */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content - Z-Index 10 ensures it sits above the image/overlay */}
      <div className="relative z-10 text-center px-6 max-w-6xl w-full mx-auto flex flex-col items-center">
        <h2
          className="text-xl sm:text-2xl font-normal italic mb-0 text-white"
          style={{ fontFamily: 'var(--font-arapey)' }}
        >
          Where Spice Meets Craft
        </h2>

        {/* Logo */}
        <Image
          src="/images/logo-light.png"
          alt="Curry & Hops Brewing Co."
          width={700}
          height={100}
          className="object-contain mb-6 max-w-[90%] h-auto"
          priority
        />

        {/* Description Paragraph */}
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-12 text-white leading-relaxed px-2 sm:px-4" style={{ fontFamily: 'var(--font-arapey)' }}>
          Creating a unique dining experience that celebrates the fusion of exquisite curry flavors and finely crafted beers, becoming a cherished destination for food and beer enthusiasts alike.
        </p>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-16 mb-12 w-full text-white">
          {/* Write Us */}
          <div className="flex flex-col items-center text-center">
            <Image 
              src="/images/email-icon.png" 
              alt="Email icon"
              width={32}
              height={32}
              className="mb-2 sm:w-8 sm:h-8"
            />
            <h3 className="text-base sm:text-lg font-semibold mb-1">Write us</h3>
            <a 
              href="curryandhops@gmail.com" 
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              curryandhops@gmail.com
            </a>
          </div>

          {/* Find Us */}
          <div className="flex flex-col items-center text-center">
            <Image 
              src="/images/location-icon.png" 
              alt="Location icon"
              width={32}
              height={32}
              className="mb-2 sm:w-8 sm:h-8"
            />
            <h3 className="text-base sm:text-lg font-semibold mb-1">Find us</h3>
            <a 
              href="https://share.google/BOwblttjXrFsb9jtD" 
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              Gmada Aerocity, Sahibzada Ajit Singh Nagar
            </a>
          </div>

          {/* Call Us */}
          <div className="flex flex-col items-center text-center">
            <Image 
              src="/images/phone-icon.png" 
              alt="Phone icon"
              width={32}
              height={32}
              className="mb-2 sm:w-8 sm:h-8"
            />
            <h3 className="text-base sm:text-lg font-semibold mb-1">Call us</h3>
            <a 
              href="tel:+918699966565" 
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              +91 8699966565
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}