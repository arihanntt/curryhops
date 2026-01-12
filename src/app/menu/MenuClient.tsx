'use client';

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MenuPdfButton from "@/components/MenuPdfButton";
import MenuSchema from "@/components/MenuSchema";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"] });

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

/* ---------------- MENU GROUP DEFINITIONS ---------------- */

const FOOD_CATEGORIES = [
  "quick bites",
  "salad",
  "appetizers",
  "pizza",
  "pasta",
  "main course",
  "biryani",
  "breads",
  "rice and noodles",
  "dessert",
];

const BAR_CATEGORIES = [
  "signature cocktails",
  "classics",
  "our liit's",
  "beer cocktails",
  "coffee",
  "hot cocktails",
  "rum",
  "gin",
  "vodka",
  "tequila",
  "indian whisky",
  "indian single malts",
  "scotch",
  "japanese whisky",
  "rye/bourbon whiskeys",
  "canadian / irish whisky",
  "cognac/brandy",
  "liquers",
  "aperitif",
  "red wine",
  "rose wine & sparkling wine",
  "white wine",
  "sangria",
  "champagne",
  "shots & shooters",
  "fresh juices",
  "soft drinks",
];

/* ---------------- BACKGROUND IMAGES ---------------- */
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

/* ---------------- FILTER DEFINITIONS ---------------- */
const TYPE_OPTIONS = ["All", "Veg", "Non-Veg", "Egg"] as const;
const DIETARY_OPTIONS = ["Spicy", "Kids", "Vegan"] as const;

type TypeFilter = typeof TYPE_OPTIONS[number];
type DietaryFilter = typeof DIETARY_OPTIONS[number];

/* ---------------- TAG ICONS ---------------- */
const TAG_ICONS: Record<string, string> = {
  "Veg": "data:image/png;base64,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",
  "Non-Veg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5OfgmRMdIZAGV-DKoPCUnbSK6kbQ6bDCYhQ&s",
  "Egg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUJuL0k9pNJWxGFF2H35-Z3ybZciGC-h0zw&s",
  "Spicy": "https://tse2.mm.bing.net/th/id/OIP.0raRmFKFAPmggGCIQ_4wVAHaFx?pid=Api&P=0&h=180",
  "Kids": "https://i.pinimg.com/736x/e9/31/e1/e931e16233b03fd44b2dd1870585f226.jpg",
  "Vegan": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_MQRrFox4BG6NIHMNkc-jipzZYZWzkif3QA&s",
};

/* ---------------- MAIN CONTENT ---------------- */

function MenuContent() {
  const [menu, setMenu] = useState<{ sections: MenuSectionType[] }>({
    sections: [],
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [menuType, setMenuType] = useState<"food" | "bar">("food");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // State for expanded image
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory("all");
    setTypeFilter("All");
    setDietaryFilters([]);
  }, [menuType]);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "food" || type === "bar") {
      setMenuType(type);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash.toLowerCase());
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [pathname]);

  const filteredSections = menu.sections.filter((section) => {
    const title = section.title.toLowerCase();
    return menuType === "food"
      ? FOOD_CATEGORIES.includes(title)
      : BAR_CATEGORIES.includes(title);
  });

  const displayedSections = filteredSections
    .filter((section) =>
      selectedCategory === "all" ? true : section.title.toLowerCase() === selectedCategory.toLowerCase()
    )
    .map((section) => {
      const filteredItems = section.items.filter((item: MenuItem) => {
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

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    setIsFabOpen(false);
  };

  const toggleDietary = (tag: DietaryFilter) => {
    setDietaryFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const openImage = (url: string) => setExpandedImage(url);
  const closeImage = () => setExpandedImage(null);

  return (
    <main className="font-poppins text-gray-800 bg-white min-h-screen">
      {filteredSections.length > 0 && <MenuSchema sections={filteredSections as any} />}

      {/* HERO */}
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src="/images/restaurant-dinner-black.webp"
          alt="Curry & Hops Menu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center space-y-8">
          <h1 className={`${playfair.className} text-6xl md:text-7xl text-white`}>
  Menu
</h1>



          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-1.5">
              <button
                onClick={() => setMenuType("food")}
                className={`relative px-7 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 ease-out ${
                  menuType === "food"
                    ? "text-black bg-amber-400 shadow-md shadow-amber-500/30"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Food Menu
              </button>
              <button
                onClick={() => setMenuType("bar")}
                className={`relative px-7 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 ease-out ${
                  menuType === "bar"
                    ? "text-black bg-amber-400 shadow-md shadow-amber-500/30"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Bar Menu
              </button>
            </div>
            <MenuPdfButton />
          </div>
        </div>
      </section>

      {/* Intro - Improved Typography */}
     <section className="pt-14 pb-6 md:pt-20 md:pb-8 bg-gradient-to-br from-amber-50 via-white to-amber-50/30">

  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1 
      className="font-['Playfair_Display'] text-6xl sm:text-7xl md:text-9xl 
                 font-extrabold text-amber-950 tracking-tight leading-none mb-8 
                 drop-shadow-2xl animate-fade-in"
    >
      Curry & Hops
    </h1>

    <p className="font-['Inter'] text-xl sm:text-2xl md:text-3xl text-gray-800 font-light 
                  max-w-4xl mx-auto leading-relaxed tracking-wide">
      Bold Indian soul meets craft beer spirit.<br className="hidden sm:block" />
      Where spice ignites, stories unfold, and every sip & bite feels like home.
    </p>

    <div className="mt-4 flex justify-center">

      <div className="inline-flex flex-col items-center text-amber-700">
        <span className="text-sm uppercase tracking-[0.25em] font-medium mb-6">
          Scroll to Discover
        </span>
        <div className="animate-pulse-slow">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FILTER BAR + SECTIONS */}
      <div className="pb-24 md:pb-32 relative">
        {/* Top filters */}
        <div className="max-w-5xl mx-auto px-6 pt-2 pb-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-3/5 relative">
  <label 
    htmlFor="category-filter" 
    className="block text-sm font-medium text-gray-700 mb-2 text-center md:text-left"
  >
    Category
  </label>
  
  <div className="relative">
    <select
      id="category-filter"
      value={selectedCategory}
      onChange={(e) => handleCategorySelect(e.target.value)}
      className={`
        w-full px-5 py-3.5 pr-12 bg-white 
        border-2 border-amber-300 rounded-xl 
        text-gray-900 text-base md:text-lg font-medium
        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
        shadow-md hover:shadow-lg hover:border-amber-400
        transition-all duration-200 cursor-pointer
        appearance-none
      `}
    >
      <option value="all">All Items</option>
      {filteredSections.map((section) => (
        <option key={section.title} value={section.title}>
          {section.title}
        </option>
      ))}
    </select>

    {/* Custom arrow */}
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
      <ChevronDownIcon className="h-6 w-6 text-amber-700" />
    </div>
  </div>
</div>

            {menuType === "food" && (
  <button
    onClick={() => setShowFilters(true)}
    className={`
      w-full md:w-auto px-6 py-3.5 
      bg-gradient-to-r from-amber-500 to-amber-600 
      hover:from-amber-600 hover:to-amber-700
      text-white font-medium rounded-xl
      shadow-lg hover:shadow-xl
      transition-all duration-300
      flex items-center justify-center gap-2
      border border-amber-400/30
      group
    `}
  >
    <span>Filters</span>
    
    {(typeFilter !== "All" || dietaryFilters.length > 0) && (
      <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
        {(typeFilter !== "All" ? 1 : 0) + dietaryFilters.length}
      </span>
    )}

    <ChevronDownIcon className="h-5 w-5 transition-transform group-hover:rotate-180" />
  </button>
)}
          </div>
        </div>

        {/* Filter Modal */}
        {showFilters && menuType === "food" && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center">
            <div className="bg-white w-full max-w-md md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Type</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setTypeFilter(opt)}
                        className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                          typeFilter === opt
                            ? "bg-amber-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Dietary Preferences</h4>
                  <div className="space-y-3">
                    {DIETARY_OPTIONS.map((tag) => (
                      <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={dietaryFilters.includes(tag)}
                          onChange={() => toggleDietary(tag)}
                          className="w-5 h-5 rounded accent-amber-600"
                        />
                        <span className="text-gray-700 group-hover:text-amber-800 transition-colors">
                          {tag === "Spicy" ? "Spicy 🌶️" : tag === "Kids" ? "Kid's Choice" : "Vegan"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-4">
                <button
                  onClick={() => {
                    setTypeFilter("All");
                    setDietaryFilters([]);
                  }}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating quick selector */}
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <button
            onClick={() => setIsFabOpen(!isFabOpen)}
            className="w-14 h-14 rounded-full bg-amber-600 text-white shadow-2xl flex items-center justify-center hover:bg-amber-700 transition-all active:scale-95 border-2 border-amber-300/50"
          >
            <ChevronDownIcon className="w-7 h-7" />
          </button>

          {isFabOpen && (
            <div className="absolute bottom-full right-0 mb-4 w-64 bg-white rounded-xl shadow-2xl border border-amber-200/50 overflow-hidden">
              <div className="max-h-80 overflow-y-auto py-2">
                <button
                  onClick={() => handleCategorySelect("all")}
                  className={`w-full px-5 py-3 text-left text-sm font-medium ${
                    selectedCategory === "all" ? "bg-amber-100 text-amber-900" : "hover:bg-amber-50"
                  }`}
                >
                  All Items
                </button>
                {filteredSections.map((section) => (
                  <button
                    key={section.title}
                    onClick={() => handleCategorySelect(section.title)}
                    className={`w-full px-5 py-3 text-left text-sm font-medium ${
                      selectedCategory === section.title ? "bg-amber-100 text-amber-900" : "hover:bg-amber-50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Sections */}
        <div className="transition-opacity duration-400">
          {displayedSections.length > 0 ? (
            displayedSections.map((section, index) => {
              const slug = section.title.toLowerCase().replace(/\s+/g, "-");
              const bgImage = CATEGORY_BACKGROUNDS[section.title.toLowerCase()] || `/images/${slug}-bg.jpg`;

              return (
                <MenuSection
                  key={index}
                  id={slug}
                  title={section.title}
                  bgImage={bgImage}
                  sectionBg="/images/menu-texture.jpg"
                  items={section.items}
                  menuType={menuType}
                  onImageClick={openImage}
                />
              );
            })
          ) : (
            <div className="text-center py-20 text-gray-500 text-lg">
              No items match your current selection.
            </div>
          )}
        </div>
      </div>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-black/40 rounded-full p-3 hover:bg-black/60 transition"
            onClick={closeImage}
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={expandedImage}
              alt="Expanded dish"
              fill
              className="object-contain"
              quality={90}
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- MENU SECTION COMPONENT ---------------- */

function MenuSection({
  id,
  title,
  bgImage,
  sectionBg,
  items,
  menuType,
  onImageClick,
}: {
  id: string;
  title: string;
  bgImage: string;
  sectionBg: string;
  items: MenuItem[];
  menuType: "food" | "bar";
  onImageClick: (url: string) => void;
}) {
  const tagIcons = TAG_ICONS;

  return (
    <section id={id} className="py-12 bg-cover bg-center relative" style={{ backgroundImage: `url(${sectionBg})` }}>
      <div className="relative min-h-[180px] md:min-h-[220px] flex items-center justify-center mb-8">
        <Image src={bgImage} alt={title} fill className="object-cover brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <h2 className="relative z-10 font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl tracking-tight font-extrabold leading-tight">
  {title}
</h2>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        <div className="space-y-6 md:space-y-8">
          {items.map((item, idx) => {
            const effectiveTags = [...(item.tags || [])];
            const hasNonVegOrEgg = effectiveTags.some(t => t === "Non-Veg" || t === "Egg");
            if (menuType === "food" && !hasNonVegOrEgg && !effectiveTags.includes("Veg")) {
              effectiveTags.push("Veg");
            }

            return (
             <div
  key={idx}
  className="
    flex flex-row gap-4 items-start
    pb-6 border-b border-gray-300/50 last:border-b-0 
    hover:bg-amber-50/20 transition-colors rounded-xl p-4
  "
>
  {/* Square Image – always on left */}
  <div 
    className="shrink-0 cursor-pointer w-24 h-24 sm:w-28 sm:h-28"
    onClick={() => item.imageUrl && onImageClick(item.imageUrl)}
  >
    {item.imageUrl ? (
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={112}
        height={112}
        className="
          w-full h-full 
          object-cover 
          rounded-xl
          border border-amber-200/50 
          shadow-sm 
          hover:shadow-md hover:scale-[1.03] 
          transition-all duration-300
        "
      />
    ) : (
      <div className="
        w-full h-full 
        rounded-xl 
        bg-gradient-to-br from-amber-50 to-amber-100 
        flex items-center justify-center 
        text-amber-700/60 text-sm font-medium
        border border-amber-200/40
      ">
        Dish
      </div>
    )}
  </div>

  {/* Text content – right side */}
  <div className="flex-1 min-w-0">
    {/* Name + Tags */}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-1.5">
      <h4 className="font-['Satisfy'] font-normal text-xl sm:text-2xl md:text-3xl text-gray-900 tracking-wide line-clamp-2">
        {item.name}
      </h4>

      {menuType === "food" && effectiveTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1 sm:mt-0">
          {effectiveTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/90 shadow-sm border border-gray-200"
            >
              {tagIcons[tag] && (
                <Image
                  src={tagIcons[tag]}
                  alt={tag}
                  width={16}
                  height={16}
                  className="object-contain drop-shadow-sm"
                />
              )}
              <span
                className={
                  tag === "Non-Veg" ? "text-red-700" :
                  tag === "Egg" ? "text-yellow-700" :
                  tag === "Spicy" ? "text-orange-700" :
                  tag === "Kids" ? "text-blue-700" :
                  tag === "Vegan" ? "text-green-700" :
                  "text-emerald-700"
                }
              >
                {tag === "Spicy" ? "Spicy" : tag}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Description */}
    <p className="font-['Merriweather'] text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed italic mb-2 line-clamp-3">
      {item.desc}
    </p>

    {/* Price */}
    <div className="text-right">
      {menuType === "bar" && item.showBottlePeg && item.bottlePrice && item.pegPrice ? (
        <div className="inline-flex gap-5 text-sm font-medium">
          <div className="text-left">
            <span className="text-amber-700 text-xs block">30ml</span>
            <span className="font-bold text-amber-900">₹{item.pegPrice}</span>
          </div>
          <div className="text-left">
            <span className="text-amber-700 text-xs block">Bottle</span>
            <span className="font-bold text-amber-900">₹{item.bottlePrice}</span>
          </div>
        </div>
      ) : (
        <span className="font-bold text-lg sm:text-xl text-amber-900">₹{item.price}</span>
      )}
    </div>
  </div>
</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-600 animate-pulse">Loading menu…</div>}>
      <MenuContent />
    </Suspense>
  );
}