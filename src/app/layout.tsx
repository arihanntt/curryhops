import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Playfair_Display, Great_Vibes } from 'next/font/google';
import { Italiana } from 'next/font/google';
import { Arapey } from 'next/font/google';
import { Dancing_Script } from 'next/font/google';
import Preloader from '../components/Preloader';
import "./globals.css";

// Font declarations with CSS variable bindings
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ['400', '500', '700'],
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: '400',
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ['400'],
});

const arapey = Arapey({
  variable: "--font-arapey",
  subsets: ["latin"],
  weight: ['400'],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

// Metadata
export const metadata: Metadata = {
  title: "Curry & Hops Brewing Co.",
  description: "Restaurant website",
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${poppins.variable}
        ${playfair.variable}
        ${vibes.variable}
        ${italiana.variable}
        ${arapey.variable}
        ${dancingScript.variable}
      `}
    >
      <body className="antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}