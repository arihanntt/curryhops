"use client";
import { useEffect, useState } from "react";

export default function AboutClient() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/faq-bg.jpg')",
          backgroundPositionY: `${offsetY * 0.4}px`,
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            About Curry & Hops
          </h1>
          <p className="text-amber-400 tracking-wide uppercase text-sm">
            Where Spice Meets Craft
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <h2 className="font-playfair text-3xl md:text-4xl mb-6">
          A Modern Indian Bistro in Mohali
        </h2>
        <div className="w-20 h-1 bg-amber-400 mx-auto mb-8" />
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Curry & Hops is a contemporary Indian bistro that celebrates the
          harmony of bold Indian spices and finely crafted brews. Located in
          Mohali, just minutes from Chandigarh, we bring together thoughtfully
          curated cuisine, warm hospitality, and a vibrant dining atmosphere.
        </p>
      </section>

      {/* Vision */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-playfair text-2xl md:text-3xl mb-4">
              Our Vision
            </h3>
            <div className="w-16 h-1 bg-amber-400 mb-6" />
            <p className="text-gray-600 leading-relaxed">
              To create a unique dining experience that celebrates the fusion of
              exquisite curry flavors and finely crafted beers — becoming a
              cherished destination for food and beer enthusiasts alike.
            </p>
          </div>
          <div className="text-gray-600 leading-relaxed">
            <p>
              Every dish at Curry & Hops is designed to tell a story — rooted in
              tradition, elevated with creativity, and presented with care. Our
              space is crafted for conversations, celebrations, and moments
              worth remembering.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="font-playfair text-3xl mb-12">
            What We Stand For
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Authentic Flavors
              </h4>
              <p className="text-gray-600 text-sm">
                Rooted in Indian culinary heritage with a modern approach.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Crafted Experiences
              </h4>
              <p className="text-gray-600 text-sm">
                Thoughtfully paired food and drinks in a refined setting.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Warm Hospitality
              </h4>
              <p className="text-gray-600 text-sm">
                A welcoming space designed for comfort and connection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
