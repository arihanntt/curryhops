import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://curryandhops.com"
  ),

  title: {
    default: "Curry & Hops | Brewing Co. | Mohali",
    template: "%s | Curry & Hops | Brewing Co.",
  },

  description:
    "Curry & Hops is a modern Indian restaurant and brewing co. in Mohali, serving bold curries, craft beers, and a refined dining experience near Chandigarh.",

  keywords: [
    "Curry & Hops",
    "Curry and Hops",
    "Curry & Hops Brewing Co",
    "Brewing company in Mohali",
    "Indian restaurant in Mohali",
    "Craft beer restaurant Mohali",
    "Restaurant near Chandigarh",
    "Indian food Mohali",
    "Where Spice Meets Craft",
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
