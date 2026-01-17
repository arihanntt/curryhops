import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ClockIcon, MapPinIcon, PhoneIcon, ArrowLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
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

// --- 2. SEO & WHATSAPP PREVIEW ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEvent(params.slug);
  if (!event) return { title: "Event Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curryandhops.com";
  const eventUrl = `${siteUrl}/events/${event.slug}`;
  const imageUrl = event.image?.startsWith("http") 
    ? event.image 
    : `${siteUrl}${event.image || '/images/events-hero.jpg'}`;

  return {
    title: `${event.title} | Curry & Hops Mohali`,
    description: event.summary || `Join us for ${event.title} in Mohali.`,
    openGraph: {
      title: event.title,
      description: event.summary,
      url: eventUrl,
      siteName: "Curry & Hops",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
  };
}

// --- 3. PAGE UI ---
export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  const relatedEvents = await getRelatedEvents(params.slug);

  if (!event) return notFound();

  const eventDate = new Date(event.date);
  const dayNum = eventDate.toLocaleDateString("en-US", { day: "numeric" });
  const monthName = eventDate.toLocaleDateString("en-US", { month: "short" });
  const weekday = eventDate.toLocaleDateString("en-US", { weekday: "long" });
  const isoDate = eventDate.toISOString();
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://curryandhops.com";
  const shareUrl = `${siteUrl}/events/${event.slug}`;

  // ✅ SEO: JSON-LD for Google Event Search Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": isoDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location || "Curry & Hops Brewing Co.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mohali",
        "addressRegion": "Punjab",
        "postalCode": "160062",
        "addressCountry": "IN"
      }
    },
    "image": [event.image || ""],
    "description": event.summary,
    "organizer": {
      "@type": "Organization",
      "name": "Curry & Hops",
      "url": siteUrl
    }
  };

  return (
    <main 
      className="bg-[#0a0a0a] text-gray-200 min-h-screen relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200"
      itemScope 
      itemType="https://schema.org/Event"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image || "/images/events-hero.jpg"}
            alt={event.title}
            fill
            className="object-cover"
            priority
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        </div>

        <div className="absolute top-28 left-6 md:left-12 z-50">
           <Link 
            href="/events" 
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Link>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-24 max-w-7xl">
          <div className="max-w-6xl">
            <h1 itemProp="name" className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-10 drop-shadow-2xl">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 md:gap-x-12 border-t border-white/10 pt-8 text-lg font-medium">
              <div className="flex items-center gap-3">
                 <span className="text-amber-500 text-3xl font-bold">{dayNum}</span>
                 <div className="flex flex-col leading-none">
                    <span className="text-white uppercase font-bold tracking-wider text-sm">{monthName}</span>
                    <span className="text-gray-400 text-sm">{weekday}</span>
                    <meta itemProp="startDate" content={isoDate} />
                 </div>
              </div>

              <div className="hidden sm:block w-[1px] h-10 bg-white/10"></div>

              {event.time && (
                <div className="flex items-center gap-3">
                   <ClockIcon className="h-6 w-6 text-amber-500" />
                   <span className="text-gray-200">{event.time}</span>
                </div>
              )}

              <div className="hidden sm:block w-[1px] h-10 bg-white/10"></div>

              {event.location && (
                <div className="flex items-center gap-3" itemProp="location" itemScope itemType="https://schema.org/Place">
                   <MapPinIcon className="h-6 w-6 text-amber-500" />
                   <span className="text-gray-200" itemProp="name">{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="relative z-20 container mx-auto px-6 md:px-12 py-24 max-w-7xl">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20 lg:gap-32">
          
          <div className="space-y-12">
            {event.summary && (
              <p itemProp="description" className="text-2xl md:text-3xl font-light text-white leading-normal">
                {event.summary}
              </p>
            )}

            <div className="prose prose-xl prose-invert max-w-none text-gray-400 font-light leading-loose 
              prose-headings:font-semibold prose-headings:text-white prose-headings:tracking-tight 
              prose-strong:text-amber-500 prose-a:text-white hover:prose-a:text-amber-500 prose-a:transition-colors">
              {event.details}
            </div>

            <div className="pt-16 mt-8 border-t border-white/5">
              <Link href="/menu" className="group inline-flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-amber-500 transition-colors">
                  Dining with us?
                </span>
                <span className="text-2xl text-white font-medium flex items-center gap-3">
                  View Our Menu <ArrowLongRightIcon className="h-6 w-6 text-amber-500 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-16 h-fit">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-600 mb-8">
                Reservations
              </h3>
              <div className="flex flex-col gap-2">
                <p className="text-white text-lg font-light">
                  Reserve a table or VIP section for this event.
                </p>
                <a 
                  href="tel:+918699966565" 
                  className="text-3xl font-bold text-amber-500 hover:text-amber-400 transition-colors tracking-tight"
                >
                  (+91) 86999-66565
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-600 mb-6">
                Share Event
              </h3>
              <EventShareButton 
                title={event.title} 
                text={event.summary || "Check out this event!"} 
                url={shareUrl} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- RELATED EVENTS --- */}
      {relatedEvents.length > 0 && (
        <section className="py-24 border-t border-white/5 bg-[#050505]">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <h2 className="text-4xl font-bold text-white mb-16 tracking-tight">Up Next</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {relatedEvents.map((ev: any) => (
                <Link key={ev._id} href={`/events/${ev.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden mb-6 bg-neutral-900">
                    <Image 
                      src={ev.image || "/images/events-hero.jpg"} 
                      alt={ev.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
                       <span>{new Date(ev.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                       {ev.time && (
                         <>
                           <span className="w-1 h-1 bg-amber-500/50 rounded-full"></span>
                           <span>{ev.time}</span>
                         </>
                       )}
                    </div>
                    <h3 className="text-3xl font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                      {ev.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}