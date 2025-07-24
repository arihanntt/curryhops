'use client';

import Image from 'next/image';

const items = [
  {
    title: 'AUTHENTIC TANDOORI PLATTERS',
    subtitle: 'From ₹199 / Plate',
    description:
      'Juicy kebabs, smoky paneer tikka, and sizzling tandoori delights straight from the clay oven.',
    image: '/images/tandoori.jpg',
  },
  {
    title: 'SIGNATURE INDIAN CURRIES',
    subtitle: 'From ₹149 / Bowl',
    description:
      'Rich, aromatic gravies like butter chicken, paneer butter masala, and spicy chettinad, served with fresh naan.',
    image: '/images/curries.jpg',
  },
  {
    title: 'TRADITIONAL INDIAN DRINKS',
    subtitle: 'From ₹49 / Glass',
    description:
      'Cool off with refreshing lassi, masala chai, jaljeera, or thandai—crafted with love and tradition.',
    image: '/images/drinks.jpg',
  },
];

export default function Gallery() {
  return (
    <section
      className="relative py-24 px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: "url('/images/texture-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Heading Section */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
        <h2
          className="text-black text-4xl md:text-5xl font-semibold mb-4"
          style={{ fontFamily: "'Avenir LT STD', sans-serif" }}
        >
          Our Selections
        </h2>
        <p
          className="text-black text-lg md:text-xl max-w-2xl mx-auto"
          style={{ fontFamily: "'Poppins', 'Avenir Next', sans-serif" }}
        >
          Experience a curated selection of dishes that elevate every moment.
        </p>
      </div>

      {/* Gallery Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl group"
          >
            {/* Background Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
              <h3
                className="text-2xl md:text-3xl font-light mb-2"
                style={{ fontFamily: "'Poppins', 'Avenir Next', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-sm uppercase tracking-wide mb-4 text-[#F4A948]">
                {item.subtitle}
              </p>
              <p className="text-sm leading-relaxed text-[#fefefe]/90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
