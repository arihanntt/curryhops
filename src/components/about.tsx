"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="relative bg-[#071436] text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
        
        {/* LEFT SIDE TEXT */}
        <div className="space-y-6">
          <div>
            <p
              className="text-[#D9B68A] italic text-2xl mb-2"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              About Curry & Hops
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              A Modern Indian Restaurant <br className="hidden md:block" /> 
              & Brewing Co. in Mohali
            </h2>
          </div>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
            Our space in Mohali offers a lively atmosphere, freshly brewed craft beers,
            and thoughtfully prepared Indian cuisine. At Curry & Hops, every visit is
            designed to bring people together over great food, music, and memorable
            experiences near Chandigarh.
          </p>

          <Link
            href="/about"
            className="inline-block px-8 py-3 border border-[#D9B68A] text-[#D9B68A] 
                       hover:bg-[#D9B68A] hover:text-[#071436] transition-all 
                       duration-300 font-medium tracking-wide uppercase text-sm"
          >
            Learn More About Us
          </Link>
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 items-center">
          
          {/* Feature 1 - Live Events */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center mb-4 bg-white/5 group-hover:border-[#D9B68A] transition-colors">
              <Image
                src="/images/music.png"
                alt="Live events and music at Curry & Hops Brewing Co. Mohali"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <p className="font-semibold text-xs md:text-sm lg:text-base text-center uppercase tracking-wider">Live Events</p>
          </div>

          {/* Feature 2 - Amazing Dishes */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center mb-4 bg-white/5 group-hover:border-[#D9B68A] transition-colors">
              <Image
                src="/images/dishes.png"
                alt="Signature Indian dishes at Curry & Hops restaurant in Mohali"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <p className="font-semibold text-xs md:text-sm lg:text-base text-center uppercase tracking-wider">Amazing Dishes</p>
          </div>

          {/* Feature 3 - Craft Beer */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center mb-4 bg-white/5 group-hover:border-[#D9B68A] transition-colors">
              <Image
                src="/images/beer.png"
                alt="Craft beers brewed at Curry & Hops Brewing Co. Mohali"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <p className="font-semibold text-xs md:text-sm lg:text-base text-center uppercase tracking-wider">Craft Beer</p>
          </div>

        </div>
      </div>
    </section>
  );
}