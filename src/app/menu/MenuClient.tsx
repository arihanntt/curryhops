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

/* ---------------- MAIN CONTENT ---------------- */

function MenuContent() {
  const [menu, setMenu] = useState<{ sections: MenuSectionType[] }>({
    sections: [],
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [menuType, setMenuType] = useState<"food" | "bar">("food");

  /* 🔹 Read menu type from URL */
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "food" || type === "bar") {
      setMenuType(type);
    }
  }, [searchParams]);

  /* 🔹 Fetch menu */
  useEffect(() => {
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  /* 🔹 Scroll to section if hash exists */
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

  /* 🔹 Filter sections based on menu type */
  const filteredSections = menu.sections.filter((section) => {
    const title = section.title.toLowerCase();
    return menuType === "food"
      ? FOOD_CATEGORIES.includes(title)
      : BAR_CATEGORIES.includes(title);
  });

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

        <div className="relative z-10 text-center space-y-6">
          <h1 className="font-playfair text-5xl md:text-6xl text-white">
            Menu
          </h1>

          {/* MENU TOGGLE */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setMenuType("food")}
              className={`px-6 py-2 border ${
                menuType === "food"
                  ? "bg-amber-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Food Menu
            </button>

            <button
              onClick={() => setMenuType("bar")}
              className={`px-6 py-2 border ${
                menuType === "bar"
                  ? "bg-amber-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Bar Menu
            </button>
          </div>

          <MenuPdfButton />
        </div>
      </section>

      {/* MENU SECTIONS */}
      <div className="pb-20">
        {filteredSections.map((section, index) => {
          const slug = section.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <MenuSection
              key={index}
              id={slug}
              title={section.title}
              bgImage={`/images/${slug}-bg.jpg`}
              sectionBg="/images/menu-texture.jpg"
              items={section.items}
            />
          );
        })}
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
      <div className="relative min-h-[280px] flex items-center justify-center mb-12">
        <Image src={bgImage} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <h2 className="relative z-10 font-playfair text-4xl text-white">
          {title}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1 mb-2">
              <h4 className="font-bold uppercase">{item.name}</h4>
              <span>₹{item.price}</span>
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
