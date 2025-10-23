"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  summary?: string;
  details?: string;
  rsvpUrl?: string;
};

const sampleEvents: EventItem[] = [
  {
    id: "e1",
    title: "Monsoon Tandoor Night — Live Music & Grill",
    date: "2025-10-25",
    time: "7:30 PM",
    location: "Rooftop, The Spice House",
    image: "/images/events-hero.jpg",
    summary:
      "An evening of smoky tandoori specials, acoustic music, and handcrafted cocktails.",
    details:
      "Join us for a curated 4-course tandoori menu, live acoustic set by local artists, and complimentary welcome drink for early guests. Seating is limited — reserve early!",
    rsvpUrl: "/reserve?event=e1",
  },
  {
    id: "e2",
    title: "Sunday Brunch — Endless Lassis",
    date: "2025-11-02",
    time: "11:00 AM",
    location: "Garden Hall",
    image: "/images/events-hero.jpg",
    summary: "Family-friendly brunch with live DJ and kids’ activities.",
    details:
      "Brunch buffet featuring classic Indian brunch favorites, DIY chaat corner, and a special kids’ zone with face painting and storytelling.",
    rsvpUrl: "/reserve?event=e2",
  },
  {
    id: "e3",
    title: "Spice Route — Regional Curry Tasting",
    date: "2025-11-15",
    time: "6:30 PM",
    location: "Main Dining",
    image: "/images/events-hero.jpg",
    summary:
      "Taste a flight of curries from five regions — small plates and pairing notes included.",
    details:
      "Expert-led tasting: learn about spice blends, regional techniques, and suggested pairings. Optional spice level adjustments available.",
    rsvpUrl: "/reserve?event=e3",
  },
  {
    id: "e4",
    title: "Festival Feast — Diwali Specials",
    date: "2025-10-31",
    time: "8:00 PM",
    location: "Banquet Hall",
    image: "/images/events-hero.jpg",
    summary:
      "A festival night with special sweets, thalis, and live cultural performance.",
    details:
      "Celebrate Diwali with an elaborate festive menu, traditional dance performance, and fireworks viewing on the terrace.",
    rsvpUrl: "/reserve?event=e4",
  },
];

export default function EventsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 4;
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY || 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleEvent = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  const totalPages = Math.ceil(sampleEvents.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sampleEvents.slice(start, start + PAGE_SIZE);
  }, [page]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-gray-100 font-poppins min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/events-hero.jpg')",
          backgroundSize: "cover",
          backgroundPositionY: `${offsetY * 0.4}px`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"></div>

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg text-white">
            Exclusive Events
          </h1>
          <p className="mt-4 text-sm text-gray-300 tracking-widest uppercase">
            <Link href="/" className="hover:text-white/90 transition-colors">
              Home
            </Link>{" "}
            / Events
          </p>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Experience fine dining, curated menus, and live performances crafted
            for the season’s best nights.
          </p>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 gap-10">
        {paginated.map((ev, index) => {
          const globalIndex = (page - 1) * PAGE_SIZE + index;
          const isOpen = openIndex === globalIndex;
          return (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={ev.image || "/images/events-hero.jpg"}
                  alt={ev.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-sm bg-white/10 px-3 py-1 rounded-full text-gray-100 backdrop-blur-md">
                  {formatDate(ev.date)} • {ev.time}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white leading-tight mb-1">
                  {ev.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{ev.location}</p>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {ev.summary}
                </p>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm mb-4"
                  >
                    <p>{ev.details}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link
                        href={ev.rsvpUrl ?? "/reserve"}
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                      >
                        RSVP
                      </Link>
                      <Link
                        href={`/events/${ev.id}`}
                        className="border border-white/20 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-white/10 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                )}

                <button
                  onClick={() => toggleEvent(globalIndex)}
                  className="mt-2 text-sm text-white/70 hover:text-white transition font-medium"
                >
                  {isOpen ? "Hide Details ↑" : "View Details ↓"}
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </motion.article>
          );
        })}
      </section>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 pb-16">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            page === 1
              ? "bg-white/5 text-gray-500 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-9 h-9 rounded-full text-sm transition-all ${
              page === i + 1
                ? "bg-white text-black font-semibold"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            page === totalPages
              ? "bg-white/5 text-gray-500 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}
