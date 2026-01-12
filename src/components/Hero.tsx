'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <section className="relative flex items-center justify-center min-h-[120vh] bg-gray-900 text-white overflow-hidden pt-40 sm:pt-48 md:pt-44 pb-20">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y, position: 'absolute', clipPath: 'inset(0 0 0 0)', scale: 1.1 }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Restaurant Hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
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
              href="mailto:info@resturant.com" 
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              info@resturant.com
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
              href="https://maps.google.com" 
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              123 Spice Street, Foodville
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
              href="tel:+023351569887" 
              className="underline hover:text-[#F4A948] transition-colors text-sm sm:text-base break-words"
            >
              +02 3351569887
            </a>
          </div>
        </div>

       
      </div>
    </section>
  );
}