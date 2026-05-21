"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair  = Playfair_Display({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600"], subsets: ["latin"], style: ["italic", "normal"] });

type BannerData = {
  isActive:    boolean;
  badgeText:   string;
  title:       string;
  description: string;
  imageUrl:    string;
  buttonText:  string;
  buttonLink:  string;
};

/** Cloudinary transform helper — same as menu */
function getCloudinaryUrl(url: string, width: number) {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

const SESSION_KEY = "popup_banner_shown";

export default function PopupBanner() {
  const [banner, setBanner]       = useState<BannerData | null>(null);
  const [visible, setVisible]     = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  // Fetch banner
  useEffect(() => {
    setMounted(true);
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch {}

    fetch("/api/banner", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: BannerData) => {
        if (data?.isActive) {
          setBanner(data);
          setTimeout(() => setVisible(true), 800);
        }
      })
      .catch(() => {});
  }, []);

  if (!mounted || !banner || !visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        style={{ animation: "fadeIn 0.3s ease forwards" }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Centering container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Special announcement"
        className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
      >
        {/*
          MOBILE  : bottom-sheet style, slides up from the bottom, full width
          DESKTOP : centered card, max-w-3xl, side-by-side layout
        */}
        <div
          className="
            pointer-events-auto w-full
            sm:max-w-3xl sm:rounded-2xl
            rounded-t-2xl rounded-b-none
            overflow-hidden shadow-2xl
            flex flex-col sm:flex-row
            max-h-[85vh] sm:max-h-[90vh]
          "
          style={{ animation: "popupEnter 0.45s cubic-bezier(0.34,1.4,0.64,1) forwards" }}
        >
          {/* ── IMAGE ── 
              Mobile  : thin banner strip at top (h-36), image fills horizontally
              Desktop : left column (~45% width), full height of card
          */}
          <div className="relative w-full h-36 sm:h-auto sm:w-[42%] shrink-0 bg-stone-900">
            {banner.imageUrl ? (
              <>
                {!imgLoaded && <div className="absolute inset-0 bg-stone-800 animate-pulse" />}
                <Image
                  src={getCloudinaryUrl(banner.imageUrl, 600)}
                  alt={banner.title}
                  fill
                  className={`object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImgLoaded(true)}
                  sizes="(max-width: 640px) 100vw, 400px"
                  quality={75}
                  loading="lazy"
                  priority={false}
                />
                {/* Gradient: bottom-to-top on mobile so text stays readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/60 via-transparent to-transparent sm:bg-gradient-to-l sm:from-[#1a1410]/30 sm:via-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-800 via-amber-900/40 to-stone-900">
                <SparklesIcon className="w-14 h-14 text-amber-400/30" />
              </div>
            )}

            {/* Close button floated on top-right of image on mobile */}
            <button
              onClick={close}
              className="sm:hidden absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/40 text-white/80 hover:bg-black/60 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* ── CONTENT ── */}
          <div className="
            relative flex-1 bg-[#1a1410] text-[#f8f5f2]
            flex flex-col justify-center
            px-5 py-5
            sm:px-9 sm:py-10
            overflow-y-auto
          ">
            {/* Desktop-only close button */}
            <button
              onClick={close}
              className="hidden sm:block absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Decorative corner */}
            <div className="hidden sm:block absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl pointer-events-none" />

            {/* Badge */}
            {banner.badgeText && (
              <span className="inline-flex items-center gap-1.5 self-start mb-3 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                <SparklesIcon className="w-3 h-3" />
                {banner.badgeText}
              </span>
            )}

            {/* Title — smaller on mobile */}
            <h2 className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-medium leading-tight text-[#f8f5f2] mb-2 sm:mb-3`}>
              {banner.title}
            </h2>

            {/* Divider */}
            <div className="w-10 h-px bg-amber-500/50 mb-3 sm:mb-4" />

            {/* Description — 2 lines max on mobile, 4 on desktop */}
            {banner.description && (
              <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-stone-300 leading-relaxed italic mb-4 sm:mb-7 line-clamp-2 sm:line-clamp-4`}>
                {banner.description}
              </p>
            )}

            {/* CTA */}
            {banner.buttonText && banner.buttonLink && (
              <Link
                href={banner.buttonLink}
                onClick={close}
                className="
                  self-start inline-flex items-center gap-2
                  px-5 py-2.5 sm:px-6 sm:py-3
                  bg-amber-500 hover:bg-amber-400
                  text-stone-900 font-bold
                  text-xs sm:text-sm tracking-widest uppercase rounded-full
                  transition-all duration-300 shadow-lg shadow-amber-500/20
                  hover:-translate-y-0.5 active:scale-95
                "
              >
                {banner.buttonText}
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}

            {/* Dismiss — more compact on mobile */}
            <button
              onClick={close}
              className="mt-3 sm:mt-4 self-start text-[11px] sm:text-xs text-stone-500 hover:text-stone-300 underline underline-offset-2 transition-colors"
            >
              No thanks, maybe later
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popupEnter {
          /* Mobile: slides up from bottom */
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 640px) {
          @keyframes popupEnter {
            /* Desktop: scales in from center */
            from { opacity: 0; transform: scale(0.92) translateY(20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        }
      `}</style>
    </>
  );
}
