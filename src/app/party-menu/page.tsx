"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { 
  ShareIcon, 
  DocumentTextIcon,
  SparklesIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600", "700"], subsets: ["latin"], style: ["italic", "normal"] });

// --- TYPES ---
type PartyPackage = {
  id: string;
  name: string;      
  type: "veg" | "non-veg" | "mixed";
  price: string;     
  tagline: string;   
  pdfUrl?: string;   
  features?: string[];
};

type PartyCategory = {
  id: string;
  title: string;     
  packages: PartyPackage[];
};

// --- HELPER: ENSURE PDF IS NOT OPTIMIZED (BLURRY) ---
const getCleanPdfUrl = (url?: string) => {
  if (!url) return "";
  // If it's a raw Cloudinary upload, return as is
  if (url.includes("/raw/upload")) return url;
  
  // If it's an image upload, REMOVE any transformations (f_auto, q_auto, etc.)
  // This Regex looks for the /upload/ segment and removes everything between /upload/ and the /v1234/ version number
  return url.replace(/\/upload\/.*\/v/, "/upload/v");
};

export default function PartyMenuPage() {
  const [categories, setCategories] = useState<PartyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null); // State for the PDF Modal

  // --- FETCH DATA ---
  useEffect(() => {
    setLoading(true);
    fetch("/api/party-menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
          console.error("Failed to fetch party menu:", err);
          setLoading(false);
      });
  }, []);

  const handleShare = (pkgName: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out the ${pkgName} at Curry & Hops!`,
        url: window.location.href,
      });
    } else {
      alert("Link copied to clipboard!");
    }
  };

  return (
    <main className={`min-h-screen bg-[#1a120e] text-[#eaddcf] ${inter.className} relative pb-20`}>
       {/* Background Texture */}
       <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
            src="https://codeco.com.sa/wp-content/uploads/2025/01/119672_17024483772786401365794cf968109.jpg"
            alt="Party Mood"
            fill
            className="object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className={`${playfair.className} text-5xl md:text-7xl text-[#C5A253] mb-4 tracking-wider`}>
            Party Menu
          </h1>
          <p className={`${cormorant.className} text-xl md:text-2xl text-stone-300 italic`}>
            Curated packages for your special moments
          </p>
        </div>
      </section>

      {/* --- MENU CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 -mt-10">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="w-12 h-12 border-4 border-[#C5A253] border-t-transparent rounded-full animate-spin"></div>
               <p className="text-[#C5A253] animate-pulse">Loading Packages...</p>
           </div>
        ) : categories.length === 0 ? (
            <div className="text-center py-20 text-stone-500">
                <p>No party packages available yet.</p>
            </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="mb-20">
              
              {/* CATEGORY TITLE */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A253]/50" />
                <h2 className={`text-[#C5A253] text-lg tracking-[0.3em] uppercase border border-[#C5A253]/30 px-6 py-2 rounded-full backdrop-blur-sm bg-[#1a120e]/80 ${inter.className}`}>
                  {category.title}
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A253]/50" />
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.packages.map((pkg, index) => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    index={index} 
                    onShare={handleShare} 
                    onViewPdf={(url) => setSelectedPdf(getCleanPdfUrl(url))} 
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- PDF MODAL (Opens inside website) --- */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-5xl h-[85vh] bg-[#261813] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-[#1a120e] border-b border-stone-800">
                <h3 className="text-stone-300 font-bold tracking-widest text-sm uppercase">Menu Preview</h3>
                <div className="flex items-center gap-4">
                  <a href={selectedPdf} target="_blank" rel="noopener noreferrer" className="text-[#C5A253] hover:underline text-xs flex items-center gap-1">
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" /> Open in New Tab
                  </a>
                  <button onClick={() => setSelectedPdf(null)} className="text-stone-400 hover:text-white transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer (Iframe) */}
              <div className="flex-1 bg-stone-900 relative">
                <iframe 
                  src={selectedPdf} 
                  className="absolute inset-0 w-full h-full border-0"
                  title="Menu PDF"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

// --- PACKAGE CARD COMPONENT ---
function PackageCard({ pkg, index, onShare, onViewPdf }: { 
  pkg: PartyPackage, 
  index: number, 
  onShare: (name: string) => void,
  onViewPdf: (url: string) => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-[#261813] border border-[#3e2723] rounded-2xl p-8 hover:border-[#C5A253]/50 transition-all duration-500 flex flex-col items-center text-center shadow-2xl hover:shadow-[#C5A253]/10"
    >
        {/* Glowing decorative effect */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#C5A253]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Veg/Non-Veg Indicator & Share */}
        <div className="w-full flex justify-between items-start mb-6 z-10">
            <div className={`w-3 h-3 rounded-full outline outline-2 outline-offset-2 ${pkg.type === 'veg' ? 'bg-green-500 outline-green-900' : 'bg-red-500 outline-red-900'}`} />
            
            <button 
                onClick={() => onShare(pkg.name)}
                className="flex items-center gap-2 text-xs text-[#C5A253] border border-[#C5A253]/20 px-3 py-1 rounded-full hover:bg-[#C5A253] hover:text-black transition-colors"
            >
                <ShareIcon className="w-3 h-3" /> Share
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 w-full flex flex-col items-center">
            <h3 className={`${playfair.className} text-2xl md:text-3xl font-medium text-[#f3e5d8] mb-1 group-hover:text-white transition-colors`}>
                {pkg.name.replace(" Package", "")} 
                <span className="block text-lg opacity-60 font-light font-sans mt-1">Package</span>
            </h3>

            <div className="my-6 relative">
                <span className={`${playfair.className} text-4xl md:text-5xl text-[#C5A253]`}>₹ {pkg.price}</span>
            </div>

            <p className={`${cormorant.className} text-xl text-stone-400 italic mb-8`}>
                {pkg.tagline}
            </p>
        </div>

        {/* CTA Button - Triggers PDF Modal */}
        <div className="w-full mt-auto z-10">
            {pkg.pdfUrl ? (
                <button 
                    onClick={() => onViewPdf(pkg.pdfUrl!)}
                    className="flex items-center justify-center gap-3 w-full py-4 border border-[#C5A253] text-[#C5A253] uppercase tracking-widest text-sm font-bold rounded-lg hover:bg-[#C5A253] hover:text-[#1a120e] transition-all duration-300 group-hover:tracking-[0.2em]"
                >
                    View Menu <DocumentTextIcon className="w-5 h-5" />
                </button>
            ) : (
                 <button 
                    disabled
                    className="w-full py-4 border border-stone-800 text-stone-600 uppercase tracking-widest text-sm font-bold rounded-lg cursor-not-allowed"
                >
                    Menu Coming Soon
                </button>
            )}
        </div>

        <SparklesIcon className="absolute bottom-4 right-4 w-24 h-24 text-[#C5A253] opacity-[0.03] rotate-12" />
    </motion.div>
  );
}