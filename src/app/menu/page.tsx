import type { Metadata } from "next";
import MenuClient from "./MenuClient"; // assuming this is your client component

export const metadata: Metadata = {
  metadataBase: new URL("https://curryandhops.com"), // ← CHANGE THIS to your real domain (very important)

  title: "Menu | Curry & Hops",
  description:
    "Explore the Curry & Hops menu featuring signature curries, tandoori platters, handcrafted cocktails, and more. Where spice meets craft in Mohali, near Chandigarh.",

  // Open Graph – this is what WhatsApp, Facebook, LinkedIn etc. use
  openGraph: {
    title: "Menu | Curry & Hops – Where Spice Meets Craft",
    description:
      "Discover bold Indian curries, street bites, soulful biryanis, signature cocktails and crafted beverages at Curry & Hops.",
    url: "https://curryandhops.com/menu", // ← your actual menu page URL
    siteName: "Curry & Hops",
    images: [
      {
        url: "/menu-og.webp",           // ← use .webp version
        width: 1200,
        height: 630,
        alt: "Curry & Hops Menu – Signature curries & cocktails",
        type: "image/webp",             // ← helps WhatsApp detect it correctly
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // Twitter / X Cards – optional but good to have
  twitter: {
    card: "summary_large_image",
    title: "Menu | Curry & Hops",
    description:
      "Signature curries, tandoori, biryanis & handcrafted cocktails at Curry & Hops.",
    images: ["/menu-og.webp"],
  },

  // Optional: better mobile experience
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function MenuPage() {
  return <MenuClient />;
}