"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="relative bg-[#132254] text-white py-24 px-6 md:px-20 -mt-16 z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE TEXT */}
        <div>
          <p
            className="text-[#D9B68A] italic text-xl mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            About our pub
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            «Our pub is always fun atmosphere, the freshest beer and delicious
            food. You always want to come back again»
          </h2>
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex justify-center md:justify-end gap-20 pr-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center space-y-3">
            <Image
              src="/images/music.png"
              alt="Live Music"
              width={60}
              height={60}
            />
            <p className="font-semibold">Live Music</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center space-y-3">
            <Image
              src="/images/dishes.png"
              alt="Amazing Dishes"
              width={60}
              height={60}
            />
            <p className="font-semibold">Amazing Dishes</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center space-y-3">
            <Image
              src="/images/beer.png"
              alt="Craft Beer"
              width={60}
              height={60}
            />
            <p className="font-semibold">Craft Beer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
