
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white-900 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Restaurant Logo"
            width={120}
            height={40}
            className="object-contain mb-4"
          />
          <p className="text-sm">
            Weisber Restaurant offers a unique dining experience with exquisite flavors and a cozy atmosphere.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-yellow-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-yellow-500 transition-colors">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-500 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">123 Flavor Street, Food City, FC 12345</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: info@weisberrestaurant.com</p>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Weisber Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
