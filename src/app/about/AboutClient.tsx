"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function About() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* Subtle spice particles */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#dc2626" : "#fbbf24",
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <section
        className="relative h-screen min-h-[600px] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://growomaha.com/wp-content/uploads/2024/12/Jaipur-restaurant-review-featured-image.jpg')",
          backgroundPositionY: `${offsetY * 0.5}px`,
        }}
      >
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.5em] text-amber-500 mb-6 font-light">
            Curry & Hops
          </p>
          <h1 className="font-playfair italic text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-8">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-amber-200 max-w-2xl mx-auto leading-relaxed">
            Where bold Indian spices dance with finely crafted brews in perfect harmony.
          </p>
        </div>
      </section>

      {/* Intro Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl mb-6">Our Story</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-10" />
          <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Nestled in the heart of Mohali, just moments from Chandigarh, Curry & Hops was born from a simple passion: 
            to reimagine Indian cuisine through a modern lens while celebrating the art of craft brewing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              We believe great food isn’t just about flavor — it’s about stories, memories, and connections. 
              Every curry on our menu is crafted with time-honored techniques, fresh ingredients, and a touch of innovation.
            </p>
            <p>
              Paired with our carefully curated selection of craft beers — from crisp IPAs to rich stouts — 
              each dish finds its perfect companion, creating an unforgettable symphony on your palate.
            </p>
            <p>
              Our space is warm, vibrant, and inviting — designed for long conversations, celebrations, and quiet moments alike.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image src="https://media.istockphoto.com/id/639389404/photo/authentic-indian-food.jpg?s=612x612&w=0&k=20&c=gbfAu17L1gtHmuo5biByhfCefAtYUtGQpyxMmi9_Mus=" alt="Authentic Indian curry spread" width={600} height={400} className="rounded-xl object-cover shadow-2xl" />
            <Image src="https://thumbs.dreamstime.com/b/hot-spicy-chicken-tikka-masala-bowl-curry-rice-indian-naan-butter-bread-spices-herbs-traditional-indian-british-89956761.jpg" alt="Butter chicken with naan" width={600} height={400} className="rounded-xl object-cover shadow-2xl mt-8" />
            <Image src="https://bdc2020.o0bc.com/wp-content/uploads/2023/01/IMG_3576l-63d283f7b3aeb-scaled.jpg" alt="Craft beer flight pairing" width={600} height={400} className="rounded-xl object-cover shadow-2xl" />
            <Image src="https://growomaha.com/wp-content/uploads/2024/12/Rockbrook-dining-area-3-1024x768.jpg" alt="Warm restaurant interior" width={600} height={400} className="rounded-xl object-cover shadow-2xl mt-8" />
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#141414] to-transparent">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl mb-16">What Drives Us</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="mb-6">
                <Image src="https://thumbs.dreamstime.com/b/top-down-vibrant-spice-collection-colorful-assortment-indian-spices-like-turmeric-chili-powder-small-bowls-displayed-336188440.jpg" alt="Vibrant Indian spices" width={400} height={300} className="rounded-full mx-auto object-cover w-48 h-48 shadow-xl group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-amber-400">Authentic Roots</h3>
              <p className="text-gray-400">Honoring India’s rich culinary heritage with every spice and technique.</p>
            </div>

            <div className="group">
              <div className="mb-6">
                <Image src="https://phulkari.com.au/wp-content/uploads/2023/07/image-1024x576.png" alt="Signature butter chicken" width={400} height={300} className="rounded-full mx-auto object-cover w-48 h-48 shadow-xl group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-amber-400">Creative Fusion</h3>
              <p className="text-gray-400">Elevating tradition with modern flair and perfect beer pairings.</p>
            </div>

            <div className="group">
              <div className="mb-6">
                <Image src="https://assets.architecturaldigest.in/photos/671f2004bab720c3b573ea2a/master/w_1600%2Cc_limit/Bungalow3.jpg" alt="Cozy dining atmosphere" width={400} height={300} className="rounded-full mx-auto object-cover w-48 h-48 shadow-xl group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-amber-400">Warm Hospitality</h3>
              <p className="text-gray-400">A welcoming home for laughter, celebration, and connection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call */}
      <section className="py-24 text-center px-6">
        <p className="text-2xl md:text-3xl text-amber-300 italic max-w-3xl mx-auto leading-relaxed">
          Come experience the magic where spice meets craft.
          <br />
          We can’t wait to welcome you.
        </p>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(8deg); }
        }
        .animate-float > div {
          animation: float linear infinite;
        }
      `}</style>
    </main>
  );
}