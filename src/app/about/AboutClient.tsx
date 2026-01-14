"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-hidden">
      
      {/* --- NEW HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        
        {/* Background Gradients for Depth */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-stone-50 to-white -z-10" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-orange-50/50 rounded-full blur-3xl -z-10" />

        {/* Text Content */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12 relative z-10 animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-full border border-stone-200 bg-white text-stone-500 text-xs font-bold tracking-widest uppercase shadow-sm">
            Est. 2025 · Mohali
          </span>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.1]">
            Curry <span className="italic text-amber-600 font-light">&</span> Hops
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
            A modern love letter to Indian heritage, written in spice and sealed with a craft brew.
          </p>
        </div>

        {/* Hero Image - Stable, Rounded, Priority Loading */}
        <div className="relative w-full max-w-6xl h-[50vh] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-stone-200 border-4 border-white">
           <Image 
             src="https://static1.squarespace.com/static/58c9781a2994cabb5d4804e5/58d2e9c92e69cfb75f61830f/6908fdb4dae0d71c304b81f2/1762197492749/Chandi-Hospitality-2.webp?format=1500w" 
             alt="Bright and airy restaurant interior with plants" 
             fill
             priority // <--- Forces image to load immediately
             className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
           />
           {/* Subtle Overlay to make it feel premium */}
           <div className="absolute inset-0 bg-black/10" />
        </div>

      </section>

      {/* --- THE NARRATIVE --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
              Reimagining the <br/>
              <span className="italic text-amber-600">Indian Table</span>
            </h2>
            <div className="h-1 w-20 bg-amber-200" />
            <div className="space-y-6 text-stone-600 text-lg leading-loose font-light">
              <p>
                Nestled in the vibrant heart of Mohali, Curry & Hops was born from a desire to bridge the gap between nostalgic comfort and modern dining. We wanted a place where the aroma of freshly ground spices could mingle freely with the crisp notes of artisanal hops.
              </p>
              <p>
                We believe that Indian cuisine is a living, breathing art form. It doesn't just belong in the past; it belongs right here, paired with a cold Stout or a zesty IPA, surrounded by laughter and good conversation.
              </p>
            </div>
            <div className="pt-4">
               <span className="font-handwriting text-4xl text-stone-400 rotate-[-5deg] inline-block">
                 Bon Appétit!
               </span>
            </div>
          </div>

          {/* Right: Image Mosaic */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                 <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
                    <Image 
                      src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1887&auto=format&fit=crop" 
                      alt="Rich Curry" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
                 <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
                    <Image 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7zJ20rn9gzaXCNbT5vH6jaFofMP_p5SdFA&s" 
                      alt="Interior Detail" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
                    <Image 
                      src="https://www.learningwithexperts.com/cdn/shop/articles/b9d73d6e-6183-4562-97f7-5277b1c5f6b9.jpg?v=1729681279" 
                      alt="Craft Beer Pour" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
                 <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
                    <Image 
                      src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop" 
                      alt="Plated Food" 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-700" 
                    />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARALLAX BREAK --- */}
      <section 
        className="relative h-[50vh] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h3 className="font-serif text-3xl md:text-5xl italic tracking-wide">
            "Where spice meets craft."
          </h3>
        </div>
      </section>

      {/* --- PILLARS / VALUES --- */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            
            {/* Card 1 */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
              <div className="h-16 w-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                🌿
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Authentic Roots</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                We honor the recipes passed down through generations, using whole spices grounded daily in our kitchen.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative top-0 md:-top-8">
              <div className="h-16 w-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                🍺
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Craft Culture</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                From hoppy IPAs to smooth Stouts, our beer list is curated to cut through the spice and cleanse the palate.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
              <div className="h-16 w-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Warm Hospitality</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                We aren't just serving food; we are hosting friends. Our space is yours to relax, celebrate, and linger.
              </p>
            </div>

          </div>
        </div>
      </section>
{/* --- FOOTER CTA --- */}
<section className="py-24 px-6 text-center bg-white">
  <div className="max-w-2xl mx-auto space-y-8">
    <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
      Come taste the magic.
    </h2>

    <p className="text-stone-500 text-lg">
      We are open daily from 11:00 AM to 11:00 PM. <br />
      Walk-ins welcome, reservations encouraged.
    </p>

    <a
      href="tel:+918699966565"
      className="inline-block px-8 py-4 bg-stone-900 text-white rounded-full font-medium tracking-wide hover:bg-amber-600 transition-colors duration-300 shadow-lg hover:shadow-amber-200"
    >
      Book a Table
    </a>
  </div>
</section>

      {/* Global CSS for custom animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Caveat&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-handwriting { font-family: 'Caveat', cursive; }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}