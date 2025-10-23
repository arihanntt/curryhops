"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* === Background Image === */}
      <Image
        src="/images/food-bg-top.jpg"
        alt="Hero Background"
        fill
        className="object-cover object-center scale-105"
        priority
      />

      {/* === Elegant dark overlay === */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>

      {/* === Rotating Decorative Element === */}
 <motion.img
  src="/images/spin-pattern.png"
  alt="Spinning Accent"
  className="
    absolute z-10 opacity-70
    w-[110vw] sm:w-[60vw] md:w-[60vw] lg:w-[60vw]
    max-w-[650px] min-w-[200px]
  "
  initial={{ rotate: 0 }}
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
/>


      {/* === Content === */}
      <div className="relative z-20 text-center px-6">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="italic text-lg sm:text-2xl tracking-[0.25em] text-gray-300 uppercase mb-6 drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]"
        >
          YOUR CRAFT EXPERIENCE
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold uppercase mb-10 
                     text-white tracking-tight leading-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
          style={{
            fontFamily: '"Playfair Display", serif',
            letterSpacing: "-0.03em",
          }}
        >
          CURRY & HOPS
        </motion.h1>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-2 bg-gradient-to-r from-[#0f1c2e] via-[#142c46] to-[#1f3d5c]
                     rounded-full text-lg sm:text-xl md:text-2xl font-semibold uppercase px-10 py-4
                     text-white tracking-wider shadow-[0_8px_25px_rgba(0,0,0,0.6)]
                     hover:from-[#1a2b40] hover:via-[#203b55] hover:to-[#2c4c6e]
                     hover:scale-105 transition-all duration-300"
          style={{
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          BOOK A TABLE
        </motion.button>
      </div>
    </section>
  );
}
