"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events?t=${Date.now()}`, { 
      cache: "no-store",
      headers: { "Pragma": "no-cache" } 
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Helper to split date into Day and Month
  const getDateParts = (dateString: string) => {
    if (!dateString) return { day: "??", month: "TBA" };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { day: "??", month: "INV" };
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    };
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen relative overflow-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/events-hero.jpg"
            alt="Events Hero"
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm md:text-base font-bold mb-4">
              Curry & Hops Presents
            </h2>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
              UPCOMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600">EVENTS</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-300 text-lg md:text-xl font-light">
              Live music, special tastings, and unforgettable nights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-20 -mt-20">
        {loading && (
           <div className="flex justify-center items-center h-40">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
           </div>
        )}

        {!loading && events.length === 0 && (
           <div className="text-center py-24 bg-neutral-900/50 border border-white/5 rounded-3xl backdrop-blur-sm">
              <p className="text-2xl text-gray-500 font-light">No upcoming events scheduled.</p>
              <p className="text-gray-600 mt-2">Check back soon for updates.</p>
           </div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {events.map((ev, index) => {
            const { day, month, weekday } = getDateParts(ev.date);

            return (
              <motion.div
                key={ev._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={ev.slug ? `/events/${ev.slug}` : "#"} className="group block">
                  <article className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 shadow-2xl hover:shadow-amber-900/10 group-hover:-translate-y-1">
                    
                    <div className="grid md:grid-cols-[400px_1fr] h-full">
                      {/* IMAGE SIDE */}
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-transparent transition-colors z-10" />
                        <Image
                          src={ev.image || "/images/events-hero.jpg"}
                          alt={ev.title || "Event"}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        
                        {/* DATE BADGE (Mobile Overlay) */}
                        <div className="absolute top-4 left-4 md:hidden bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center z-20">
                          <span className="block text-xs text-amber-500 font-bold uppercase">{month}</span>
                          <span className="block text-2xl font-black text-white">{day}</span>
                        </div>
                      </div>

                      {/* CONTENT SIDE */}
                      <div className="p-8 md:p-10 flex flex-col justify-between relative">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition duration-700" />

                        <div className="relative z-10">
                          {/* Desktop Date Row */}
                          <div className="hidden md:flex items-center gap-4 mb-6 text-amber-500">
                            <span className="text-4xl font-black tracking-tighter text-white/90">{day}</span>
                            <div className="h-8 w-[1px] bg-white/20" />
                            <span className="text-sm font-bold tracking-widest uppercase">{month}</span>
                            <span className="text-sm font-light text-gray-400">/ {weekday}</span>
                          </div>

                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-amber-400 transition-colors">
                            {ev.title || "Untitled Event"}
                          </h2>

                          {/* Info Row */}
                          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6 font-medium">
                            {ev.time && (
                              <div className="flex items-center gap-2">
                                <ClockIcon className="h-5 w-5 text-amber-600" />
                                {ev.time}
                              </div>
                            )}
                            {ev.location && (
                              <div className="flex items-center gap-2">
                                <MapPinIcon className="h-5 w-5 text-amber-600" />
                                {ev.location}
                              </div>
                            )}
                          </div>

                          <p className="text-gray-400 leading-relaxed max-w-lg line-clamp-2">
                            {ev.summary || "Click to read full details about this upcoming event."}
                          </p>
                        </div>

                        {/* Bottom Action */}
                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                            Limited Capacity
                          </span>
                          <span className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform duration-300">
                            Get Tickets / Info 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}