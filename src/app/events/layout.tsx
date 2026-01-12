import type { Metadata } from "next";

// --- SEO CONFIGURATION FOR CURRY & HOPS EVENTS ---
export const metadata: Metadata = {
  title: "Events & Live Evenings | Curry & Hops, Mohali",

  description:
    "Join us at Curry & Hops, a family-friendly Indian bistro in Mohali, for live music evenings, special dining events, festive celebrations, and memorable experiences with great food and warm ambience.",

  keywords: [
    "Curry & Hops Mohali",
    "Indian restaurant in Mohali",
    "Family restaurant Mohali",
    "Restaurant events in Mohali",
    "Live music restaurant Chandigarh",
    "Best Indian bistro Mohali",
    "Weekend family dining",
    "Food and music Mohali",
  ],

  openGraph: {
    title: "Events & Special Evenings | Curry & Hops Mohali",
    description:
      "Discover upcoming live music evenings, festive celebrations, and special dining events at Curry & Hops – a family-friendly Indian bistro in Mohali.",
    url: "https://curryandhops.com/events",
    siteName: "Curry & Hops",
    images: [
      {
        url: "/images/events-hero.jpg", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "Family enjoying food and live music at Curry & Hops Mohali",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Events at Curry & Hops | Mohali",
    description:
      "Good food, warm ambience, and memorable evenings. Explore upcoming events at Curry & Hops.",
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
