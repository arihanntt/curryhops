'use client';

import Image from "next/image";
import { useEffect, useState, Suspense, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MenuPdfButton from "@/components/MenuPdfButton";
import MenuSchema from "@/components/MenuSchema";
import { 
  ChevronDownIcon, 
  XMarkIcon, 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon,
  ArrowUpIcon,
  PhotoIcon,
  CheckIcon
} from "@heroicons/react/24/outline";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600", "700"], subsets: ["latin"], style: ["italic", "normal"] });

// --- TYPES ---
type MenuItem = {
  name: string;
  desc: string;
  price: string;
  tags?: string[];
  imageUrl?: string;
  showBottlePeg?: boolean;
  bottlePrice?: string;
  pegPrice?: string;
};

type MenuSectionType = {
  title: string;
  items: MenuItem[];
};

// --- DATA ---
const FOOD_CATEGORIES = [
  "quick bites", "salad", "appetizers", "pizza", "pasta", "main course", "biryani", 
  "breads", "rice and noodles", "dessert", "sushi", "dim sum"
];
const BAR_CATEGORIES = [
  "signature cocktails", "classics", "our liit's", "beer cocktails", "coffee", "hot cocktails", 
  "rum", "gin", "vodka", "tequila", "indian whisky", "indian single malts", "scotch", 
  "japanese whisky", "rye/bourbon whiskeys", "canadian / irish whisky", "cognac/brandy", 
  "liquers", "aperitif", "red wine", "rose wine & sparkling wine", "white wine", 
  "sangria", "champagne", "shots & shooters", "fresh juices", "soft drinks"
];

const CATEGORY_BACKGROUNDS: Record<string, string> = {
  "quick bites": "https://images.pexels.com/photos/3023476/pexels-photo-3023476.jpeg",
  "salad": "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg",
  "appetizers": "https://images.pexels.com/photos/33430558/pexels-photo-33430558.jpeg",
  "pizza": "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg",
  "pasta": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
  "main course": "https://images.pexels.com/photos/29850004/pexels-photo-29850004.jpeg",
  "biryani": "https://images.pexels.com/photos/4224305/pexels-photo-4224305.jpeg",
  "breads": "/images/breads-bg.jpg",
  "rice and noodles": "/images/rice-noodles-bg.jpg",
  "dessert": "https://images.pexels.com/photos/13215194/pexels-photo-13215194.jpeg",
  "sushi": "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "dim sum": "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "signature cocktails": "https://images.pexels.com/photos/19051904/pexels-photo-19051904.jpeg",
  "classics": "https://images.pexels.com/photos/2531186/pexels-photo-2531186.jpeg",
  "our liit's": "https://images.pexels.com/photos/12208200/pexels-photo-12208200.jpeg",
  "beer cocktails": "https://images.pexels.com/photos/7377026/pexels-photo-7377026.jpeg",
  "coffee": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
  "hot cocktails": "https://images.pexels.com/photos/35602242/pexels-photo-35602242.jpeg",
  "rum": "https://images.pexels.com/photos/2466319/pexels-photo-2466319.jpeg",
  "gin": "https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg",
  "vodka": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
  "tequila": "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
  "indian whisky": "https://images.pexels.com/photos/8878975/pexels-photo-8878975.jpeg",
  "indian single malts": "https://images.pexels.com/photos/16849854/pexels-photo-16849854.jpeg",
  "scotch": "https://images.pexels.com/photos/2796105/pexels-photo-2796105.jpeg",
  "japanese whisky": "https://images.pexels.com/photos/372959/pexels-photo-372959.jpeg",
  "rye/bourbon whiskeys": "/images/rye-bourbon-bg.jpg",
  "canadian / irish whisky": "https://images.pexels.com/photos/14385403/pexels-photo-14385403.jpeg",
  "cognac/brandy": "/images/cognac-brandy-bg.jpg",
  "liquers": "https://images.pexels.com/photos/34627168/pexels-photo-34627168.jpeg",
  "aperitif": "https://images.pexels.com/photos/35547817/pexels-photo-35547817.jpeg",
  "red wine": "https://images.pexels.com/photos/66636/pexels-photo-66636.jpeg",
  "rose wine & sparkling wine": "/images/rose-sparkling-bg.jpg",
  "white wine": "https://images.pexels.com/photos/2584451/pexels-photo-2584451.jpeg",
  "sangria": "https://images.pexels.com/photos/7376927/pexels-photo-7376927.jpeg",
  "champagne": "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
  "shots & shooters": "https://images.pexels.com/photos/1304475/pexels-photo-1304475.jpeg",
  "fresh juices": "https://images.pexels.com/photos/8215110/pexels-photo-8215110.jpeg",
  "soft drinks": "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg",
};

const TYPE_OPTIONS = ["All", "Veg", "Non-Veg", "Egg"] as const;
const DIETARY_OPTIONS = ["Spicy", "Kids", "Vegan"] as const;
type TypeFilter = typeof TYPE_OPTIONS[number];
type DietaryFilter = typeof DIETARY_OPTIONS[number];

const TAG_ICONS: Record<string, string> = {
  "Veg": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png",
  "Non-Veg": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png",
  "Egg": "https://cdn-icons-png.flaticon.com/512/1046/1046774.png", 
  "Spicy": "https://cdn-icons-png.flaticon.com/512/1685/1685860.png",
  "Kids": "https://cdn-icons-png.flaticon.com/512/2919/2919573.png",
  "Vegan": "https://cdn-icons-png.flaticon.com/512/5767/5767292.png",
};

/* ---------------- MAIN COMPONENT ---------------- */

function MenuContent() {
  const [menu, setMenu] = useState<{ sections: MenuSectionType[] }>({ sections: [] });
  const searchParams = useSearchParams();
  const [menuType, setMenuType] = useState<"food" | "bar">("food");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Initialize
  useEffect(() => {
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  // Sync URL params to State on load
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "food" || type === "bar") {
      setMenuType(type);
    }
  }, [searchParams]);

  // Reset filters when switching main menu type
  useEffect(() => {
    setSelectedCategory("all");
    setTypeFilter("All");
    setDietaryFilters([]);
  }, [menuType]);

  // --- MEMOIZED FILTERING LOGIC ---
  const filteredSections = useMemo(() => {
    return menu.sections.filter((section) => {
      const title = section.title.toLowerCase();
      return menuType === "food" 
        ? FOOD_CATEGORIES.some(c => title.includes(c)) 
        : BAR_CATEGORIES.some(c => title.includes(c));
    });
  }, [menu.sections, menuType]);

  const displayedSections = useMemo(() => {
    return filteredSections
      .filter((section) =>
        selectedCategory === "all" ? true : section.title.toLowerCase() === selectedCategory.toLowerCase()
      )
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          if (menuType === "food" && typeFilter !== "All") {
            const hasNonVeg = item.tags?.includes("Non-Veg");
            const hasEgg = item.tags?.includes("Egg");
            if (typeFilter === "Veg" && (hasNonVeg || hasEgg)) return false;
            if (typeFilter === "Non-Veg" && !hasNonVeg) return false;
            if (typeFilter === "Egg" && !hasEgg) return false;
          }
          if (dietaryFilters.length > 0) {
            return dietaryFilters.some((tag) => item.tags?.includes(tag));
          }
          return true;
        });
        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  }, [filteredSections, selectedCategory, typeFilter, dietaryFilters, menuType]);

  // Scroll Handling
  const handleCategorySelect = (title: string) => {
    setSelectedCategory(title);
    if (title === 'all') return;
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) {
        const offset = 120;
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
    <main className={`min-h-screen bg-[#f8f5f2] text-stone-900 ${inter.className} relative`}>
      
      {/* Global Grain Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[5] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply" />

      {filteredSections.length > 0 && <MenuSchema sections={filteredSections as any} />}

      {/* --- HERO HEADER --- */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/restaurant-dinner-black.webp"
          alt="Ambience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 w-full max-w-4xl pt-6 md:pt-10
">
          <h1 className={`${playfair.className} text-5xl md:text-7xl font-medium tracking-[0.2em] text-white/90 leading-tight mb-8`}>
            MENU
          </h1>
          
          <div className="flex justify-center">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex shadow-2xl ring-1 ring-white/10">
              <button
                onClick={() => setMenuType("food")}
                className={`px-8 md:px-10 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-500 ease-out ${
                  menuType === "food" 
                    ? "bg-[#f8f5f2] text-stone-900 shadow-lg scale-105" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                FOOD
              </button>
              <button
                onClick={() => setMenuType("bar")}
                className={`px-8 md:px-10 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-500 ease-out ${
                  menuType === "bar" 
                    ? "bg-[#f8f5f2] text-stone-900 shadow-lg scale-105" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                DRINKS
              </button>
            </div>
          </div>
          
          <div className="mt-8 opacity-80 hover:opacity-100 transition-opacity">
             <MenuPdfButton />
          </div>
        </div>
      </section>

      {/* --- STICKY CONTROL BAR --- */}
      <div className="sticky top-0 z-40 bg-[#f8f5f2]/95 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all py-3 md:py-4">
        <div className="max-w-6xl mx-auto px-4 flex gap-3 md:gap-4">
          
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-full h-12 pl-4 pr-10 bg-white rounded-lg border border-stone-200 text-stone-700 font-serif font-medium text-base md:text-lg shadow-sm focus:ring-1 focus:ring-stone-400 focus:border-stone-400 appearance-none cursor-pointer truncate"
            >
              <option value="all">All Categories</option>
              {filteredSections.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
          </div>

          {menuType === "food" && (
            <button
              onClick={() => setShowFilters(true)}
              className={`h-12 px-4 md:px-6 rounded-lg border flex items-center justify-center gap-2 transition-all shadow-sm ${
                typeFilter !== "All" || dietaryFilters.length > 0
                  ? "bg-stone-800 border-stone-800 text-white"
                  : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
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

      {/* --- MENU LIST --- */}
      <div className="max-w-6xl mx-auto px-3 md:px-6 py-8 md:py-12 space-y-16 md:space-y-24">
        {displayedSections.length > 0 ? (
          displayedSections.map((section, idx) => {
            const slug = section.title.toLowerCase().replace(/\s+/g, "-");
            const bgImage = CATEGORY_BACKGROUNDS[section.title.toLowerCase()] || `/images/${slug}-bg.jpg`;

            return (
              <section key={idx} id={slug} className="scroll-mt-40">
                {/* Header */}
                <div className="relative h-40 md:h-64 rounded-t-2xl overflow-hidden shadow-md z-0">
                  <Image src={bgImage} alt={section.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className={`${playfair.className} text-3xl md:text-5xl text-[#f8f5f2] font-medium tracking-wide capitalize drop-shadow-lg text-center px-4`}>
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Card Container */}
                <div className="relative z-10 -mt-6 mx-1 md:mx-6 bg-[#fffbf7] rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-stone-100 pb-6 md:pb-8 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] overflow-hidden">
                   <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-60" />
                   
                   {/* Items Grid */}
                   <div className="grid md:grid-cols-2 gap-px bg-stone-200/40"> 
                      {section.items.map((item, i) => (
                        <div key={i} className="bg-[#fffbf7] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] p-4 md:p-8 relative group">
                           {/* Decorative Corner */}
                           <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                           
                           <MenuItemCard 
                             item={item} 
                             menuType={menuType} 
                             onImageClick={setExpandedImage} 
                           />
                        </div>
                      ))}
                   </div>
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-500">No items found</h3>
          </div>
        )}
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-stone-900 text-[#f8f5f2] rounded-full shadow-2xl z-30 opacity-80 hover:opacity-100 transition-opacity"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>

      {/* --- MODALS --- */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setExpandedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2">
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh]">
            <Image src={expandedImage} alt="Detail" fill className="object-contain" quality={100} />
          </div>
        </div>
      )}

      {showFilters && (
        <div className="fixed inset-0 bg-black/60 z-[55] flex justify-end">
          <div className="w-full max-w-md bg-[#fffbf7] h-full shadow-2xl p-6 flex flex-col animate-slide-in-right border-l border-stone-200">
            <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
              <h3 className={`${playfair.className} text-3xl font-bold text-stone-900`}>Filter Menu</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-stone-200 rounded-full transition text-stone-500">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Aesthetic Filter Content */}
            <div className="flex-1 space-y-10 overflow-y-auto px-1">
              {/* Type Section */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block pl-1">Category</label>
                <div className="grid grid-cols-2 gap-3">
                  {TYPE_OPTIONS.map(opt => (
                    <button 
                      key={opt} 
                      onClick={() => setTypeFilter(opt)} 
                      className={`relative overflow-hidden px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                        typeFilter === opt 
                          ? "bg-amber-500 border-amber-500 text-white shadow-md scale-[1.02]" 
                          : "bg-white border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-700"
                      }`}
                    >
                      {opt}
                      {typeFilter === opt && <div className="absolute top-0 right-0 p-1"><CheckIcon className="w-3 h-3" /></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences Section */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block pl-1">Dietary Tags</label>
                <div className="flex flex-col gap-3">
                  {DIETARY_OPTIONS.map(opt => {
                    const isActive = dietaryFilters.includes(opt);
                    return (
                      <label 
                        key={opt} 
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                          isActive 
                            ? "bg-amber-50 border-amber-500 shadow-sm" 
                            : "bg-white border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <span className={`font-bold text-base ${isActive ? "text-amber-900" : "text-stone-600"}`}>
                          {opt}
                        </span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isActive ? "bg-amber-500 border-amber-500" : "border-stone-300 bg-white"
                        }`}>
                          {isActive && <CheckIcon className="w-4 h-4 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          checked={isActive} 
                          onChange={() => toggleDietary(opt)} 
                          className="hidden" 
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex gap-4 mt-auto">
               <button 
                 onClick={() => { setTypeFilter("All"); setDietaryFilters([]); }} 
                 className="flex-1 py-4 text-stone-500 font-bold border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors uppercase text-xs tracking-widest"
               >
                 Reset
               </button>
               <button 
                 onClick={() => setShowFilters(false)} 
                 className="flex-[2] py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-lg uppercase text-xs tracking-widest"
               >
                 Show Results
               </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- ITEM CARD COMPONENT (WITH EXPANDABLE DESCRIPTION) ---------------- */

function MenuItemCard({ item, menuType, onImageClick }: { item: MenuItem, menuType: string, onImageClick: (url: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const effectiveTags = [...(item.tags || [])];
  const hasNonVegOrEgg = effectiveTags.some(t => t === "Non-Veg" || t === "Egg");
  if (menuType === "food" && !hasNonVegOrEgg && !effectiveTags.includes("Veg")) {
    effectiveTags.push("Veg");
  }

  const getIcon = (tag: string) => {
    if (tag === "Veg") return <div className="w-3 h-3 border border-green-700 p-[1px] flex items-center justify-center"><div className="w-full h-full bg-green-700 rounded-full" /></div>;
    if (tag === "Non-Veg") return <div className="w-3 h-3 border border-red-700 p-[1px] flex items-center justify-center"><div className="w-full h-full bg-red-700 rounded-full" /></div>;
    if (tag === "Egg") return <div className="w-3 h-3 border border-yellow-600 p-[1px] flex items-center justify-center"><div className="w-full h-full bg-yellow-600 rounded-full" /></div>;
    return null;
  };

  return (
    <div className="flex flex-row gap-4 items-start w-full">
      
      {/* 1. Left: Image */}
      {item.imageUrl && (
        <div 
          className="shrink-0 w-20 h-20 md:w-28 md:h-28 relative cursor-pointer group/img shadow-md rounded-lg overflow-hidden border border-stone-200"
          onClick={() => onImageClick(item.imageUrl!)}
        >
          <Image 
            src={item.imageUrl} 
            alt={item.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover/img:scale-110" 
          />
          {/* Magnify Icon Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/20">
             <PhotoIcon className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </div>
      )}

      {/* 2. Middle: Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        
        {/* Title + Price Row */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className={`${playfair.className} text-lg md:text-2xl font-bold text-stone-900 leading-tight break-words pr-2`}>
            {item.name}
          </h3>
          
          {/* Price (Fixed Right - With Bottle/Peg Logic) */}
          <div className="text-right shrink-0">
            {menuType === "bar" && item.showBottlePeg ? (
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">30ml</span>
                   <span className="text-base md:text-lg font-bold text-stone-900">₹{item.pegPrice}</span>
                </div>
                {item.bottlePrice && (
                   <div className="flex items-center gap-1.5">
                     <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Btl</span>
                     <span className="text-sm md:text-base text-stone-600 font-medium">₹{item.bottlePrice}</span>
                   </div>
                )}
              </div>
            ) : (
              <span className="text-base md:text-xl font-bold text-stone-900">₹{item.price}</span>
            )}
          </div>
        </div>

        {/* Tags (With Custom Colors) */}
        {menuType === "food" && (
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {effectiveTags.map(tag => (
              <div key={tag} className="flex items-center gap-1">
                {getIcon(tag)}
                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wide ${
                  tag === "Spicy" ? "text-red-600" : 
                  tag === "Vegan" ? "text-green-600" :
                  tag === "Kids" ? "text-sky-500" :
                  "text-stone-400"
                }`}>
                  {tag}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Description - Expandable Logic */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer group/desc"
        >
          <p className={`${cormorant.className} text-base md:text-lg text-stone-600 leading-snug italic opacity-90 transition-all ${isExpanded ? '' : 'line-clamp-3'}`}>
            {item.desc}
          </p>
          {item.desc.length > 80 && (
             <span className="text-[10px] uppercase font-bold text-amber-600 mt-1 inline-block opacity-0 group-hover/desc:opacity-100 transition-opacity md:opacity-0">
               {isExpanded ? "Show Less" : "Read More"}
             </span>
          )}
        </div>
      </div>

    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-[#faf9f6]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-stone-800"></div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}