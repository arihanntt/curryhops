"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] overflow-hidden relative flex items-center justify-center px-6 pt-[clamp(6rem,12vh,10rem)] pb-24">

      {/* Animated spice particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 20}s`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  i % 3 === 0 ? "bg-amber-400" : i % 3 === 1 ? "bg-red-500" : "bg-orange-400"
                } blur-sm`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center max-w-3xl relative z-10">
        {/* Brand */}
        <p className="text-xs uppercase tracking-[0.5em] text-amber-500 mb-6 font-light opacity-80">
          Curry & Hops
        </p>

        {/* Floating Curry Bowl SVG */}
        <div className="mb-10 relative inline-block animate-bob">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Bowl */}
            <ellipse cx="90" cy="140" rx="70" ry="30" fill="#2d3748" />
            <ellipse cx="90" cy="135" rx="70" ry="28" fill="#4a5568" />
            <path
              d="M20 135 Q90 80 160 135 L160 150 Q90 170 20 150 Z"
              fill="#718096"
              opacity="0.9"
            />

            {/* Curry */}
            <ellipse cx="90" cy="125" rx="55" ry="22" fill="#f59e0b" />
            <ellipse cx="90" cy="122" rx="52" ry="20" fill="#f97316" />
            <circle cx="70" cy="115" r="8" fill="#fbbf24" opacity="0.8" />
            <circle cx="110" cy="118" r="10" fill="#f59e0b" opacity="0.9" />
            <circle cx="85" cy="130" r="6" fill="#dc2626" opacity="0.9" />

            {/* Steam */}
            <path
              d="M70 100 Q65 80 70 70"
              stroke="#fef3c7"
              strokeWidth="4"
              fill="none"
              opacity="0.6"
              className="animate-steam1"
            />
            <path
              d="M90 95 Q85 75 90 65"
              stroke="#fde68a"
              strokeWidth="4"
              fill="none"
              opacity="0.7"
              className="animate-steam2"
            />
            <path
              d="M110 100 Q115 80 110 70"
              stroke="#fef3c7"
              strokeWidth="4"
              fill="none"
              opacity="0.6"
              className="animate-steam3"
            />
          </svg>
        </div>

        {/* 404 */}
        <h1 className="font-playfair italic text-8xl md:text-9xl lg:text-[10rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-6 tracking-tight">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-5 font-light">
          Oops! This page got lost in the sauce.
        </h2>

        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          This page seems to have disappeared faster than{" "}
          <br className="hidden md:block" />
          "chef's special" on a Friday night.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-lg hover:from-amber-300 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-400/30"
          >
            <span className="flex items-center gap-2">
              Go Home
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>

          <Link
            href="/menu"
            className="px-8 py-4 rounded-full border-2 border-amber-400 text-amber-400 font-semibold text-lg hover:bg-amber-400 hover:text-black transition-all transform hover:scale-105 shadow-lg hover:shadow-amber-400/20"
          >
            Explore the Menu
          </Link>
        </div>

        {/* Fun footnote */}
        <p className="mt-16 text-sm text-gray-500 italic">
          Pro tip: Our Butter Chicken never gets lost.
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }

        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes steam1 {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-30px); }
        }

        @keyframes steam2 {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-35px); }
        }

        @keyframes steam3 {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-30px); }
        }

        .animate-float > div {
          animation: float linear infinite;
        }

        .animate-bob {
          animation: bob ease-in-out infinite 4s;
        }

        .animate-steam1 {
          animation: steam1 4s infinite ease-in-out;
        }

        .animate-steam2 {
          animation: steam2 4s infinite ease-in-out 0.5s;
        }

        .animate-steam3 {
          animation: steam3 4s infinite ease-in-out 1s;
        }
      `}</style>
    </main>
  );
}