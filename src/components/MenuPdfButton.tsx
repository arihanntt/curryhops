"use client";
import { useEffect, useState } from "react";

export default function MenuPdfButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("/api/menu-pdf")
      .then((res) => res.json())
      .then((data) => setUrl(data?.url));
  }, []);

  if (!url) return null;

  return (
    <div className="flex justify-center mt-24">
      <a
        href={url}
        target="_blank"
        className="
          group relative inline-flex items-center gap-3
          rounded-full border border-amber-500
          px-10 py-4
          text-amber-600 font-semibold tracking-wide
          transition-all duration-300
          hover:bg-amber-500 hover:text-white
        "
      >
        <span className="text-lg">📄</span>
        <span>View Full Menu (PDF)</span>

        {/* glow */}
        <span
          className="
            absolute inset-0 rounded-full
            bg-amber-500 opacity-0 blur
            transition group-hover:opacity-30
          "
        />
      </a>
    </div>
  );
}
