'use client';

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MenuPdfButton from "@/components/MenuPdfButton";
import MenuSchema from "@/components/MenuSchema";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  isNonVeg?: boolean;
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
  "tequila",               // Ensures tequila shows in bar menu
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
  "tequila": "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg", // Added tequila bg (you can change)
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
  const [vegPreference, setVegPreference] = useState<"all" | "veg" | "nonveg">("all");
  const [isFabOpen, setIsFabOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory("all");
    setVegPreference("all");
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

  const displayedSections = filteredSections
    .filter((section) => {
      if (selectedCategory === "all") return true;
      return section.title === selectedCategory;
    })
    .map((section) => {
      let filteredItems = section.items;

      if (menuType === "food" && vegPreference !== "all") {
        filteredItems = filteredItems.filter((item: MenuItem) =>
          vegPreference === "veg" ? !item.isNonVeg : item.isNonVeg
        );
      }

      return {
        ...section,
        items: filteredItems,
      };
    });

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    setIsFabOpen(false);
  };

  const handleVegChange = (value: "all" | "veg" | "nonveg") => {
    setVegPreference(value);
    setIsFabOpen(false);
  };

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

      {/* MENU SECTIONS */}
      <div className="pb-20 relative">
        {/* Top Filter Controls */}
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-2/3">
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-2 text-center md:text-left"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="
                  w-full px-5 py-3.5
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

            {menuType === "food" && (
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vegPreference === "veg"}
                    onChange={() =>
                      setVegPreference(vegPreference === "veg" ? "all" : "veg")
                    }
                    className="w-5 h-5 accent-green-500"
                  />
                  <span className="text-sm font-medium text-green-700">Veg Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vegPreference === "nonveg"}
                    onChange={() =>
                      setVegPreference(vegPreference === "nonveg" ? "all" : "nonveg")
                    }
                    className="w-5 h-5 accent-red-500"
                  />
                  <span className="text-sm font-medium text-red-700">Non-Veg Only</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Floating Mini Selector */}
        <div className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10">
          <div className="relative">
            <button
              onClick={() => setIsFabOpen(!isFabOpen)}
              className="
                flex items-center justify-center w-14 h-14 rounded-full
                bg-amber-600 text-white shadow-2xl hover:bg-amber-700 active:scale-95
                transition-all duration-300 border-2 border-amber-300/50
              "
              aria-label="Quick filter"
            >
              <ChevronDownIcon className="w-7 h-7" />
            </button>

            {isFabOpen && (
              <div
                className="
                  absolute bottom-full right-0 mb-4 w-72
                  bg-white rounded-xl shadow-2xl border border-amber-200/50
                  overflow-hidden transform origin-bottom-right
                  animate-fade-in-up
                "
              >
                <div className="max-h-96 overflow-y-auto py-2">
                  <div className="border-b border-gray-200 pb-2">
                    <button
                      onClick={() => handleCategorySelect("all")}
                      className={`
                        w-full px-5 py-3 text-left text-sm font-medium
                        ${selectedCategory === "all" && vegPreference === "all" ? "bg-amber-100 text-amber-900" : "hover:bg-amber-50"}
                        transition-colors
                      `}
                    >
                      All Items
                    </button>

                    {filteredSections.map((section) => (
                      <button
                        key={section.title}
                        onClick={() => handleCategorySelect(section.title)}
                        className={`
                          w-full px-5 py-3 text-left text-sm font-medium
                          ${selectedCategory === section.title && vegPreference === "all" ? "bg-amber-100 text-amber-900" : "hover:bg-amber-50"}
                          transition-colors
                        `}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>

                  {menuType === "food" && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleVegChange("all")}
                        className={`
                          w-full px-5 py-3 text-left text-sm font-medium
                          ${vegPreference === "all" ? "bg-amber-100 text-amber-900" : "hover:bg-amber-50"}
                          transition-colors
                        `}
                      >
                        Show Both
                      </button>

                      <button
                        onClick={() => handleVegChange("veg")}
                        className={`
                          w-full px-5 py-3 text-left text-sm font-medium
                          ${vegPreference === "veg" ? "bg-green-50 text-green-900" : "hover:bg-green-50"}
                          transition-colors
                        `}
                      >
                        Veg Only
                      </button>

                      <button
                        onClick={() => handleVegChange("nonveg")}
                        className={`
                          w-full px-5 py-3 text-left text-sm font-medium
                          ${vegPreference === "nonveg" ? "bg-red-50 text-red-900" : "hover:bg-red-50"}
                          transition-colors
                        `}
                      >
                        Non-Veg Only
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Displayed Sections */}
        <div className="transition-opacity duration-400">
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
                  menuType={menuType}
                />
              );
            })
          ) : (
            <div className="text-center py-20 text-gray-500 text-lg">
              No items match your selection.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------------- SECTION COMPONENT – FIXED PRICING DISPLAY ---------------- */

function MenuSection({
  id,
  title,
  bgImage,
  sectionBg,
  items,
  menuType,
}: {
  id: string;
  title: string;
  bgImage: string;
  sectionBg: string;
  items: MenuItem[];
  menuType: "food" | "bar";
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
        <h2 className="relative z-10 font-playfair text-4xl md:text-5xl !text-white drop-shadow-lg">
          {title}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 mb-2 items-center">
              <div className="flex items-center gap-2">
                {menuType === "food" && (
                  <Image
                    src={
                      item.isNonVeg
                        ? "https://thumbs.dreamstime.com/b/non-vegetarian-sign-veg-logo-symbol-red-color-food-grade-circle-312777489.jpg"
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAADmCAMAAABruQABAAAAmVBMVEU3jDv+/v7t7e3////s7Oz29vb6+vrx8fHw8PAyijb4+Pg/i0ItiDInhSxhn2QsiDCJt4u20rhfnWK81r7p8eqWvJjh6+KfxKH6//vx+vLJ3MrX6tkuhjT8//0hgidTl1XZ5dnj8uNHkUtZmltspG6tyq58r37G28dMlFDq8+oZgSCTvZVzq3a0zbWQvJLM48zo9eeDs4U2hjpfCcCVAAAM5klEQVR4nO1dh3azuBI2CCzAKLZjXIhL3ONscv/Efv+HuyqmmWLAKoRk9pxdnfEymQ+VKUiajoYJQB2TA3Cra+CWBQiT8IwuYZqkCQlTIz8b0TMm+ZkxQdME6R3KtcjvRJKWkkRappElCTcNM3yGqdQkQY9g03mpJEhQu7EBQpaBySGtLmnplKmTZpe0TNKClElahkZakLRM0tIos3mCOtCC0Opi0kzSMjXSxq0Es3tlWpD8rNFnHMJzIqbVNEHdDu1nDVz72cidn2y90tmAMYL1yiEtNmCMxgnqVBzD0WSgzzjRZDCaJkhrN7ZwKjoWJpPNZEK0ZZIWndNaxISkRed0l7Rg9ExjBJHnOw6h+QjTkNIobN60Mpn5zygV9OaYmJgNOP+H2kSrHTEHV9s9cDttIvsJRn5JS7GBFmOjtr512BzsxsAOdcxah42ukNR2txBb6Jf8Yfs59Buw0VkXx+aK9hpE/YE4Nhqmpmx37+vl5WVO6OUl0SrPnFdj1hGU9czOjmHL9Et6Xtwf15k/rof+uB4yTdzUWQRPmaE/rjN/XLckC3q6h83ueT80F5SB7Xa+9TzVKZy6ghLY6Hyj4V8c2wy/A9bPhCAdMKRFx4ZFmXRsOKRFxwakTPoMeamaGT4jU5D5HMOWbQMotnuZFz2eeclMBZRM4XAUBKtj+zH5kl+G7TYO6C0Tczqa6Jlz2iEt62ZxiCa6TEFJbIRS8VvPh5BlbUkIBGmu1iStfCYNlmA3ZDohU6IgZxlfJyk3FXdj+2awftbDXG04p8n70w2W9I3mNBkwhhHld8PPZlIF3dgAPSMX1Cbb3WZsWWPyKolNdCqJzmk2AoxwKNE5HTKvQ4m6E3Qo0cVBnqCUX6LTvHJyLTFNkyabSWo21nqQKVyQllhLaF65zTagzbb7N2O77+IavHzlxwRlYMuKcbpWGDzQD1ssorhhstDECkMT+jMLTXKfESnIfEpho7OupbGplrZvrbHdf9iyVDJ4YeMj6JflgtI2AFz3+jFnLxgw5dIcyS0vUgWlbIAwvyRtlkQL+vNLuL9uOkNouoDOKpJqbEMuSLcgBP787fBxPu4xfR4HH9P/vay9qoLqxAEknZJcJ4N0TH7mpZvLhIkUjunMNsPB0wWtEOq7NiXX7fcRWlyezwcMEL/8MoLKaJRYJ53cXFBq53OxzxrbQh1L4VhwffjsIeSGfzJOGCRCl/1hA5j0AkGRF12okSS/hAyozXjn9jNhxREidPqYexAL0gTYbgHYusAfPqG7wK569NHrdA0l+SV6gRegRRM9x53Ai8fmXweVAxbAWxzndf2SSKN0LogkTbq3uaD65Gjzz7JdFiN3tf9aOg/95W4cm0ZzQXquDbjpnVI2AGw+K3VZrPNWuzfzjg0o1EhwLghOzqj+bg4b7fGq2Uy/xPKmncf2qbjuB/bURWID9Xasw5cdytS4CqHtV9099BlxADXwCWw53kemfxAxwbjmREuSvRp4ZqHrk6eRk8gF0bMPaRtQJ6S01s+PdxojdJpXsQHCc0FwdOHRaVfN0AE0xi/R4JhXpzFaDZZQLbZwTs+OfKHhcfnkWTx8rjvYQJYkEMMGZvs+Z2jYGpzWMBYHlNEoA9ujsak+eRWx+dLubZR/o9InJzH7Su3ORnEuqDs58Vsgb8BdNo5Sn8sXMiCvGvbm1mP99tB8Wz6L3Ohs9yb6Q/MtbQNyvoNlMM1P/itkAtzrrOjLXJKZWCfp73ftW4HPCj9427Vb6n+CeKhRqBFX2w2HK8HQsIcyTds3CX6JOV+IWiLj4L40nrmgMl439rv9VwnQsCX41mvHATSBk8gFlduf0x2IXUcCcvfLcjuGkrkgwkzngmYge7PVdcXVWJRrvYleRwJaHUAZjQx+39+8rYwRScn9BlL9EihpRFJN97WxGXrWmExvSo3tP7X0uawRSWj1dd0Rm69Ryi/RglxQci1J7xtObSbu7qWNSKLqdnZXI/zfxFpSOxcEvsRb7TihKZSVC9LBTma3Ybq8y/JLrJHcbsN+5VgItgzP1JPdbbjjfMDFV04ccorOM4WHnOBI5iLJCE1BgUb0hFVGjFMjNpW6SF613XoyckFgI7/bcMcNLQl+CfgnzyWJiEwh8dhmHFP/FcidS8gFKVhJCPXHFodcELYBWmADglWJdC5blcxPJd3WsU8gRyNCqXWyku0OrIm3UAINe8ybHI24+SXWUM2QxINyKtrngmdV10rYz6JzQV5PzXTDhPyqcUBW/Jb/5dycyHaTI0Kjqt/y0/Yt3IutpaNcqGy6YQs3APmZAA65IJW3uNg7INQvgfLDm4gWs6rYCvKTKS9AnyiERixcNb+E5YjL5pXn6pYSEgt0q+WVq9kARc4kI3cMq9iAirYbTFXENwG5RyjQL1F7KaD9XBFbxt6Z/B3rKtIJMdp61XJBqbMP74k7i5krENxzvFRpAjqdi5fSKLp5+SYXhLWvFpt6WyWYAkK+wFyQ11OCKaDVOxDnl0yUQAoJbURiUxV0M0LzatiqzDfV2FbzavOtkl/iq73LEb3pwr5RKcf2YonzS3zF800otosSTAGhtcBc0FKt7XbX1eYb9k2s1LmOvAoSppR9Tvnka7k1LW7uMczLBeWffoFPan3lWUqjwvM4lWw3PKqNcYDAXBAcq41Nq2KrEgdYB5XY+h8Vc0EkaZI6b5p705fUvU63hA5OwUbDjLvH0jag6JywrxTbi57WqOiccLXvOEDYUYcStJgI/UYFFC6U9s6r+o0qPxdkpHNBKpN47gCmNSo8R0W9j5s7UQtunVCYWEZDM0ujgnswqu5TUAKLElpna8QpF4QtpbIJZ59gtkac/BIsSdnHRfefxRubcSNJmYVDb3q2RhWxEWZwMzqm683oVJKqtDm5/D9bI9LE2DLuaq/2jQpgl1LRnqcPCfuVFeXxSP4uRyN++5XVxHDkQ754bPJO4sQJDWtgqzrfcEPFh6qLX6ARv5oWKkxc/8PUpdS0WMo7QxXQYl2oEcdzVNLNQJ+FAKJ9LsKUePiN0eJbL9aI39l1KLnjsN2+oxHHmhYzuUvl5Z38cUdSTQuph8TQwZJZ00JmGEfyJDLPrgNfGjTy1c3gdqdOqQoSEi4cuEL7B2XXtFgKvgMj1PPVzzk9L7CmxbucHeeL25spZdwXpElZK9HBScwqSXfqgKl4cP0jZKduhGDL8UwJNnAUPeXsV6/gzjOhNS1mO7FWzu5NoKqaFvpErNO82GSsYbLuMbTmIhdL9yucVSruMXQ2wk5o2u6QDjeF9xiKAmejIVRe00IMOBuNoPqaFtZ6y3+1tBdkGyg5Naq2poU14XBBb5Lc3ibz66g0vyTApsPlma+Hgp4nWvEaJvHuaOx+8Zt0Nhp4epNqWsx7vPwvezGEzappYb4f+XQdev7Wcq6nVljTYsSh69zF1GODjEhvTk0L4A8euIWe6oT2a9jMmhZ41j0/cKm5jU4jqDe3poU5PNWtjYB6w6UVCmpkTYvZ8LXGooKRTf3uQ39ZeE0L+szoKacoTh65q92QFJK5V9dIZU2LgAnXg17pZcVGnfM8fvOpUWmeS6+1ZUFvdL6s7tf+cVFnP/QBkFVHDNSraRF56lQlE8y+/r26+fVkSNGm7XE4gVqhoCbUtMh4RgPLyejj6eIGlbY6+B9SbquPVuiyGww3eN0qI6iURsJqWhQu3euXw/j8+bQ7bbfb0+vz/jwdzr89E1o/ur7p9bOZRYrAEZp52Ft1mEqVBCn3S2qp1ExsBi9sfASJqGmRLEkXqFS6FAU3QQJqWmT4JW2vu/5X3/Rn1jdtBLY2z7e0DShf06JekXhBgvjWtMgyS8bdpVuUoD+/pDXY6KwTGwcoq7tOEzg1alrc+7k8k5MgbjUtDCOIu41gs1X0TMZmKwmC5NWUb4TtbjW2GjUtov2n8RSOEQQtGZtSxQviVtMimQvK394sUxCnmhY/xQa02Xb/ZmwVXdxApYd95cqCuNS0uJ5nMpPnma6HnEiLhSaJQ04SBPGpafFjYtNW2+5bbKTfdPoQfUukxd5SxCQq6ex108fZqyPEXnf4jExBZc72ffu+PyHkE/JI65203iPmJJfph8z3G2ZtQV5JQe/3c0GdxWLhLhbhv28okymAyv/xkBlByMsFtYHyalq0gfLsWxvoN2Cjs6592GgccBu/tYHy7jFsA+XlgtpAeX5JGyhxj+F51W8TrWI1LZzRGNOU0jhsjouZ41ymekGHblTTgiWMqMNNmxGT+uM09WSGTBZm0SyTE/2ftGU2QxAN9662W2GaQ5ygdmO7firQK+5Yz9vy0iBB13sMafkKlt+N31lcUEEiuOc4YFqW1jRB7B5DlSkcgYI6Fcdwc3NBKUHaL8ImfxuWOEFXbOxrl57zlvSCM5nhM/Et1M0QpP0fDF9/E8erglgAAAAASUVORK5CYII="
                    }
                    alt={item.isNonVeg ? "Non-Vegetarian" : "Vegetarian"}
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                )}
                <h4 className="font-bold uppercase !text-gray-900">
                  {item.name}
                </h4>
              </div>

              {/* FIXED PRICING – 30ml first, then Bottle – side by side */}
              <div className="text-right">
                {menuType === "bar" && item.showBottlePeg && item.bottlePrice && item.pegPrice ? (
                  <div className="inline-flex items-baseline gap-6 text-sm font-medium">
                    {/* 30ml first */}
                    <div className="text-left">
                      <span className="text-amber-700 block text-xs">30ml</span>
                      <span className="font-bold text-amber-800 text-lg">₹{item.pegPrice}</span>
                    </div>
                    {/* Bottle second */}
                    <div className="text-left">
                      <span className="text-amber-700 block text-xs">Bottle</span>
                      <span className="font-bold text-amber-800 text-lg">₹{item.bottlePrice}</span>
                    </div>
                  </div>
                ) : (
                  <span className="font-bold text-lg text-amber-800">
                    ₹{item.price}
                  </span>
                )}
              </div>
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