import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read stories, insights, and craft-driven articles from Curry & Hops — a modern Indian bistro in Mohali where spice meets craft.",

  openGraph: {
    title: "Blog | Curry & Hops",
    description:
      "Stories, craft, and creativity from the kitchen and taps at Curry & Hops.",
    images: [
      {
        url: "/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Curry & Hops Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog | Curry & Hops",
    description:
      "Stories, craft, and creativity from the kitchen and taps at Curry & Hops.",
    images: ["/blog-og.jpg"],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
