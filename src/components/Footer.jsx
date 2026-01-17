'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTripadvisor, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-[#d1cfcf] px-6 pt-16 pb-8 font-sans tracking-normal leading-relaxed bg-[#1b1414]">
      {/* Background PNG */}
      <div className="absolute inset-0 opacity-200 pointer-events-none">
        <Image
          src="/images/footer-bg.png" 
          alt="Footer background texture"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-12">
        {/* Our Address */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-white font-semibold mb-3 text-base uppercase tracking-widest">Our Address</h4>
          <p className="text-sm leading-6">
            Gmada Aerocity, Near International Airport<br />
            Sahibzada Ajit Singh Nagar, Punjab 140306
          </p>
          <a
            href="https://share.google/RvEeDQElC4XCuHHOJ" // ✅ Linked to your official Maps listing
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-[#E6B877] font-semibold border-b border-[#E6B877] hover:text-white transition text-sm"
          >
            View On Map
          </a>
        </div>

        {/* Center Logo + Text */}
        <div className="flex flex-col items-center text-center px-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Curry and Hops Logo"
              width={180}
              height={60}
              className="mb-3 cursor-pointer"
            />
          </Link>
          <p className="text-sm max-w-md mb-5 leading-6 text-gray-300">
            Curry and Hops blends rich Indian flavors with a rustic, inviting vibe. 
            Mohali&apos;s premier destination where tradition meets modern craft brews.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-2 text-xl text-white">
            <a href="https://www.instagram.com/curryandhopsmohali" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-[#E6B877] transition" />
            </a>
            <a href="#" aria-label="Tripadvisor">
              <FaTripadvisor className="hover:text-[#E6B877] transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="hover:text-[#E6B877] transition" />
            </a>
          </div>
        </div>

        {/* Private Dining / Reservations */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-white font-semibold mb-3 text-base uppercase tracking-widest">Reservations</h4>
          <p className="text-sm leading-6">
            Email: <a href="mailto:curryandhops@gmail.com" className="hover:text-white">curryandhops@gmail.com</a><br />
            Phone: <a href="tel:+918699966565" className="hover:text-white">+91 86999-66565</a>
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 text-[#E6B877] font-semibold border-b border-[#E6B877] hover:text-white transition text-sm"
          >
            Book A Table
          </Link>
        </div>
      </div>

      {/* Bottom Footer - ✅ ADDED EVENTS & PROPER PATHS */}
      <div className="relative z-10 mt-12 border-t border-white/10 pt-6 text-center">
        <div className="flex justify-center flex-wrap gap-6 text-sm font-semibold text-white mb-4">
          <Link href="/about" className="hover:text-[#E6B877] transition">About</Link>
          <Link href="/menu" className="hover:text-[#E6B877] transition">Menu</Link>
          <Link href="/events" className="hover:text-[#E6B877] transition text-[#E6B877]">Events</Link>
          <Link href="/blogs" className="hover:text-[#E6B877] transition">Blog</Link>
          <Link href="/contact" className="hover:text-[#E6B877] transition">Contact</Link>
        </div>
        
        <p className="text-sm text-gray-400">
          © {currentYear} Curry and Hops. A product of{' '}
          <Link href="https://www.chandihospitality.com/" target="_blank" className="text-[#E6B877] hover:underline">
            Chandi Hospitality Group
          </Link>
        </p>
      </div>
    </footer>
  );
}