"use client";

export default function MenuPdfButton() {
  return (
    <a
      href="/menu/pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center gap-3
        rounded-full
        border border-amber-400
        px-8 py-3
        text-amber-400
        text-sm uppercase tracking-widest
        font-semibold
        hover:bg-amber-400 hover:text-black
        transition-all duration-300
      "
    >
      📄 View Full Menu (PDF)
    </a>
  );
}
