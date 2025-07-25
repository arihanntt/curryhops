'use client';

import { FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';

interface PhoneNavProps {
  scrolled: boolean;
}

export default function PhoneNav({ scrolled }: PhoneNavProps) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  const togglePhone = () => setIsPhoneOpen(!isPhoneOpen);

  return (
    <div className="relative flex items-center">
      {/* Phone Icon Button */}
      <button
        onClick={togglePhone}
        className={`flex items-center focus:outline-none ${
          scrolled ? 'text-[#0F1927]' : 'text-[#FFEFDB]'
        } lg:hover:text-[#F4A948] transition-colors duration-300`}
        aria-label="Toggle Phone Number"
      >
        <FaPhoneAlt className="text-[#F4A948] text-xl" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 ${
          scrolled ? 'bg-[#FFEFDB] shadow-md' : 'bg-gray-700'
        } rounded-md opacity-0 invisible transition-all duration-300 ease-in-out z-50 pointer-events-auto
          ${isPhoneOpen ? 'opacity-100 visible translate-y-0' : 'translate-y-2' }
          lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0`}
      >
        <a
          href="tel:+1234567890"
          className={`block px-4 py-3 font-medium text-sm ${
            scrolled ? 'text-[#0F1927] hover:text-[#F4A948]' : 'text-[#FFEFDB] hover:text-[#F4A948]'
          } transition-colors duration-200`}
          style={{ fontFamily: "'Avenir Next', 'Avenir', sans-serif" }}
        >
          (123) 456-7890
        </a>
      </div>
    </div>
  );
}