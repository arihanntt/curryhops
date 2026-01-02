import { Poppins, Playfair_Display, Great_Vibes } from "next/font/google";
import { Italiana } from "next/font/google";
import { Arapey } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import LayoutClient from "../components/LayoutClient";
import { siteMetadata } from "./metadata";
import RestaurantSchema from "@/components/RestaurantSchema"; // 👈 ADD THIS

// Fonts
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: "400",
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

const arapey = Arapey({
  variable: "--font-arapey",
  subsets: ["latin"],
  weight: ["400"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable}
        ${playfair.variable}
        ${vibes.variable}
        ${italiana.variable}
        ${arapey.variable}
        ${dancingScript.variable}
      `}
    >
      <body className="antialiased">
        <RestaurantSchema /> {/* 👈 ADD THIS */}
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
