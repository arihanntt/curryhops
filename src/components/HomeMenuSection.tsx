'use client';

import Image from 'next/image';
import React from 'react';

export default function HomeMenuSection() {
  const menuItems = [
  { name: 'Aloo Paratha', desc: 'Stuffed flatbread with spiced potato, served with butter & curd', price: '₹129' },
  { name: 'Chole Bhature', desc: 'Fluffy bhature with spicy chickpeas', price: '₹149' },
  { name: 'Paneer Paratha', desc: 'Stuffed paneer paratha with pickle & curd', price: '₹149' },
  { name: 'Lassi', desc: 'Traditional Punjabi yogurt drink, sweet or salty', price: '₹89' },
  { name: 'Pindi Chana', desc: 'Tangy and spicy chickpeas curry', price: '₹139' },
  { name: 'Amritsari Kulcha', desc: 'Crispy stuffed kulcha with chana and chutney', price: '₹159' },
  { name: 'Besan Chilla', desc: 'Gram flour pancakes with onion & spices', price: '₹99' },
  { name: 'Poha', desc: 'Flattened rice with mustard seeds and veggies', price: '₹89' },
  { name: 'Halwa Puri', desc: 'Soft puris served with suji halwa', price: '₹129' },
  { name: 'Masala Chai', desc: 'Spiced Indian tea with milk and sugar', price: '₹49' },
];


  return (
    <section className="relative bg-[#f9f5f0] py-24 px-6 md:px-20 overflow-hidden font-['Raleway']">
      {/* 🔳 Background Texture Image */}
      <Image
        src="/images/bg-texture.jpg" // replace with your background texture
        alt="Background Texture"
        fill
        className="object-cover opacity-70 z-0"
      />

      {/* 🧁 Title Centered */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
        <p className="italic text-gray-500 mb-2 font-['Playfair_Display']">
          Enjoy a complete food experience
        </p>
        <h2 className="text-4xl md:text-5xl font-bold font-['Raleway'] tracking-wide text-gray-600">
          OUR DELICIOUS MENU
        </h2>
      </div>

      {/* 🍰 Menu and Image Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
        {/* Left Side */}
        <div className="md:w-1/2 w-full relative flex justify-center md:justify-start">
          <h2 className="absolute text-[120px] md:text-[80px] font-bold text-gray-500 z-0 leading-none top-[0%] left-[3%] md:block hidden font-['Playfair_Display'] tracking-tight">
            BREAK<br />FAST
          </h2>

          <Image
            src="/images/menu-visual.png"
            alt="Dessert visual"
            width={500}
            height={500}
            className="relative z-10 -mt-10"
          />
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-3 border-gray-300 group hover:bg-[#f1e9e0] hover:shadow-sm px-2 transition-all rounded"
              >
                <div>
                  <h4 className="font-semibold text-lg text-black">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <span className="font-semibold text-black">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center md:text-left">
            <button className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">
              SEE MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
