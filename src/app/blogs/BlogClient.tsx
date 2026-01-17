"use client";

import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BlogClient() {
  const [offsetY, setOffsetY] = useState(0);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-poppins bg-[#0f0f0f] text-gray-100 min-h-screen">
      {/* Hero with Parallax */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/faq-bg.jpg')",
            transform: `translateY(${offsetY * 0.4}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/65" />

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-sm uppercase tracking-widest text-amber-400 mb-3">
            Stories & Perspectives
          </p>

          <h1 className="font-playfair text-5xl md:text-6xl text-white mb-6">
            Curry & Hops Blog
          </h1>

          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6" />

          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Culinary thoughts, behind-the-scenes stories, and ideas shaped by
            spice, craft, and culture at Curry & Hops.
          </p>
        </motion.div>
      </section>

      {/* Blog Cards */}
      <section
        className="max-w-7xl mx-auto px-6 py-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-12"
        aria-label="Blog posts from Curry & Hops"
      >
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group bg-gradient-to-b from-[#1a1a1a] to-[#121212]
                       border border-white/10 rounded-2xl p-8
                       hover:-translate-y-2 transition-all duration-300
                       shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400/20 via-amber-400 to-amber-400/20 opacity-0 group-hover:opacity-100 transition" />

            <span className="inline-block text-xs uppercase tracking-widest text-amber-400 mb-4">
              {post.category}
            </span>

            <Link
              href={`/blogs/${post.id}`}
              className="block font-playfair text-2xl text-white leading-snug hover:text-amber-300 transition-colors"
            >
              {post.title}
            </Link>

            <p className="mt-4 text-gray-400 text-sm leading-relaxed line-clamp-4">
              {post.excerpt}
            </p>

            <div className="mt-8 flex items-center justify-between text-xs text-gray-500">
              <span>{post.date}</span>
              <span>{post.comments} comments</span>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
