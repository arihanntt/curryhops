import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://curryandhops.com"
  ),

  // ✅ ADDED: Google Search Console Verification
  verification: {
    google: "mnG3rprb3_NIKBDb3L7QZSVrwkIev8BIEtt2UtNNSvg",
  },

  title: {
    default: "Curry & Hops | Best Indian Restaurant & Brewing Co. in Mohali",
    template: "%s | Curry & Hops Mohali",
  },

  description:
    "Curry & Hops Mohali: The ultimate destination for craft beer and modern Indian cuisine. Experience live music, signature curries, and the best brewery vibes near Chandigarh.",

  keywords: [
    "Curry & Hops Mohali",
    "Curry and Hops Chandigarh",
    "Curry & Hops Brewing Co",
    "Best Brewery in Mohali",
    "Indian restaurant Mohali",
    "Microbrewery in Mohali",
    "Live Music Restaurant Mohali",
    "Sufi Nights Mohali",
    "Best Butter Chicken Mohali",
  ],

  applicationName: "Curry & Hops",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Curry & Hops | Brewing Co. | Where Spice Meets Craft",
    description:
      "Curry & Hops is a modern Indian restaurant and brewing co. in Mohali offering bold curries, craft beers, and a refined dining experience near Chandigarh.",
    url: "https://curryandhops.com/",
    siteName: "Curry & Hops",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Curry & Hops – Where Spice Meets Craft",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Curry & Hops | Brewing Co. | Where Spice Meets Craft",
    description:
      "A modern Indian restaurant and brewing co. in Mohali serving bold curries and craft beers.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://curryandhops.com/",
  },
};