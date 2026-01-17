"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ClockIcon, MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getDateParts = (dateString: string) => {
    if (!dateString) return { day: "??", month: "TBA", iso: "" };
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
      iso: date.toISOString(),
    };
  };

  return (
    <main className="bg-[#080808] text-[#e5e5e5] min-h-screen font-sans selection:bg-amber-500/30">
      {/* Dynamic SEO Schema - Only injected once events load to prevent hydration warning */}
      {!loading && events.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": events.map((ev, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": `https://curryandhops.com/events/${ev.slug}`,
                "name": ev.title
              }))
            })
          }}
        />
      )}

      {/* Editorial Hero Section */}
      <section className="relative h-[85vh] flex items-center px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events-hero.jpg"
            alt="Curry and Hops Atmosphere"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block text-amber-500 tracking-[0.4em] uppercase text-xs font-bold mb-6 border-l-2 border-amber-500 pl-4">
              The Stage is Set
            </span>
            <h1 className="text-6xl md:text-9xl font-light text-white tracking-tighter leading-none mb-8">
              Where <span className="italic font-serif">Spice</span> <br /> 
              Meets <span className="text-amber-500 font-serif">Craft.</span>
            </h1>
            <p className="max-w-xl text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 border-l border-white/10 pl-6">
              Exclusive evenings curated for the refined palate. From soulful Sufi unplugged to high-octane craft tastings, experience the legendary vibe of Curry & Hops.
            </p>
          </motion.div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block animate-bounce opacity-20">
          <div className="w-[1px] h-20 bg-white" />
        </div>
      </section>

      {/* Minimalist Events Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <h2 className="text-4xl font-light tracking-tight text-white">
            Upcoming <span className="text-gray-500">Events</span>
          </h2>
          <div className="text-gray-500 text-sm tracking-widest uppercase">
            {events.length} Limited Events Scheduled
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <AnimatePresence>
            {loading ? (
              <div className="col-span-full py-20 flex justify-center">
                <div className="w-10 h-10 border-t-2 border-amber-500 rounded-full animate-spin" />
              </div>
            ) : events.length === 0 ? (
              <div className="col-span-full text-center py-32 border-y border-white/5">
                <p className="text-2xl font-light text-gray-600">The calendar is being curated. Stay tuned.</p>
              </div>
            ) : (
              events.map((ev, index) => {
                const { day, month, iso } = getDateParts(ev.date);
                return (
                  <motion.div
                    key={ev._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/events/${ev.slug}`} className="block space-y-8">
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 rounded-sm">
                        <Image
                          src={ev.image || "/images/events-hero.jpg"}
                          alt={ev.title}
                          fill
                          className="object-cover transition-transform duration-1000 scale-[1.02] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Overlay Date */}
                        <div className="absolute bottom-0 left-0 bg-[#080808] p-6 pr-10">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-serif text-white">{day}</span>
                            <span className="text-xs tracking-widest text-amber-500 uppercase font-bold">{month}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-gray-500">
                          <span className="flex items-center gap-1.5"><ClockIcon className="w-3 h-3"/> {ev.time}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5"><MapPinIcon className="w-3 h-3"/> {ev.location}</span>
                        </div>
                        <h3 className="text-3xl font-light tracking-tight text-white group-hover:text-amber-500 transition-colors duration-300">
                          {ev.title}
                        </h3>
                        <p className="text-gray-500 font-light leading-relaxed line-clamp-2 max-w-md">
                          {ev.summary || "An evening of unparalleled atmosphere and culinary excellence."}
                        </p>
                        
                        <div className="pt-4 flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-white group-hover:gap-6 transition-all duration-300">
                          Discover More <ArrowRightIcon className="w-4 h-4 text-amber-500" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </section>

     {/* Footer Teaser */}
<section className="py-32 px-6 text-center border-t border-white/5">
  <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-6">Experience the Craft.</h2>
  <p className="text-gray-500 mb-10 font-light tracking-wide">
    For private bookings or table reservations, please contact our concierge.
  </p>
  
  {/* ✅ Changed to <a> with tel: for click-to-call functionality */}
  <a 
    href="tel:+918699966565" 
    className="inline-block px-10 py-4 border border-white/20 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
  >
    Book Table
  </a>
</section>
    </main>
  );
}