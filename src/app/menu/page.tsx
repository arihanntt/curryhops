"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function MenuPage() {
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

      {/* Menu Sections */}
      <div className="space-y-0 pb-20">
        <MenuSection
        id="breakfast"
title="Breakfast"
bgImage="/images/breakfast-bg.jpg"
sectionBg="/images/menu-texture.jpg"
items={[
  {
    name: "Paneer Tikka",
    desc: "Cottage cheese cubes marinated in spices & grilled",
    price: "220",
  },
  {
    name: "Aloo Chaat",
    desc: "Crispy potatoes tossed with tangy spices & chutneys",
    price: "160",
  },
  {
    name: "Samosa",
    desc: "Crispy pastry stuffed with spiced potatoes & peas",
    price: "100",
  },
  {
    name: "Chicken Malai Tikka",
    desc: "Creamy, tender chicken pieces grilled to perfection",
    price: "280",
  },
  {
    name: "Poha",
    desc: "Flattened rice cooked with onions, peas & spices",
    price: "120",
  },
  {
    name: "Upma",
    desc: "Semolina cooked with vegetables & mild spices",
    price: "130",
  },
  {
    name: "Idli Sambar",
    desc: "Steamed rice cakes served with lentil soup & chutneys",
    price: "150",
  },
  {
    name: "Medu Vada",
    desc: "Crispy lentil donuts served with sambar & chutney",
    price: "160",
  },
  {
    name: "Masala Dosa",
    desc: "Crispy rice crepe stuffed with spiced potatoes",
    price: "200",
  },
  {
    name: "Paneer Paratha",
    desc: "Stuffed flatbread with paneer & spices served with curd",
    price: "180",
  },
  {
    name: "Chole Kulche",
    desc: "Spicy chickpeas served with soft kulcha bread",
    price: "190",
  },
  {
    name: "Omelette",
    desc: "Fluffy egg omelette with onions, tomatoes & spices",
    price: "140",
  },
  {
    name: "Pav Bhaji",
    desc: "Buttered bread served with spicy mashed vegetable curry",
    price: "200",
  },
  {
    name: "Aloo Paratha",
    desc: "Stuffed flatbread with spiced potatoes & butter",
    price: "160",
  },
]}

        />

        <MenuSection
         id="lunch"
title="Lunch"
bgImage="/images/lunch-bg.jpg"
sectionBg="/images/menu-texture.jpg"
items={[
  {
    name: "Butter Chicken",
    desc: "Tender chicken in creamy tomato gravy",
    price: "320",
  },
  {
    name: "Paneer Butter Masala",
    desc: "Cottage cheese in rich buttery tomato sauce",
    price: "280",
  },
  {
    name: "Rogan Josh",
    desc: "Kashmiri lamb curry with aromatic spices",
    price: "360",
  },
  {
    name: "Dal Makhani",
    desc: "Black lentils slow-cooked with cream & butter",
    price: "240",
  },
  {
    name: "Chicken Biryani",
    desc: "Fragrant basmati rice cooked with spiced chicken",
    price: "350",
  },
  {
    name: "Vegetable Biryani",
    desc: "Aromatic basmati rice with mixed vegetables & spices",
    price: "280",
  },
  {
    name: "Palak Paneer",
    desc: "Cottage cheese cooked in creamy spinach curry",
    price: "260",
  },
  {
    name: "Chole Bhature",
    desc: "Spiced chickpea curry served with fried bread",
    price: "220",
  },
  {
    name: "Mutton Curry",
    desc: "Slow-cooked tender lamb in spicy gravy",
    price: "380",
  },
  {
    name: "Fish Curry",
    desc: "Fresh fish simmered in coconut & tamarind gravy",
    price: "340",
  },
  {
    name: "Jeera Rice",
    desc: "Basmati rice tempered with cumin seeds",
    price: "150",
  },
  {
    name: "Garlic Naan",
    desc: "Soft naan bread topped with garlic & butter",
    price: "90",
  },
  {
    name: "Tandoori Roti",
    desc: "Whole wheat roti cooked in clay oven",
    price: "40",
  },
  {
    name: "Mix Veg Curry",
    desc: "Seasonal vegetables in spiced tomato gravy",
    price: "240",
  },
]}

        />

        <MenuSection
         id="dinner"
title="Dinner"
bgImage="/images/dinner-bg.jpg"
sectionBg="/images/menu-texture.jpg"
items={[
  {
    name: "Gulab Jamun",
    desc: "Soft fried dough balls soaked in sugar syrup",
    price: "140",
  },
  {
    name: "Rasmalai",
    desc: "Cottage cheese patties in sweetened milk",
    price: "180",
  },
  {
    name: "Kheer",
    desc: "Traditional Indian rice pudding",
    price: "120",
  },
  {
    name: "Jalebi",
    desc: "Crispy, syrup-soaked spirals",
    price: "110",
  },
  {
    name: "Rasgulla",
    desc: "Spongy cottage cheese dumplings in light syrup",
    price: "150",
  },
  {
    name: "Sandesh",
    desc: "Bengali sweet made from fresh paneer",
    price: "160",
  },
  {
    name: "Barfi",
    desc: "Milk-based sweet, flavored with cardamom",
    price: "130",
  },
  {
    name: "Besan Ladoo",
    desc: "Gram flour sweet balls with ghee & sugar",
    price: "140",
  },
  {
    name: "Mysore Pak",
    desc: "Rich ghee-based sweet from South India",
    price: "150",
  },
  {
    name: "Halwa",
    desc: "Soft, rich dessert made with semolina or flour",
    price: "120",
  },
  {
    name: "Malpua",
    desc: "Indian-style sweet pancakes in sugar syrup",
    price: "170",
  },
  {
    name: "Peda",
    desc: "Soft milk fudge flavored with saffron & cardamom",
    price: "140",
  },
  {
    name: "Modak",
    desc: "Steamed dumpling with coconut & jaggery filling",
    price: "160",
  },
  {
    name: "Shrikhand",
    desc: "Creamy yogurt-based dessert with saffron",
    price: "150",
  },
]}

        />

        <MenuSection
          id="drinks"
title="Drinks"
bgImage="/images/drinks-bg.jpg"
sectionBg="/images/menu-texture.jpg"
items={[
  {
    name: "Masala Chai",
    desc: "Indian spiced tea with milk",
    price: "60",
  },
  {
    name: "Lassi",
    desc: "Sweet or salty yogurt drink",
    price: "90",
  },
  {
    name: "Filter Coffee",
    desc: "South Indian style coffee",
    price: "70",
  },
  {
    name: "Nimbu Pani",
    desc: "Refreshing lemonade with Indian spices",
    price: "50",
  },
  {
    name: "Cold Coffee",
    desc: "Chilled creamy coffee with ice",
    price: "120",
  },
  {
    name: "Rose Milk",
    desc: "Chilled milk flavored with rose syrup",
    price: "100",
  },
  {
    name: "Jal Jeera",
    desc: "Tangy cumin-spiced lemonade",
    price: "80",
  },
  {
    name: "Thandai",
    desc: "Festive drink with milk, nuts & spices",
    price: "140",
  },
  {
    name: "Badam Milk",
    desc: "Hot or cold almond flavored milk",
    price: "130",
  },
  {
    name: "Sugarcane Juice",
    desc: "Freshly pressed cane juice with lemon",
    price: "70",
  },
  {
    name: "Buttermilk (Chaas)",
    desc: "Refreshing yogurt-based drink",
    price: "60",
  },
  {
    name: "Kokum Sharbat",
    desc: "Cooling drink from kokum fruit",
    price: "90",
  },
  {
    name: "Aam Panna",
    desc: "Raw mango cooler with mint & spices",
    price: "100",
  },
  {
    name: "Tender Coconut Water",
    desc: "Fresh young coconut water",
    price: "80",
  },
  {
    name: "Green Tea",
    desc: "Light, soothing brewed green tea",
    price: "70",
  },
  {
    name: "Lemon Iced Tea",
    desc: "Chilled black tea with lemon & ice",
    price: "90",
  },
  {
    name: "Mango Shake",
    desc: "Sweet milkshake made with ripe mangoes",
    price: "150",
  },
  {
    name: "Banana Shake",
    desc: "Creamy milkshake with bananas",
    price: "120",
  },
  {
    name: "Chocolate Shake",
    desc: "Rich & creamy chocolate milkshake",
    price: "160",
  },
]}

      
        />
      </div>
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
