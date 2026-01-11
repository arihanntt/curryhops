'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-center bg-cover h-[400px] md:h-[500px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/contact-hero.jpg')",
          backgroundPosition: 'center 30%', // Keeps the image pulled up
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold tracking-wide">CONTACT</h1>
          <p className="text-lg mt-2">We love to hear from you</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white w-full py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold border-b-4 border-black inline-block mb-6 uppercase">
              Get in touch
            </h2>
            <p className="mb-6">
              You have a piece of advice or a suggestion that you would like to
              share with us? Feel free to contact us.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black"
                required
              ></textarea>
              <button
                type="submit"
                className="border border-black px-6 py-2 uppercase tracking-wide hover:bg-black hover:text-white transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map + Info */}
          <div>
            <h2 className="text-2xl font-bold border-b-4 border-black inline-block mb-6 uppercase">
              Find us
            </h2>
            <ul className="mb-6 space-y-2">
              <li>
                <strong>Address:</strong> SCO 41 42, Aero Arcade Mohali Punjab Pin 140603
              </li>
              <li>
                <strong>Phone:</strong> +91 8699966565
              </li>
              <li>
                <strong>Email:</strong> curryandhops@gmail.com
              </li>
            </ul>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.046680120312!2d76.76377807536895!3d30.632641974632676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390febfa4f7a4b0b%3A0xd8223d3266382fa5!2sDomino&#39;s%20Pizza%20%7C%20Aero%20Arcade%2C%20Mohali!5e0!3m2!1sen!2sin!4v1760984782524!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
