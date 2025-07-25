'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import PhoneNav from './PhoneNav';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'HOME', path: '/' },
    {
      name: 'MENU',
      path: '/menu',
      dropdown: [
        { name: 'Dinner', path: '/menu/dinner' },
        { name: 'Breakfast', path: '/menu/breakfast' },
        { name: 'Lunch', path: '/menu/lunch' },
        { name: 'Drinks', path: '/menu/drinks' },
      ],
    },
    {
      name: 'ABOUT',
      path: '/about',
      dropdown: [
        { name: 'Testimonials', path: '/about/testimonials' },
        { name: 'Team', path: '/about/team' },
        { name: 'FAQ', path: '/about/faq' },
      ],
    },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#FFEFDB] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-24 sm:h-20 relative">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-6 sm:space-x-4">
          <Link href="/" className="z-50">
            <Image
              src={scrolled ? '/images/logo-dark.png' : '/images/logo-light.png'}
              alt="Curry & Hops Brewing Co."
              width={scrolled ? 160 : 220}
              height={scrolled ? 60 : 85}
              priority
              className={`transition-all duration-300 object-contain ${
                scrolled ? 'h-14 sm:h-14' : 'h-13 sm:h-18'
              } w-auto`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 relative">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.path}
                  className={`font-medium ${
                    scrolled
                      ? 'text-[#0F1927] hover:text-[#F4A948]'
                      : 'text-[#FFFFFF] hover:text-[#F4A948]'
                  } transition-colors py-2 ${
                    pathname === link.path ? 'underline underline-offset-4 decoration-[#F4A948]' : ''
                  }`}
                  style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <div className="absolute left-0 top-[52px] w-48 bg-gray-700 shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 pointer-events-auto">
                    {link.dropdown.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className={`block px-4 py-3 text-[#FFEFDB] hover:bg-[#F4A948] hover:text-white transition-colors duration-200 text-sm ${
                          index < link.dropdown.length - 1 ? 'border-b border-gray-600' : ''
                        }`}
                        style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side: Reservation Button (Desktop Only), PhoneNav (Mobile Only), and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link
            href="/reservation"
            className={`hidden lg:block ml-6 px-5 py-2 border border-[#F4A948] font-semibold transition-all duration-300 ${
              scrolled ? 'text-black hover:bg-[#F4A948] hover:text-black' : 'text-white hover:bg-[#F4A948] hover:text-black'
            }`}
            style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
          >
            RESERVATION
          </Link>
          <div className="lg:hidden">
            <PhoneNav scrolled={scrolled} />
          </div>
          <button
            className={`lg:hidden z-50 focus:outline-none ${
              scrolled ? 'text-[#0F1927]' : 'text-[#FFEFDB]'
            }`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{ backgroundColor: '#0F1927' }}
      >
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center space-y-10 pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-2xl font-light text-[#FFEFDB] hover:text-[#F4A948] transition-colors ${
                pathname === link.path ? 'underline underline-offset-4 decoration-[#F4A948]' : ''
              }`}
              onClick={toggleMenu}
              style={{ fontFamily: "'Poppins', 'Avenir Next', sans-serif" }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/reservation"
            className="inline-block mt-6 border border-[#F4A948] px-6 py-2 text-white font-semibold hover:bg-[#F4A948] hover:text-black transition-all"
            onClick={toggleMenu}
            style={{ fontFamily: "'Poppins', 'Avenir Next', sans-serif" }}
          >
            RESERVATION
          </Link>
        </div>
      </div>
    </header>
  );
}