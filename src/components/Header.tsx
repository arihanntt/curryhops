"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronRight } from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Menu", path: "/menu" },
    { name: "Blog", path: "/blog" },
    { name: "Contacts", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FFEFDB] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-24 sm:h-28">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={scrolled ? "/images/logo-dark.png" : "/images/logo-light.png"}
            alt="Curry & Hops Brewing Co."
            width={200}
            height={70}
            priority
            className="object-contain"
          />
        </Link>

        {/* Menu Button */}
        <button
          className={`focus:outline-none transition-colors duration-200 ${
            scrolled ? "text-[#0F1927]" : "text-[#FFEFDB]"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <FiMenu className="w-9 h-9 sm:w-10 sm:h-10" />
        </button>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-[#1D1A1A] text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-800">
          <Image
            src="/images/logo-light.png"
            alt="Logo"
            width={160}
            height={50}
            className="object-contain"
          />
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="text-white hover:text-[#C5A253] transition-colors"
          >
            <FiX className="w-8 h-8 sm:w-9 sm:h-9" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col flex-grow mt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex justify-between items-center px-6 py-4 text-lg sm:text-xl font-medium transition-all ${
                pathname === link.path
                  ? "bg-[#C5A253] text-black font-semibold"
                  : "hover:text-[#C5A253]"
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {link.name}
              <FiChevronRight />
            </Link>
          ))}
        </nav>

        {/* Bottom Spacer (future icons / CTA can go here) */}
        <div className="border-t border-gray-700 px-6 py-5" />
      </div>
    </header>
  );
}
