
import { FaPhoneAlt } from 'react-icons/fa';

interface PhoneNavProps {
  scrolled: boolean;
}

export default function PhoneNav({ scrolled }: PhoneNavProps) {
  return (
    <div className={`flex items-center text-${scrolled ? '[#0F1927]' : '[#FFEFDB]'}`}>
      <FaPhoneAlt className="mr-2 text-[#F4A948] text-xl" />
      <a
        href="tel:+1234567890"
        className={`font-medium hover:text-[#F4A948] transition-colors ${
          scrolled ? 'text-[#0F1927]' : 'text-[#FFEFDB]'
        }`}
        style={{ fontFamily: "'Avenir LT STD', sans-serif" }}
      >
        (123) 456-7890
      </a>
    </div>
  );
}
