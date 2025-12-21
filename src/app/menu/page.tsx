"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import MenuPdfButton from "@/components/MenuPdfButton";
import { useState } from "react";

function MenuContent() {
    const [menu, setMenu] = useState<any>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    // First check hash (#dinner)
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

    // Fallback: extract last segment from path
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
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <Image
          src="/images/restaurant-dinner-black.webp"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="font-playfair text-5xl md:text-6xl text-white mb-6">
            The Menu
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto"></div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-amber-600 mb-2">
          Eat with us
        </p>
        <h3 className="font-playfair text-3xl md:text-4xl mb-6">
          Curry & Hops Menu
        </h3>
        <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-8"></div>
        <p className="text-gray-600 leading-relaxed mb-8">
          Curry & Hops is a casual destination for brisk breakfasts and weekend
          brunches, post-shop pit stops and working lunches, dinner dates and
          after work cocktails. Take a look inside the menus and whet your
          appetite for Indian delights.
        </p>
      </section>

            {/* Menu Sections (From Admin / MongoDB) */}
      {menu && (
        <div className="space-y-0 pb-20">
          {menu.sections.map((section: any) => (
            <MenuSection
              key={section.id}
              id={section.id}
              title={section.title}
              bgImage={`/images/${section.id}-bg.jpg`}
              sectionBg="/images/menu-texture.jpg"
              items={section.items}
            />
          ))}
        </div>
      )}

      <MenuPdfButton />

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
  items: { name: string; desc: string; price: string }[];
}) {
  return (
    <section
      id={id}
      className="bg-cover bg-center py-12"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      {/* Full-width Header */}
      <div className="relative min-h-[300px] flex-shrink-0 flex items-center justify-center mb-12 w-full">
        <Image src={bgImage} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <h2 className="relative z-10 font-playfair text-4xl text-white">
          {title}
        </h2>
      </div>

      {/* Items */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col">
            {/* Title + Price with dotted line */}
            <div className="flex items-center justify-between w-full border-b border-dotted border-gray-400 pb-1 mb-2">
              <h4 className="font-poppins text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide">
                {item.name}
              </h4>
              <span className="font-medium text-gray-900">₹{item.price}</span>
            </div>
            {/* Description */}
            <p className="text-gray-600 text-sm italic">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}