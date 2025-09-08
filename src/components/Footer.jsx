'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTripadvisor, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-[#d1cfcf] px-6 pt-16 pb-8 font-sans tracking-normal leading-relaxed bg-[#1b1414]">
      {/* Background PNG (black one you provided) */}
      <div className="absolute inset-0 opacity-200 pointer-events-none">
        <Image
          src="/images/footer-bg.png" // <-- place your black PNG here
          alt="Footer background"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-12">
        {/* Our Address */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-white font-semibold mb-3 text-base">Our Address</h4>
          <p className="text-sm leading-6">
            22 Alnahas Building, 2 AlBahr St, Tanta<br />
            Al-Gharbia Governorate, Egypt
          </p>
          <Link
            href="#"
            className="inline-block mt-4 text-[#E6B877] font-semibold border-b border-[#E6B877] hover:text-white transition text-sm"
          >
            View On Map
          </Link>
        </div>

        {/* Center Logo + Text */}
        <div className="flex flex-col items-center text-center px-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={180}
            height={60}
            className="mb-3"
          />
          <p className="text-sm max-w-md mb-5 leading-6 text-gray-300">
            Curry n Hops blends rich Indian flavors with a rustic, inviting vibe.
            From street-style bites to bold tandoori grills, we serve tradition with a modern twist.
          </p>

          {/* Newsletter */}
          <form className="w-full max-w-md">
            <div className="flex border border-[#E6B877] rounded px-4 py-2 items-center justify-between hover:shadow-md transition">
              <input
                type="email"
                placeholder="Subscribe Our Newsletter"
                className="bg-transparent text-sm text-white outline-none w-full placeholder:text-gray-400"
              />
              <button type="submit" className="text-[#E6B877] text-lg ml-2 hover:text-white transition">→</button>
            </div>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-6 text-xl text-white">
            <a href="#" aria-label="Instagram"><FaInstagram className="hover:text-[#E6B877] transition" /></a>
            <a href="#" aria-label="Tripadvisor"><FaTripadvisor className="hover:text-[#E6B877] transition" /></a>
            <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-[#E6B877] transition" /></a>
          </div>
        </div>

        {/* Private Dining */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-white font-semibold mb-3 text-base">Private Dining</h4>
          <p className="text-sm leading-6">
            Main Email: <a href="mailto:Elroyale@7oroof.com" className="hover:text-white">Elroyale@7oroof.com</a><br />
            Phone: 02 0101236547
          </p>
          <Link
            href="#"
            className="inline-block mt-4 text-[#E6B877] font-semibold border-b border-[#E6B877] hover:text-white transition text-sm"
          >
            Reservations
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 mt-12 border-t border-gray-700 pt-6 text-center">
        <div className="flex justify-center flex-wrap gap-6 text-sm font-semibold text-white mb-2">
          {['About', 'Menu', 'Blog', 'Contact'].map((item) => (
            <Link key={item} href="#" className="hover:text-[#E6B877] transition">
              {item}
            </Link>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          © {currentYear} Curry & hops, With Love by{' '}
          <Link href="https://drixestudio.services" className="text-[#E6B877] hover:underline">Drixe studio</Link>
        </p>
      </div>
    </footer>
  );
}
