import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://curryandhops.com"),

  title: "Menu",
  description:
    "Explore the Curry & Hops menu featuring signature curries, tandoori platters, handcrafted cocktails, and more. Where spice meets craft in Mohali, near Chandigarh.",

  alternates: {
    canonical: "https://curryandhops.com/menu",
  },

  openGraph: {
    title: "Menu | Curry & Hops – Where Spice Meets Craft",
    description:
      "Discover bold Indian curries, street bites, soulful biryanis, signature cocktails and crafted beverages at Curry & Hops.",
    url: "https://curryandhops.com/menu",
    siteName: "Curry & Hops",
    images: [
      {
        url: "https://curryandhops.com/menu-og.webp",
        width: 1200,
        height: 630,
        alt: "Curry & Hops Menu – Signature curries & cocktails",
        type: "image/webp",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Menu | Curry & Hops",
    description:
      "Signature curries, tandoori, biryanis & handcrafted cocktails at Curry & Hops.",
    images: ["https://curryandhops.com/menu-og.webp"],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}
