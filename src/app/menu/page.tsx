"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import MenuPdfButton from "@/components/MenuPdfButton";

type MenuItem = {
  name: string;
  desc: string;
  price: string;
};

type MenuSectionType = {
  _id: string;
  category: string;
  items: MenuItem[];
};

function MenuContent() {
  const [menu, setMenu] = useState<{ sections: MenuSectionType[] }>({
    sections: [],
  });

  // Fetch menu from MongoDB
  useEffect(() => {
    fetch("/api/menu", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  const pathname = usePathname();
  const params = useSearchParams();

  // Scroll to section
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash.toLowerCase());
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
      return;
    }

    const parts = pathname.split("/").filter(Boolean);
    const target = parts.length > 1 ? parts[parts.length - 1] : null;

    if (target) {
      const el = document.getElementById(target.toLowerCase());
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }
  }, [pathname, params]);

  return (
    <main className="font-poppins text-gray-800 bg-white">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src="/images/restaurant-dinner-black.webp"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center">
          <div className="relative z-10 text-center flex flex-col items-center gap-6">
  <h2 className="font-playfair text-5xl md:text-6xl text-white">
    The Menu
  </h2>

  <div className="w-20 h-1 bg-amber-400 mx-auto" />

  {/* PDF Button */}
  <MenuPdfButton />
</div>

          
          
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-amber-600 mb-2">
          Eat with us
        </p>
        <h3 className="font-playfair text-3xl md:text-4xl mb-6">
          Curry & Hops Menu
        </h3>
        <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-8" />
        <p className="text-gray-600 leading-relaxed">
          Curry & Hops is a casual destination for brisk breakfasts and weekend
          brunches, post-shop pit stops and working lunches, dinner dates and
          after work cocktails. Take a look inside the menus and whet your
          appetite for Indian delights.
        </p>
      </section>

      {/* Menu Sections */}
      {menu.sections.length > 0 && (
  <div className="pb-20">
    {menu.sections.map((section: any, index: number) => {
      const slug = section.title?.toLowerCase() || `section-${index}`;

      return (
        <MenuSection
          key={index}
          id={slug}
          title={section.title || "Menu"}
          bgImage={`/images/${slug}-bg.jpg`}
          sectionBg="/images/menu-texture.jpg"
          items={section.items || []}
        />
      );
    })}
  </div>
)}


      {/* PDF Button spacing */}
   
    </main>
  );
}

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
      {/* Section Header */}
      <div className="relative min-h-[300px] flex items-center justify-center mb-12">
        <Image src={bgImage} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <h2 className="relative z-10 font-playfair text-4xl text-white">
          {title}
        </h2>
      </div>

      {/* Items */}
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
