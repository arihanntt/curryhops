"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"; // optional: install @heroicons/react if not already

export default function MenuPdfButton() {
  return (
    <a
      href="/menu/pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group
        inline-flex items-center gap-2.5
        rounded-full
        border border-amber-400/60
        bg-white/5 backdrop-blur-sm
        px-7 py-3.5
        text-amber-300
        text-sm md:text-base
        font-medium uppercase tracking-wider
        shadow-sm hover:shadow-amber-500/20
        hover:bg-amber-500/10 hover:border-amber-400
        hover:text-amber-200
        transition-all duration-300 ease-out
        active:scale-95
      `}
    >
      <ArrowDownTrayIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
      View Full Menu PDF
    </a>
  );
}