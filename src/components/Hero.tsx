// === File: components/Hero.tsx ===
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // === Side dish images ===
  const sideImages = [
    { src: "images/beercup.png", alt: "Burger", className: "right-300 top-1 w-[500px] h-[500px]" },
    { src: "images/top_wings.png", alt: "Chicken Wings", className: "left-300 top-24 w-[500px] h-[400px]" },
    { src: "images/top_pepper_left.png", alt: "Shrimp", className: "left-280 bottom-1 w-[400px] h-[300px]" },
    { src: "images/top_burger-474x550.png", alt: "Mussels", className: "right-330 bottom-- w-[300px] h-[400px]" },
  ];

  // === Simple ripple effect ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples: { x: number; y: number; radius: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.forEach((ripple, index) => {
        ripple.radius += 1.2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255,255,255,${1 - ripple.radius / 100})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (ripple.radius > 100) ripples.splice(index, 1);
      });
      requestAnimationFrame(draw);
    };
    draw();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, radius: 0 });
    };

    canvas.addEventListener("mousemove", handleMove);
    return () => canvas.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[url('/images/wood-bg.jpg')] bg-cover bg-center flex flex-col items-center justify-end overflow-hidden z-0">

  {/* === Table at Base === */}
 

  {/* === Beer Mug Group (responsive wrapper) === */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
   {/* Mug */}
<img
  src="/images/beermug.png"
  alt="Beer Mug"
  className="
    absolute z-10 
    w-[600vw] max-w-[2000px]    /* default (mobile/tablet) */
    md:w-[300vw] md:max-w-[1500px]  /* from md and above (PC) */
    h-auto
  "
/>

    <motion.img
  src="/images/top_foam.png"
  alt="Foam"
  className="
    absolute z-20 
    w-[300vw] max-w-[700px]   /* default (mobile/tablet) */
    md:w-[40vw] md:max-w-[550px]  /* from md and above */
    h-auto
  "
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
/>


    {/* Ripple */}
    <canvas
      ref={canvasRef}
      className="absolute z-30 mix-blend-screen"
      style={{ width: "20vw", height: "20vw" }}
      width={300}
      height={300}
    />
  </div>

{/* === Overlay === */}
<img
  src="/images/overlay.png"
  alt="Overlay"
  className="
    absolute 
    bottom-2 left-1/2 -translate-x-1/2   /* default (mobile/tablet) */
    w-[200vw] max-w-[800px]

    md:bottom-6 md:left-1/2 md:-translate-x-1/2 /* PC overrides */
    md:w-[150vw] md:max-w-[1400px]
    h-auto
  "
/>



  {/* === Side Dishes (only on md+) === */}
  {sideImages.map((item, i) => (
  <motion.img
    key={i}
    src={item.src}
    alt={item.alt}
    className={`
      hidden md:block absolute z-50 object-contain
      ${i === 0 ? "top-[10%] right-[-15%] w-[49vw] max-w-[500px]" : ""}
      ${i === 1 ? "top-[9%] left-[-6%] w-[25vw] max-w-[350px]" : ""}
      ${i === 2 ? "bottom-[2%] left-[-4%] w-[22vw] max-w-[320px]" : ""}
      ${i === 3 ? "bottom-[-10%] right-[-4%] w-[30vw] max-w-[300px]" : ""}
    `}
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: i * 0.3, duration: 0.6, ease: "easeOut" }}
  />
))}

  {/* === Text + Button === */}
 {/* === Text + Button (centered middle) === */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-50 px-4">
  {/* Tagline */}
  <p className="italic text-xl sm:text-2xl md:text-3xl mb-4 font-bold uppercase tracking-wider drop-shadow-[3px_4px_10px_rgba(0,0,0,0.5)]">
    YOUR CRAFT EXPERIENCE
  </p>

  {/* Heading */}
  <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase mb-8 drop-shadow-[6px_8px_16px_rgba(0,0,0,0.45)]">
    CURRY &amp; HOPS
  </h1>

  {/* Button */}
  <button className="mt-2 bg-green-700 rounded-full text-lg sm:text-xl md:text-2xl font-bold uppercase hover:bg-green-800 transition px-8 py-4 drop-shadow-[2px_4px_10px_rgba(0,0,0,0.4)]">
    BOOK A TABLE
  </button>
</div>

</section>

  );
}
