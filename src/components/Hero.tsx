// === File: components/Hero.tsx ===
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  // === Side dish images ===
  const sideImages = [
    {
      src: "images/beercup.png",
      alt: "Beer Cup",
      className: "lg:top-[5%] lg:right-[-12%] lg:w-[26vw] xl:w-[22vw]",
    },
    {
      src: "images/top_wings.png",
      alt: "Chicken Wings",
      className: "lg:top-[8%] lg:left-[-8%] lg:w-[22vw] xl:w-[18vw]",
    },
    {
      src: "images/top_pepper_left.png",
      alt: "Pepper",
      className: "lg:bottom-[4%] lg:left-[-6%] lg:w-[20vw] xl:w-[16vw]",
    },
    {
      src: "images/top_burger-474x550.png",
      alt: "Burger",
      className: "lg:bottom-[-8%] lg:right-[-4%] lg:w-[24vw] xl:w-[20vw]",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[url('/images/wood-bg.jpg')] bg-cover bg-center flex flex-col items-center justify-end overflow-hidden z-0">

      {/* === Beer Mug Group === */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* === Beer Mug === */}
        <img
          src="/images/beermug.png"
          alt="Beer Mug"
          className="
            absolute z-10 
            bottom-[25%] left-1/2 -translate-x-1/2
            w-[200vw] sm:w-[70vw] md:w-[120vw] lg:w-[100vw]
            max-w-[900px]
            h-auto
          "
        />

        {/* === Foam === */}
        <motion.img
          src="/images/top_foam.png"
          alt="Foam"
          className="
            absolute z-15
            bottom-[32%] left-1/2 -translate-x-1/2
            w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[22vw]
            max-w-[600px]
            h-auto
          "
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        />
      </div>

      {/* === Overlay === */}
      <img
        src="/images/overlay.png"
        alt="Overlay"
        className="
          absolute z-30
          bottom-[30%] left-1/2 -translate-x-1/2
          w-[165vw] sm:w-[70vw] md:w-[80vw] lg:w-[50vw]
          max-w-[1200px]
          h-auto
        "
      />

      {/* === Side Dishes (visible only on lg+) === */}
      {sideImages.map((item, i) => (
        <motion.img
          key={i}
          src={item.src}
          alt={item.alt}
          className={`hidden lg:block absolute z-50 object-contain ${item.className}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.3, duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* === Text + Button === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-50 px-4">
        {/* Tagline */}
        <p className="italic text-base sm:text-xl md:text-2xl lg:text-3xl mb-3 font-bold uppercase tracking-wider drop-shadow-[3px_4px_10px_rgba(0,0,0,0.5)]">
          YOUR CRAFT EXPERIENCE
        </p>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase mb-6 drop-shadow-[6px_8px_16px_rgba(0,0,0,0.45)]">
          CURRY &amp; HOPS
        </h1>

        {/* Button */}
        <button className="mt-2 bg-gradient-to-r from-[#0f1c2e] via-[#142c46] to-[#1f3d5c] rounded-full text-sm sm:text-lg md:text-xl lg:text-2xl font-bold uppercase hover:bg-green-800 transition px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4 drop-shadow-[2px_4px_10px_rgba(0,0,0,0.4)]">
          BOOK A TABLE
        </button>
      </div>
    </section>
  );
}
