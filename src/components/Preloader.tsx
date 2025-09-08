'use client';

import { useState, useEffect, useRef } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOutContent, setFadeOutContent] = useState(false);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const minimumDuration = 1000;
    const startTime = Date.now();

    const openCurtains = () => {
      if (leftCurtainRef.current && rightCurtainRef.current) {
        leftCurtainRef.current.style.transform = 'translateX(-100%)';
        rightCurtainRef.current.style.transform = 'translateX(100%)';
      }
      setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 1000);
    };

    const trackProgress = () => {
      const images = document.getElementsByTagName('img');
      const totalAssets = images.length || 1;

      const checkProgress = () => {
        const elapsed = Date.now() - startTime;
        const loadedAssets = Array.from(images).filter(img => img.complete).length;
        const assetProgress = (loadedAssets / totalAssets) * 100;
        const timeProgress = (elapsed / minimumDuration) * 100;
        const newProgress = Math.min(Math.max(assetProgress, timeProgress), 100);

        if (isMounted) setProgress(prev => (newProgress > prev ? newProgress : prev));

        if (newProgress < 100 || elapsed < minimumDuration) {
          setTimeout(checkProgress, 100);
        } else {
          // Fade out text/loader instantly before curtains
          setFadeOutContent(true);
          setTimeout(openCurtains, 300); // small delay for fade to finish
        }
      };

      checkProgress();
    };

    if (document.readyState === 'complete') {
      trackProgress();
    } else {
      window.addEventListener('load', trackProgress, { once: true });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const text = "CURRY & HOPS";
  const letters = text.split('');

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-1000 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Content container */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-30 bg-[#0c0f0f]/90 transition-opacity duration-300 ${
          fadeOutContent ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Text Reveal */}
        <h1
          className="text-4xl md:text-6xl font-bold tracking-[0.15em] text-center mb-8 font-playfair italic"
          style={{
            transform: 'skewX(-6deg)', // subtle slant
          }}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0]"
              style={{
                animation: `fadeUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Circular Loader */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="stroke-[#555]/30"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="4"
            />
            <circle
              className="stroke-[url(#circleGradient)]"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="4"
              strokeDasharray="282.6"
              strokeDashoffset={282.6 * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#C0C0C0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[#FFD700] font-bold text-lg">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>

      {/* Curtains */}
      <div
        ref={leftCurtainRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#0c0f0f] z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
        style={{ transform: 'translateX(0)', willChange: 'transform' }}
      />
      <div
        ref={rightCurtainRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#0c0f0f] z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
        style={{ transform: 'translateX(0)', willChange: 'transform' }}
      />

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        .font-playfair {
          font-family: 'Playfair Display', serif !important;
        }
        @keyframes fadeUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
