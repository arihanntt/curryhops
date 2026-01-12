'use client';

import Image from 'next/image';

export default function HomeMenuSection() {
  const menuItems = [
    {
      name: 'Aloo Paratha',
      desc: 'Stuffed flatbread with spiced potato, served with butter & curd',
      price: '₹129',
    },
    {
      name: 'Paneer Paratha',
      desc: 'Stuffed paneer paratha with pickle & curd',
      price: '₹149',
    },
    {
      name: 'Chole Bhature',
      desc: 'Fluffy bhature with spicy chickpeas',
      price: '₹149',
    },
    {
      name: 'Amritsari Kulcha',
      desc: 'Crispy stuffed kulcha with chana and chutney',
      price: '₹159',
    },
    {
      name: 'Lassi',
      desc: 'Traditional Punjabi yogurt drink, sweet or salty',
      price: '₹89',
    },
    {
      name: 'Gulab Jamun',
      desc: 'Soft milk dumplings soaked in sugar syrup',
      price: '₹99',
    },
  ];

  const leftItems = menuItems.slice(0, Math.ceil(menuItems.length / 2));
  const rightItems = menuItems.slice(Math.ceil(menuItems.length / 2));

  return (
    <section className="relative bg-[#f9f5f0] py-20 px-4 sm:px-6 md:px-20 font-['Playfair_Display']">
      {/* Background Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/overlay-left.png"
          alt="Overlay Left"
          width={400}
          height={400}
          className="absolute left-10 top-1/3 opacity-20"
        />
        <Image
          src="/images/overlay-right.png"
          alt="Overlay Right"
          width={500}
          height={500}
          className="absolute right-16 top-1/2 opacity-20"
        />
      </div>

      {/* Section Title */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-wide">
          Featured Dishes
        </h2>
        <div className="w-16 h-0.5 bg-[#c9a84e] mx-auto mt-4" />
      </div>

      {/* Two Column Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto relative z-10">
        {/* Left Column */}
        <div className="space-y-6">
          {leftItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start border-b border-dotted border-gray-400 pb-2"
            >
              <div>
                <h4 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start border-b border-dotted border-gray-400 pb-2"
            >
              <div>
                <h4 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
