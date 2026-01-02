import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "Curry & Hops | Indian Bistro in Mohali",
    template: "%s | Curry & Hops",
  },

  description:
    "Curry & Hops is a modern Indian bistro in Mohali where spice meets craft. Experience exquisite curry flavors paired with finely crafted beers, just minutes from Chandigarh.",

  keywords: [
    "Curry & Hops",
    "Curry and Hops",
    "Curry n Hops",
    "Indian restaurant in Mohali",
    "Indian bistro Mohali",
    "Restaurant near Chandigarh",
    "Indian restaurant near Chandigarh",
    "Brewery restaurant Mohali",
    "Where Spice Meets Craft",
  ],

  applicationName: "Curry & Hops",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Curry & Hops | Where Spice Meets Craft",
    description:
      "A modern Indian bistro in Mohali blending bold curry flavors with finely crafted beers. A destination near Chandigarh.",
    url: "https://curryandhops.com",
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
    title: "Curry & Hops | Where Spice Meets Craft",
    description:
      "An Indian bistro in Mohali celebrating the fusion of spice and craft.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://curryandhops.com",
  },
};
