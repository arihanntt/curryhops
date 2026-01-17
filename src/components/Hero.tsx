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
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress for parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-[120vh] bg-gray-900 text-white overflow-hidden pt-40 sm:pt-48 md:pt-44 pb-20"
    >
      {/* 🔹 SEO H1 (VISIBLE – RECOMMENDED) */}
      <h1 className="sr-only">
        Modern Indian Cuisine & Craft Beers in Mohali
      </h1>

      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y,
          opacity,
          scale: 1.15,
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Curry & Hops Brewing Co. interior – Indian restaurant in Mohali"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Tagline */}
        <h2
          className="text-xl sm:text-2xl font-normal italic mb-0 text-white"
          style={{ fontFamily: 'var(--font-arapey)' }}
        >
          Where Spice Meets Craft
        </h2>

        {/* Logo */}
        <Image
          src="/images/logo-light.png"
          alt="Curry & Hops – Brewing Co. in Mohali"
          width={700}
          height={100}
          className="object-contain mb-6 max-w-[90%] h-auto"
          priority
        />

        {/* SEO-Optimized Description */}
        <p
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-12 text-white leading-relaxed px-2 sm:px-4"
          style={{ fontFamily: 'var(--font-arapey)' }}
        >
          Curry & Hops is a modern Indian restaurant and brewing co. in Mohali,
          where bold curry flavors meet finely crafted beers. Located near
          Chandigarh, we offer a refined dining experience for food and craft
          beer enthusiasts.
        </p>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-16 mb-12 w-full text-white">
          {/* Write Us */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/email-icon.png"
              alt="Email Curry & Hops Brewing Co."
              width={32}
              height={32}
              className="mb-2 sm:w-8 sm:h-8"
            />
            <h3 className="text-base sm:text-lg font-semibold mb-1">
              Write us
            </h3>
            <a
              href="mailto:curryandhops@gmail.com"
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              curryandhops@gmail.com
            </a>
          </div>

          {/* Find Us */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/location-icon.png"
              alt="Location of Curry & Hops Brewing Co."
              width={32}
              height={32}
              className="mb-2 sm:w-8 sm:h-8"
            />
            <h3 className="text-base sm:text-lg font-semibold mb-1">
              Find us
            </h3>
            <a
              href="https://share.google/BOwblttjXrFsb9jtD"
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gmada Aerocity, Mohali, Punjab
            </a>
          </div>

          {/* Call Us */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/phone-icon.png"
              alt="Call Curry & Hops Brewing Co."
              width={32}
              height={32}
              className="mb-2 sm:w-8 sm:h-8"
            />
            <h3 className="text-base sm:text-lg font-semibold mb-1">
              Call us
            </h3>
            <a
              href="tel:+918699966565"
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              +91 86999 66565
            </a>
          </div>
        </div>

        {/* Optional Internal Links (SEO Boost) */}
        <div className="flex gap-6">
          <Link
            href="/menu"
            className="underline hover:text-[#F4A948] transition-colors"
          >
            View Menu
          </Link>
          <Link
            href="/about"
            className="underline hover:text-[#F4A948] transition-colors"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
