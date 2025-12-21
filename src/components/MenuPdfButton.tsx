"use client";

export default function MenuPdfButton() {
  return (
    <div className="flex justify-center mt-24 pb-32">
      <a
        href="/menu/pdf"
        target="_blank"
        className="
          inline-flex items-center gap-3
          rounded-full border border-amber-500
          px-10 py-4
          text-amber-600 font-semibold
          hover:bg-amber-500 hover:text-white
          transition
        "
      >
        📄 View Full Menu (PDF)
      </a>
    </div>
  );
}
