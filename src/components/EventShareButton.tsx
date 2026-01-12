"use client";

import { ShareIcon } from "@heroicons/react/24/outline";

export default function EventShareButton({ 
  title, 
  text, 
  url 
}: { 
  title: string; 
  text: string; 
  url: string 
}) {
  const handleShare = async () => {
    // 1. Try Native Share (Mobile/Modern Browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      // 2. Fallback to Copy Clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="w-full py-4 border border-white/20 rounded-xl text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
    >
      <ShareIcon className="h-5 w-5" /> Share Event
    </button>
  );
}