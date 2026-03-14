'use client';

import Image from "next/image";
import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { 
  ChevronDownIcon, 
  XMarkIcon, 
  AdjustmentsHorizontalIcon, 
  ArrowUpIcon,
  PhotoIcon,
  CheckIcon,
  SparklesIcon,
  MagnifyingGlassIcon 
} from "@heroicons/react/24/outline";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600", "700"], subsets: ["latin"], style: ["italic", "normal"] });

// --- TYPES ---
type MenuVariant = {
  name: string;
  price: string;
};

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  tags?: string[];
  imageUrl?: string;
  available?: boolean; 
  isCustomizable?: boolean;
  variants?: MenuVariant[];
  showBottlePeg?: boolean;
  bottlePrice?: string;
  pegPrice?: string;
};

type MenuSectionType = {
  title: string;
  menuType: "food" | "bar";
  visible?: boolean;        
  imageUrl?: string;        
  items: MenuItem[];
};

// --- CONSTANTS ---
const TYPE_OPTIONS = ["All", "Veg", "Non-Veg", "Egg"] as const;
const DIETARY_OPTIONS = ["Spicy", "Kids", "Vegan", "Gluten Free", "Chef's Special"] as const;
type TypeFilter = typeof TYPE_OPTIONS[number];
type DietaryFilter = typeof DIETARY_OPTIONS[number];

/* ---------------- HELPER: CLOUDINARY OPTIMIZATION ---------------- */
/**
 * Injects Cloudinary transformation parameters to minimize bandwidth.
 * f_auto: Best format (WebP/AVIF)
 * q_auto: Smart compression
 * w_X: Resize to specific width
 */
const getCloudinaryUrl = (url: string | undefined, width: number) => {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

/* ---------------- HELPER: HIGHLIGHT TEXT ---------------- */
const highlightText = (text: string, query: string) => {
  if (!query || query.trim() === "") return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-amber-200 text-amber-900 rounded px-0.5 font-bold shadow-sm">
        {part}
      </span>
    ) : (
      part
    )
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

function MenuContent() {
  const [menu, setMenu] = useState<{ sections: MenuSectionType[] }>({ sections: [] });
  const [isLoading, setIsLoading] = useState(true); 
  const searchParams = useSearchParams();
  const [menuType, setMenuType] = useState<"food" | "bar">("food");
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([]);
  
  // UI States
  const [showFilters, setShowFilters] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Fetch Menu
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu", err);
        setIsLoading(false);
      });
  }, []);

  // Handle URL Param changes
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "food" || type === "bar") {
      setMenuType(type);
    }
  }, [searchParams]);

  // Reset filters
  useEffect(() => {
    setSelectedCategory("all");
    setSearchQuery("");
    setTypeFilter("All");
    setDietaryFilters([]);
  }, [menuType]);

  // --- FILTERING LOGIC ---
  const displayedSections = useMemo(() => {
    let activeSections = menu.sections.filter((section) => {
       const isCorrectType = section.menuType?.toLowerCase() === menuType;
       const isVisible = section.visible !== false;
       return isCorrectType && isVisible;
    });

    if (selectedCategory !== "all") {
      activeSections = activeSections.filter(s => s.title === selectedCategory);
    }

    return activeSections.map((section) => {
        const filteredItems = section.items.filter((item) => {
          // 1. Availability Check
          if (item.available === false) return false;

          // 2. Search Query Check
          if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            const matchName = item.name.toLowerCase().includes(query);
            const matchDesc = item.desc.toLowerCase().includes(query);
            if (!matchName && !matchDesc) return false;
          }

          // 3. Veg/Non-Veg Filter
          if (menuType === "food" && typeFilter !== "All") {
            const hasNonVeg = item.tags?.includes("Non-Veg");
            const hasEgg = item.tags?.includes("Egg");
            if (typeFilter === "Veg" && (hasNonVeg || hasEgg)) return false;
            if (typeFilter === "Non-Veg" && !hasNonVeg) return false;
            if (typeFilter === "Egg" && !hasEgg) return false;
          }

          // 4. Dietary Tags
          if (dietaryFilters.length > 0) {
            return dietaryFilters.some((tag) => item.tags?.includes(tag));
          }
          return true;
        });
        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [menu.sections, menuType, selectedCategory, typeFilter, dietaryFilters, searchQuery]);

  const availableCategories = useMemo(() => {
    return menu.sections
      .filter(s => s.menuType?.toLowerCase() === menuType && s.visible !== false)
      .map(s => s.title);
  }, [menu.sections, menuType]);

  const handleCategorySelect = (title: string) => {
    setSelectedCategory(title);
    if (title === 'all') return;
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) {
        const offset = 180; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleDietary = (tag: DietaryFilter) => {
    setDietaryFilters((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <main className={`min-h-screen bg-[#f8f5f2] text-stone-900 ${inter.className} relative`} itemScope itemType="https://schema.org/Menu">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply" />

      {/* --- HERO HEADER --- */}
      <section className="relative h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src={getCloudinaryUrl("/images/restaurant-dinner-black.webp", 1200)}
          alt="Curry & Hops Ambience"
          fill
          className="object-cover"
          priority
          sizes="100vw" 
          quality={75} 
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 w-full max-w-4xl pt-4">
          <h1 className={`${playfair.className} text-4xl md:text-6xl font-medium tracking-[0.2em] text-white/90 leading-tight mb-6`}>
            MENU
          </h1>
          <div className="flex justify-center">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex shadow-2xl ring-1 ring-white/10">
              <button
                onClick={() => setMenuType("food")}
                className={`px-6 md:px-10 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-widest transition-all duration-500 ease-out ${
                  menuType === "food" ? "bg-[#f8f5f2] text-stone-900 shadow-lg scale-105" : "text-white/60 hover:text-white"
                }`}
              >
                FOOD
              </button>
              <button
                onClick={() => setMenuType("bar")}
                className={`px-6 md:px-10 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-widest transition-all duration-500 ease-out ${
                  menuType === "bar" ? "bg-[#f8f5f2] text-stone-900 shadow-lg scale-105" : "text-white/60 hover:text-white"
                }`}
              >
                DRINKS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY CONTROL BAR --- */}
      <div className="sticky top-0 z-40 bg-[#f8f5f2]/95 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all py-3 md:py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-full h-11 pl-4 pr-10 bg-white rounded-lg border border-stone-200 text-stone-700 font-serif font-medium text-base shadow-sm focus:ring-1 focus:ring-stone-400 focus:border-stone-400 appearance-none cursor-pointer truncate"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((title) => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>

          <div className="flex gap-3">
             <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-white rounded-lg border border-stone-200 text-stone-700 text-sm shadow-sm focus:ring-1 focus:ring-stone-400 focus:border-stone-400 outline-none"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                 {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                )}
             </div>

            {menuType === "food" && (
              <button
                onClick={() => setShowFilters(true)}
                className={`h-11 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all shadow-sm ${
                  typeFilter !== "All" || dietaryFilters.length > 0 ? "bg-stone-800 border-stone-800 text-white" : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Filters</span>
                {(typeFilter !== "All" || dietaryFilters.length > 0) && (
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 min-w-[1.25rem] text-center">
                    {(typeFilter !== "All" ? 1 : 0) + dietaryFilters.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- MENU LIST --- */}
      <div className="max-w-6xl mx-auto px-3 md:px-6 py-8 md:py-12 space-y-16 md:space-y-24 min-h-[40vh]">
        {isLoading ? (
           <LoadingSpinner />
        ) : displayedSections.length > 0 ? (
          displayedSections.map((section, idx) => {
            const slug = section.title.toLowerCase().replace(/\s+/g, "-");
            const bgImage = section.imageUrl || "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

            return (
              <section key={idx} id={slug} className="scroll-mt-48" itemProp="hasMenuSection" itemScope itemType="https://schema.org/MenuSection">
                <div className="relative h-40 md:h-64 rounded-t-2xl overflow-hidden shadow-md z-0">
                  <Image 
                    src={getCloudinaryUrl(bgImage, 1000)} 
                    alt={`${section.title} at Curry & Hops`} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 itemProp="name" className={`${playfair.className} text-3xl md:text-5xl text-[#f8f5f2] font-medium tracking-wide capitalize drop-shadow-lg text-center px-4`}>
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="relative z-10 -mt-6 mx-1 md:mx-6 bg-[#fffbf7] rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-stone-100 pb-6 md:pb-8 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] overflow-hidden">
                   <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-60" />
                   <div className="grid md:grid-cols-2 gap-px bg-stone-200/40"> 
                      {section.items.map((item, i) => (
                        <div key={i} className="bg-[#fffbf7] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] p-4 md:p-8 relative group" itemProp="hasMenuItem" itemScope itemType="https://schema.org/MenuItem">
                           <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                           <MenuItemCard 
                             item={item} 
                             menuType={menuType} 
                             searchQuery={searchQuery} 
                             onImageClick={setExpandedImage} 
                             sectionTitle={section.title} /* 👈 ADD THIS LINE */
                           />
                        </div>
                      ))}
                   </div>
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                 <MagnifyingGlassIcon className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-bold text-stone-600">No dishes found.</h3>
            <p className="text-stone-500 mt-2 text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 p-3 bg-stone-900 text-[#f8f5f2] rounded-full shadow-2xl z-30 opacity-80 hover:opacity-100 transition-opacity">
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      {/* --- MODALS --- */}
      {expandedImage && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={() => setExpandedImage(null)}>
          <button className="absolute top-4 right-4 text-white p-2"><XMarkIcon className="w-8 h-8" /></button>
          <div className="relative w-full max-w-4xl h-[70vh]">
            <Image src={getCloudinaryUrl(expandedImage, 1200)} alt="Detail" fill className="object-contain" quality={85} sizes="(max-width: 768px) 100vw, 1200px" priority />
          </div>
        </div>
      )}

      {showFilters && (
        <div className="fixed inset-0 bg-black/60 z-[55] flex justify-end">
          <div className="w-full max-w-md bg-[#fffbf7] h-full shadow-2xl p-6 flex flex-col animate-slide-in-right border-l border-stone-200">
            <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
              <h3 className={`${playfair.className} text-3xl font-bold text-stone-900`}>Filter Menu</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-stone-200 rounded-full transition text-stone-500"><XMarkIcon className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 space-y-10 overflow-y-auto px-1">
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block pl-1">Category</label>
                <div className="grid grid-cols-2 gap-3">
                  {TYPE_OPTIONS.map(opt => (
                    <button key={opt} onClick={() => setTypeFilter(opt)} className={`relative overflow-hidden px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${typeFilter === opt ? "bg-amber-500 border-amber-500 text-white shadow-md scale-[1.02]" : "bg-white border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700"}`}>
                      {opt}{typeFilter === opt && <div className="absolute top-0 right-0 p-1"><CheckIcon className="w-3 h-3" /></div>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block pl-1">Dietary Tags</label>
                <div className="flex flex-col gap-3">
                  {DIETARY_OPTIONS.map(opt => {
                    const isActive = dietaryFilters.includes(opt);
                    return (
                      <label key={opt} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${isActive ? "bg-amber-50 border-amber-500 shadow-sm" : "bg-white border-stone-200 hover:border-stone-300"}`}>
                        <span className={`font-bold text-base ${isActive ? "text-amber-900" : "text-stone-600"}`}>{opt}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? "bg-amber-500 border-amber-500" : "border-stone-300 bg-white"}`}>
                          {isActive && <CheckIcon className="w-4 h-4 text-white" />}
                        </div>
                        <input type="checkbox" checked={isActive} onChange={() => toggleDietary(opt)} className="hidden" />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-stone-200 flex gap-4 mt-auto">
               <button onClick={() => { setTypeFilter("All"); setDietaryFilters([]); }} className="flex-1 py-4 text-stone-500 font-bold border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors uppercase text-xs tracking-widest">Reset</button>
               <button onClick={() => setShowFilters(false)} className="flex-[2] py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-lg uppercase text-xs tracking-widest">Show Results</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- CIRCLE SPINNER COMPONENT ---------------- */

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 min-h-[50vh]">
      <div className="relative w-16 h-16">
         <div className="absolute inset-0 border-4 border-stone-200 rounded-full"></div>
         <div className="absolute inset-0 border-4 border-stone-800 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className={`${cormorant.className} text-xl text-stone-600 italic mt-6 animate-pulse`}>Preparing the menu...</p>
    </div>
  );
}

/* ---------------- ITEM CARD COMPONENT ---------------- */

function MenuItemCard({ item, menuType, searchQuery, onImageClick, sectionTitle }: { item: MenuItem, menuType: string, searchQuery: string, onImageClick: (url: string) => void, sectionTitle: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const effectiveTags = [...(item.tags || [])];
  const hasNonVegOrEgg = effectiveTags.some(t => t === "Non-Veg" || t === "Egg");
  if (menuType === "food" && !hasNonVegOrEgg && !effectiveTags.includes("Veg")) effectiveTags.push("Veg");
// 👇 ADD THESE 3 LINES FOR FRESH BEER LOGIC
  const isFreshBeer = sectionTitle.toLowerCase() === "fresh beers" || sectionTitle.toLowerCase() === "fresh beer";
  const smallLabel = isFreshBeer ? "Pint" : "30ml";
  const largeLabel = isFreshBeer ? "Mug" : "Btl";
  
  const getIcon = (tag: string) => {
    if (tag === "Veg") return <div className="w-3 h-3 border border-green-700 p-[1px] flex items-center justify-center"><div className="w-full h-full bg-green-700 rounded-full" /></div>;
    if (tag === "Non-Veg") return <div className="w-3 h-3 border border-red-700 p-[1px] flex items-center justify-center"><div className="w-full h-full bg-red-700 rounded-full" /></div>;
    if (tag === "Egg") return <div className="w-3 h-3 border border-yellow-600 p-[1px] flex items-center justify-center"><div className="w-full h-full bg-yellow-600 rounded-full" /></div>;
    return null;
  };

  return (
    <div className="flex flex-row gap-4 items-start w-full relative">
      {item.imageUrl && (
        <div className="shrink-0 w-20 h-20 md:w-28 md:h-28 relative rounded-lg overflow-hidden border border-stone-200 cursor-pointer group/img shadow-md" onClick={() => onImageClick(item.imageUrl!)}>
          <Image 
            src={getCloudinaryUrl(item.imageUrl, 300)} 
            alt={`${item.name} at Curry & Hops`} 
            fill 
            className="object-cover transition-transform duration-700 group-hover/img:scale-110" 
            sizes="(max-width: 768px) 96px, 128px" 
            quality={65} 
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20"><PhotoIcon className="w-5 h-5 text-white drop-shadow-md" /></div>
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 itemProp="name" className={`${playfair.className} text-lg md:text-2xl font-bold text-stone-900 leading-tight break-words pr-2`}>{highlightText(item.name, searchQuery)}</h3>
          <div className="text-right shrink-0" itemProp="offers" itemScope itemType="https://schema.org/Offer">
  <meta itemProp="priceCurrency" content="INR" />
  {menuType === "bar" && item.showBottlePeg ? (
    <div className="flex flex-col items-end gap-0.5">
      {/* Pint / Small Unit Row */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{smallLabel}</span>
        <span className="text-base md:text-lg font-bold text-stone-900">
          ₹<span itemProp="price">
            {/* 🔥 Logic: Split the string at '(' and take the first part, removing spaces */}
            {item.pegPrice?.toString().split('(')[0].trim()}
          </span>
        </span>
      </div>

      {/* Mug / Large Unit Row */}
      {item.bottlePrice && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{largeLabel}</span>
          <span className="text-sm md:text-base text-stone-600 font-medium">
            ₹{item.bottlePrice?.toString().split('(')[0].trim()}
          </span>
        </div>
      )}
    </div>
  ) : (
    <span className="text-base md:text-xl font-bold text-stone-900">
      ₹<span itemProp="price">{item.price}</span>
    </span>
  )}
</div>
        </div>
        {menuType === "food" && (
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {effectiveTags.map(tag => (
              <div key={tag} className="flex items-center gap-1">{getIcon(tag)}<span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wide ${tag === "Spicy" ? "text-red-600" : tag === "Vegan" ? "text-green-600" : tag === "Kids" ? "text-sky-500" : tag === "Gluten Free" ? "text-emerald-600" : tag === "Chef's Special" ? "text-purple-600" : "text-stone-400"}`}>{tag}</span></div>
            ))}
          </div>
        )}
        <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer group/desc">
          <p itemProp="description" className={`${cormorant.className} text-base md:text-lg text-stone-600 leading-snug italic opacity-90 transition-all ${isExpanded ? '' : 'line-clamp-3'}`}>{item.desc}</p>
          {item.desc.length > 80 && !isExpanded && <span className="text-[10px] uppercase font-bold text-amber-600 mt-1 inline-block opacity-0 group-hover/desc:opacity-100 transition-opacity md:opacity-0">Read More</span>}
        </div>
        {item.isCustomizable && item.variants && item.variants.length > 0 && (
           <div className="mt-3">
             {!showVariants ? (
                <button onClick={(e) => { e.stopPropagation(); setShowVariants(true); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white text-[10px] uppercase font-bold tracking-widest rounded-full hover:bg-stone-700 transition-colors shadow-sm"><SparklesIcon className="w-3 h-3" />Customize It</button>
             ) : (
                <div className="bg-white border border-stone-200 rounded-lg p-3 shadow-inner animate-fade-in mt-1">
                   <div className="flex justify-between items-center mb-2 border-b border-stone-100 pb-1"><span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Add-ons</span><button onClick={(e) => {e.stopPropagation(); setShowVariants(false)}} className="text-stone-400 hover:text-stone-900"><XMarkIcon className="w-3 h-3"/></button></div>
                   <div className="space-y-1.5">{item.variants.map((v, idx) => (<div key={idx} className="flex justify-between items-center text-sm font-medium text-stone-700"><span>{v.name}</span><span className="text-stone-500 font-mono text-xs">+₹{v.price}</span></div>))}</div>
                </div>
             )}
           </div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[#faf9f6]"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-stone-800"></div></div>}>
      <MenuContent />
    </Suspense>
  );
}