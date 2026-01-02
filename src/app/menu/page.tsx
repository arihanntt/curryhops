import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the Curry & Hops menu featuring signature curries, tandoori platters, and crafted beverages. Where spice meets craft in Mohali, near Chandigarh.",

  openGraph: {
    title: "Menu | Curry & Hops",
    description:
      "Discover signature curries, tandoori platters, and crafted beverages at Curry & Hops.",
    images: [
      {
        url: "/menu-og.jpg", // IMPORTANT
        width: 1200,
        height: 630,
        alt: "Curry & Hops Menu – Where Spice Meets Craft",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Menu | Curry & Hops",
    description:
      "Explore the Curry & Hops menu featuring signature curries and crafted beverages.",
    images: ["/menu-og.jpg"],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}
