"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "AUTHENTIC TANDOORI PLATTERS",
    subtitle: "From ₹199 / Plate",
    description:
      "Juicy kebabs, smoky paneer tikka, and sizzling tandoori delights straight from the clay oven.",
    image: "/images/tandoori.jpg",
  },
  {
    title: "SIGNATURE INDIAN CURRIES",
    subtitle: "From ₹149 / Bowl",
    description:
      "Rich, aromatic gravies like butter chicken, paneer butter masala, and spicy chettinad, served with fresh naan.",
    image: "/images/curries.jpg",
  },
  {
    title: "TRADITIONAL INDIAN DRINKS",
    subtitle: "From ₹49 / Glass",
    description:
      "Cool off with refreshing lassi, masala chai, jaljeera, or thandai—crafted with love and tradition.",
    image: "/images/drinks.jpg",
  },
];

export default function Gallery() {
  const [bannerUrl, setBannerUrl] = useState("/images/beer-banner.jpg");

  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await fetch("/api/banner");
        if (res.ok) {
          const data = await res.json();
          if (data?.imageUrl) setBannerUrl(data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
      }
    }
    fetchBanner();
  }, []);

  return (
    <section
      className="relative py-24 px-6 md:px-10 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: "url('/images/texture-bg.jpg')",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Heading */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
        <h2
          className="text-white text-4xl md:text-5xl font-semibold mb-4"
          style={{ fontFamily: "'Avenir LT STD', sans-serif" }}
        >
          TRY OUR SPECIAL DISHES
        </h2>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-16">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-72">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-black p-6 text-center flex flex-col flex-grow">
              <p
                className="text-[#C5A253] italic mb-2 text-lg"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {item.subtitle}
              </p>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm flex-grow">
                {item.description}
              </p>

              <Link
                href="/menu"
                className="mt-6 inline-block bg-[#C5A253] text-black px-6 py-2 rounded-full font-medium hover:bg-[#a78439] transition"
              >
                Explore more
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Clickable Banner (FORCED 6.4:1 RATIO) */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="w-full rounded-lg overflow-hidden shadow-xl">
          <Link href="/menu">
            <div className="relative w-full aspect-[32/5] overflow-hidden">
              <Image
                src={bannerUrl}
                alt="Banner"
                fill
                className="object-cover hover:opacity-90 transition"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
