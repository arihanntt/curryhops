'use client';

import Image from 'next/image';

export default function HomeMenuSection() {
  const menuItems = [
    {
      name: 'Long Island Iced Tea',
      desc: 'Vodka, Rum, Tequila, Gin, Triple sec, Lime juice, Coke',
      price: '₹595',
    },
    {
      name: 'Bull frog',
      desc: 'vodka rum, tequila , gin triple sec , blue curacao ,lime',
      price: '₹299',
    },
    {
      name: 'Tokyo iced tea',
      desc: 'Vodka ,Rum , Gin , triple sec , mlon liquer ,sweer and sour, top up with lemonade',
      price: '₹595',
    },
    {
      name: 'Texas iced tea',
      desc: 'Vodka , rum , tequila , Gin ,Triple sec , Whiskey , sweet & sour , coke',
      price: '₹595',
    },
  ];

  const leftItems = menuItems.slice(0, Math.ceil(menuItems.length / 2));
  const rightItems = menuItems.slice(Math.ceil(menuItems.length / 2));

  return (
    <section className="relative bg-[#f9f5f0] py-20 px-4 sm:px-6 md:px-20 font-['Playfair_Display'] overflow-hidden">
      {/* Background Overlays - Optimized Alt Tags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/overlay-left.png"
          alt="Decorative menu background element for Curry & Hops Mohali"
          width={400}
          height={400}
          className="absolute left-10 top-1/3 opacity-20"
        />
        <Image
          src="/images/overlay-right.png"
          alt="Curry & Hops Brewing Co decoration"
          width={500}
          height={500}
          className="absolute right-16 top-1/2 opacity-20"
        />
      </div>

      {/* Section Title - SEO Optimized */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-wide uppercase">
          Our Signature LIITs in Mohali
        </h2>
        <div className="w-16 h-0.5 bg-[#c9a84e] mx-auto mt-4" />
        {/* SEO Context Paragraph */}
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto font-sans text-sm md:text-base leading-relaxed">
          Experience the best Long Island Iced Teas in Mohali. From our classic Tokyo 
          Iced Tea to the tropical Hawaiian twist, our cocktails are crafted for 
          the perfect night out near Chandigarh.
        </p>
      </div>

      {/* Two Column Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto relative z-10">
        {/* Left Column */}
        <div className="space-y-6">
          {leftItems.map((item, i) => (
            <article
              key={i}
              className="flex justify-between items-start border-b border-dotted border-gray-400 pb-2"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 font-sans">{item.desc}</p>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap ml-4">
                {item.price}
              </span>
            </article>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightItems.map((item, i) => (
            <article
              key={i}
              className="flex justify-between items-start border-b border-dotted border-gray-400 pb-2"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 font-sans">{item.desc}</p>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap ml-4">
                {item.price}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}