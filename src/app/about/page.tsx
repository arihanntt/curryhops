import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Curry & Hops, a modern Indian bistro in Mohali where spice meets craft. Discover our vision, story, and passion for curated Indian cuisine.",

  openGraph: {
    title: "About Curry & Hops | Where Spice Meets Craft",
    description:
      "Discover the story and vision behind Curry & Hops, a modern Indian bistro in Mohali.",
    images: [
      {
        url: "/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "About Curry & Hops – Where Spice Meets Craft",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Curry & Hops",
    description:
      "The story behind Curry & Hops, a modern Indian bistro where spice meets craft.",
    images: ["/about-og.jpg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
