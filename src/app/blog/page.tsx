"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <main className="font-poppins bg-gradient-to-b from-[#0f0f0f] via-[#181818] to-[#0f0f0f] text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/faq-bg.jpg"
          alt="Blog Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent"></div>

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide text-white drop-shadow-[0_2px_6px_rgba(255,255,255,0.15)]">
            The Journal
          </h1>
          <p className="mt-4 text-gray-400 tracking-wide text-lg">
            <Link href="/" className="hover:underline hover:text-white">
              Home
            </Link>{" "}
            / Blog
          </p>
          <p className="mt-3 text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
            Stories, craft, and creativity — straight from our kitchen and taps.
          </p>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
          >
            <Link
              href={`/blog/${post.id}`}
              className="relative block w-full h-64 overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover brightness-90 transition-all duration-500 group-hover:scale-110 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
            </Link>

            <div className="p-6">
              <span className="inline-block text-xs font-medium tracking-widest uppercase text-gray-400 mb-3">
                {post.category}
              </span>

              <Link
                href={`/blog/${post.id}`}
                className="block text-2xl font-semibold text-white hover:text-gray-300 transition-colors leading-snug"
              >
                {post.title}
              </Link>

              <p className="mt-3 text-gray-400 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-5 flex justify-between items-center text-xs text-gray-500 border-t border-white/10 pt-4">
                <span>{post.date}</span>
                <span>{post.comments} comments</span>
              </div>
            </div>

            {/* White Glow Accent */}
            <div className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-gradient-to-r from-white/10 via-white/40 to-white/10"></div>
          </motion.div>
        ))}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-[#1b1b1b] to-[#111111] text-white py-16 mt-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join the Inner Circle
          </motion.h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get first access to events, menu reveals, and limited-edition brews.
          </p>

          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-full text-white bg-white/10 placeholder-gray-400 border border-white/20 focus:outline-none w-full sm:w-auto flex-grow focus:ring-2 focus:ring-white/30"
              required
            />
            <button
              type="submit"
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
