'use client';

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MenuPdfButton from "@/components/MenuPdfButton";
import MenuSchema from "@/components/MenuSchema";

type MenuItem = {
  name: string;
  desc: string;
  price: string;
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

/* ────────────────────────────────────────────────
   ★ CENTRAL PLACE FOR ALL CATEGORY BACKGROUND IMAGES ★
───────────────────────────────────────────────── */
const CATEGORY_BACKGROUNDS: Record<string, string> = {
  // Food (unchanged)
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

  // Bar (unchanged)
  "signature cocktails": "https://images.pexels.com/photos/19051904/pexels-photo-19051904.jpeg",
  "classics": "https://images.pexels.com/photos/2531186/pexels-photo-2531186.jpeg",
  "our liit's": "https://images.pexels.com/photos/12208200/pexels-photo-12208200.jpeg",
  "beer cocktails": "https://images.pexels.com/photos/7377026/pexels-photo-7377026.jpeg",
  "coffee": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
  "hot cocktails": "https://images.pexels.com/photos/35602242/pexels-photo-35602242.jpeg",
  "rum": "https://images.pexels.com/photos/2466319/pexels-photo-2466319.jpeg",
  "gin": "https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg",
  "vodka": "https://images.pexels.com/photos/1170598/pexels-photo-1170598.jpeg",
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

/* ---------------- MAIN CONTENT ---------------- */

function MenuContent() {
  const [menu, setMenu] = useState<{ sections: MenuSectionType[] }>({
    sections: [],
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [menuType, setMenuType] = useState<"food" | "bar">("food");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Reset filter when switching Food ↔ Bar
  useEffect(() => {
    setSelectedCategory("all");
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
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [pathname]);

  const filteredSections = menu.sections.filter((section) => {
    const title = section.title.toLowerCase();
    return menuType === "food"
      ? FOOD_CATEGORIES.includes(title)
      : BAR_CATEGORIES.includes(title);
  });

  const displayedSections =
    selectedCategory === "all"
      ? filteredSections
      : filteredSections.filter((s) => s.title === selectedCategory);

  return (
    <main className="font-poppins text-gray-800 bg-white">
      {filteredSections.length > 0 && (
        <MenuSchema sections={filteredSections as any} />
      )}

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
          <h1 className="font-playfair text-5xl md:text-6xl text-white">
            Menu
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-1.5">
              <button
                onClick={() => setMenuType("food")}
                className={`relative px-7 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 ease-out
                  ${menuType === "food"
                    ? "text-black bg-amber-400 shadow-md shadow-amber-500/30"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                Food Menu
              </button>

              <button
                onClick={() => setMenuType("bar")}
                className={`relative px-7 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 ease-out
                  ${menuType === "bar"
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

      {/* Intro section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-amber-900 mb-4 tracking-tight">
            Curry & Hops
          </h1>

          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Where bold Indian flavors meet craft beer vibes. Spicy curries, street bites, soulful biryanis & signature cocktails — all crafted for good company and great memories.
          </p>

          <div className="mt-10 flex flex-col items-center text-amber-600">
            <span className="text-sm uppercase tracking-wider font-medium mb-2">
              Scroll to explore
            </span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTIONS with Centered & Styled Dropdown */}
      <div className="pb-20">
        {/* Sticky Dropdown – centered & premium look */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-gray-200/80 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-5 flex justify-center">
            <div className="w-full max-w-lg">
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-2 text-center"
              >
                Browse Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="
                  w-full
                  px-5 py-3.5
                  bg-white border-2 border-amber-200 rounded-xl
                  text-gray-900 text-base md:text-lg font-medium
                  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                  shadow-md hover:shadow-lg hover:border-amber-400
                  transition-all duration-200 cursor-pointer
                  appearance-none
                  bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExIDFMNiA3TDEgMS41IiBzdHJva2U9IiM4QjU1MzQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-right-4 bg-center
                "
              >
                <option value="all">All Items</option>
                {filteredSections.map((section) => (
                  <option key={section.title} value={section.title}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Displayed Sections */}
        <div className="transition-opacity duration-400 pt-4">
          {displayedSections.length > 0 ? (
            displayedSections.map((section, index) => {
              const slug = section.title.toLowerCase().replace(/\s+/g, "-");
              const bgImage =
                CATEGORY_BACKGROUNDS[section.title.toLowerCase()] ||
                `/images/${slug}-bg.jpg`;

              return (
                <MenuSection
                  key={index}
                  id={slug}
                  title={section.title}
                  bgImage={bgImage}
                  sectionBg="/images/menu-texture.jpg"
                  items={section.items}
                />
              );
            })
          ) : (
            <div className="text-center py-20 text-gray-500 text-lg">
              No items available in this category yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------------- SECTION COMPONENT ---------------- */

function MenuSection({
  id,
  title,
  bgImage,
  sectionBg,
  items,
}: {
  id: string;
  title: string;
  bgImage: string;
  sectionBg: string;
  items: MenuItem[];
}) {
  return (
    <section
      id={id}
      className="bg-cover bg-center py-12"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      <div className="relative min-h-[240px] flex items-center justify-center mb-10">
        <Image
          src={bgImage}
          alt={`${title} background`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <h2 className="relative z-10 font-playfair text-4xl md:text-5xl text-white drop-shadow-lg">
          {title}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 mb-2">
              <h4 className="font-bold uppercase text-gray-900">{item.name}</h4>
              <span className="font-bold text-lg text-amber-800">₹{item.price}</span>
            </div>
            <p className="text-sm italic text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading menu…</div>}>
      <MenuContent />
    </Suspense>
  );
}