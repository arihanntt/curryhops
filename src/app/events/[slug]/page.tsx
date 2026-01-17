import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ClockIcon, MapPinIcon, ArrowLeftIcon, ArrowLongRightIcon, TicketIcon } from "@heroicons/react/24/outline";
import EventShareButton from "@/components/EventShareButton";

export const dynamic = "force-dynamic";

// --- 1. DATA FETCHING ---
async function getEvent(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/events/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

async function getRelatedEvents(currentSlug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/events`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const allEvents = await res.json();
    return Array.isArray(allEvents) 
      ? allEvents.filter((e: any) => e.slug !== currentSlug).slice(0, 2) 
      : [];
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEvent(params.slug);
  if (!event) return { title: "Event Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curryandhops.com";
  return {
    title: `${event.title} | Exclusive Events | Curry & Hops`,
    description: event.summary,
    openGraph: {
      images: [{ url: event.image || '/images/events-hero.jpg' }],
    }
  };
}

export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  const relatedEvents = await getRelatedEvents(params.slug);

  if (!event) return notFound();

  const eventDate = new Date(event.date);
  const dayNum = eventDate.getDate().toString().padStart(2, '0');
  const monthName = eventDate.toLocaleDateString("en-US", { month: "long" });
  const weekday = eventDate.toLocaleDateString("en-US", { weekday: "long" });
  const shareUrl = `https://curryandhops.com/events/${event.slug}`;

  return (
    <main className="bg-[#050505] text-[#e5e5e5] min-h-screen selection:bg-amber-500/30">
      
      {/* Editorial Header - Vertical Date + Title */}
      <section className="relative h-[90vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image || "/images/events-hero.jpg"}
            alt={event.title}
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-20 grid lg:grid-cols-[120px_1fr] gap-12">
          {/* Vertical Date Bar */}
          <div className="hidden lg:flex flex-col items-center justify-center border-l border-white/10 h-fit py-8 gap-4">
             <span className="text-amber-500 font-bold uppercase tracking-[0.3em] vertical-text transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>{monthName}</span>
             <span className="text-6xl font-serif text-white">{dayNum}</span>
             <div className="w-px h-24 bg-gradient-to-b from-amber-500 to-transparent"></div>
          </div>

          <div className="max-w-4xl">
            <Link href="/events" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-8 hover:gap-4 transition-all">
               <ArrowLeftIcon className="h-4 w-4" /> The Collection
            </Link>
            <h1 className="text-6xl md:text-9xl font-light text-white tracking-tighter leading-none mb-10">
              {event.title.split(' ').map((word: string, i: number) => 
                i % 2 === 1 ? <span key={i} className="italic font-serif text-amber-500/90 block md:inline"> {word} </span> : word + ' '
              )}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-sm tracking-[0.2em] uppercase text-gray-400 font-bold">
               <span className="flex items-center gap-2"><ClockIcon className="h-5 w-5 text-amber-600"/> {event.time}</span>
               <span className="flex items-center gap-2"><MapPinIcon className="h-5 w-5 text-amber-600"/> {event.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="container mx-auto px-6 lg:px-20 py-32 grid lg:grid-cols-[1fr_400px] gap-20 lg:gap-32">
        
        <div className="space-y-16">
          {/* Summary Quote */}
          {event.summary && (
            <div className="relative">
              <div className="absolute -left-8 top-0 text-8xl text-amber-500/10 font-serif leading-none">“</div>
              <p className="text-3xl md:text-4xl font-light text-white leading-tight italic font-serif">
                {event.summary}
              </p>
            </div>
          )}

          {/* Details - High End Typography */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">The Experience</h3>
            <div className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed space-y-8">
              {/* This splits text by new lines and renders paragraphs for better readability */}
              {event.details?.split('\n').map((para: string, i: number) => (
                para ? <p key={i}>{para}</p> : <br key={i}/>
              ))}
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row gap-12 items-start md:items-center">
             <Link href="/menu" className="group">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Culinary Pairings</span>
                <span className="text-xl text-white border-b border-white/10 pb-1 group-hover:border-amber-500 transition-all flex items-center gap-3 italic font-serif">
                   Explore the Menu <ArrowLongRightIcon className="h-5 w-5 text-amber-500" />
                </span>
             </Link>
          </div>
        </div>

        {/* Sidebar - Reservations Card */}
        <aside className="space-y-16">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-10 rounded-sm sticky top-32">
            <TicketIcon className="h-10 w-10 text-amber-500 mb-8" />
            <h4 className="text-2xl font-light text-white mb-4">Secure your Table</h4>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">
              Limited capacity available for exclusive events. For premium lounge seating or VIP reservations, contact our concierge directly.
            </p>
            
            <a 
              href="tel:+918699966565" 
              className="flex flex-col gap-1 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-amber-500 transition-colors">Direct Dial</span>
              <span className="text-2xl font-bold text-white tracking-tighter">(+91) 86999-66565</span>
            </a>

            <div className="mt-12 pt-8 border-t border-white/5">
               <h5 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-6">Invitations</h5>
               <EventShareButton 
                title={event.title} 
                text={event.summary} 
                url={shareUrl} 
              />
            </div>
          </div>
        </aside>
      </section>

      {/* Recommended Events */}
      {relatedEvents.length > 0 && (
        <section className="py-32 px-6 lg:px-20 border-t border-white/5 bg-[#030303]">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-600 mb-20 text-center">Other Engagements</h2>
          <div className="grid md:grid-cols-2 gap-20 max-w-6xl mx-auto">
             {relatedEvents.map((ev: any) => (
                <Link key={ev._id} href={`/events/${ev.slug}`} className="group block text-center space-y-6">
                   <div className="relative aspect-[16/9] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <Image src={ev.image || "/images/events-hero.jpg"} alt={ev.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                   </div>
                   <h3 className="text-2xl font-light text-white group-hover:text-amber-500 transition-colors">{ev.title}</h3>
                </Link>
             ))}
          </div>
        </section>
      )}
    </main>
  );
}