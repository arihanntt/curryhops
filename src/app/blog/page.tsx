"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";

export default function BlogPage() {
  return (
    <main className="font-poppins bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-100 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/faq-bg.jpg"
          alt="Blog Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <p className="mt-2 text-yellow-400">
            <Link href="/" className="hover:underline">Home</Link> / Blog
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <Link href={`/blog/${post.id}`} className="relative block w-full h-64">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </Link>
            <div className="p-6">
              <p className="text-sm text-yellow-600 font-medium mb-2">
                {post.category}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-yellow-600 transition-colors block mb-3"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-500">
                {post.date} | {post.comments} comments
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
