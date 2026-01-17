import type { Metadata } from "next";

// --- SEO CONFIGURATION FOR CURRY & HOPS EVENTS ---
export const metadata: Metadata = {
  // ✅ IMPROVED: Added "Live Music" and "Nightlife" hooks
  title: "Upcoming Events & Live Music",

  description:
    "Discover the best live music, Sufi nights, and DJ events in Mohali at Curry & Hops. Join us for unique dining experiences, festive celebrations, and family-friendly weekend events near Chandigarh.",

  keywords: [
    "Curry & Hops Mohali Events",
    "Live Music Mohali",
    "Sufi Night Mohali",
    "DJ Nights Mohali",
    "Best nightlife in Mohali",
    "Restaurant events Chandigarh",
    "Weekend live music Mohali",
    "Suncity Mohali nightlife",
    "Family events Mohali restaurant",
  ],

  openGraph: {
    title: "Live Music & Upcoming Events at Curry & Hops Mohali",
    description:
      "Join us for unforgettable Sufi nights, live bands, and special dining events in the heart of Mohali.",
    url: "https://curryandhops.com/events",
    siteName: "Curry & Hops Brewing Co.",
    images: [
      {
        url: "/images/events-hero.jpg", 
        width: 1200,
        height: 630,
        alt: "Live music performance and dining atmosphere at Curry & Hops Mohali",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Events at Curry & Hops | Mohali & Chandigarh",
    description:
      "Check out our schedule for live music, Sufi nights, and special tastings at Curry & Hops.",
    images: ["/images/events-hero.jpg"],
  },

  alternates: {
    canonical: "https://curryandhops.com/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}