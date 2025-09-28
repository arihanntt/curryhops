"use client";

import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "AUTHENTIC TANDOORI PLATTERS",
    subtitle: "From ₹199 / Plate",
    description:
      "Juicy kebabs, smoky paneer tikka, and sizzling tandoori delights straight from the clay oven.",
    image: "/images/tandoori.jpg",
    price: "₹199",
  },
  {
    title: "SIGNATURE INDIAN CURRIES",
    subtitle: "From ₹149 / Bowl",
    description:
      "Rich, aromatic gravies like butter chicken, paneer butter masala, and spicy chettinad, served with fresh naan.",
    image: "/images/curries.jpg",
    price: "₹149",
  },
  {
    title: "TRADITIONAL INDIAN DRINKS",
    subtitle: "From ₹49 / Glass",
    description:
      "Cool off with refreshing lassi, masala chai, jaljeera, or thandai—crafted with love and tradition.",
    image: "/images/drinks.jpg",
    price: "₹49",
  },
];

export default function Gallery() {
  return (
    <section
      className="relative py-24 px-6 md:px-10 lg:px-20"
      style={{
        backgroundImage: "url('/images/texture-bg.jpg')",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Heading Section */}
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
            {/* Image with Price Tag */}
            <div className="relative w-full h-72">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                {item.price}
              </div>
            </div>

            {/* Content */}
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

              {/* Button linking to /menu */}
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

      {/* Banner Image Placeholder */}
     {/* Banner Image Placeholder */}
<div className="relative z-10 max-w-7xl mx-auto">
  <div className="w-full rounded-lg overflow-hidden shadow-xl">
    <Image
      src="/images/beer-banner.jpg" // replace with your banner
      alt="Banner"
      width={1200}   // set your banner’s actual width
      height={300}   // set your banner’s actual height
      className="w-full h-auto object-contain" // keeps full image, no zoom
    />
  </div>
</div>

    </section>
  );
}
