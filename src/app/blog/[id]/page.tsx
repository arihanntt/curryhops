"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <main className="font-poppins bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 min-h-screen">
      {/* ✅ Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Centered content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm">
            <Link href="/" className="hover:text-[#E6B877] transition">
              Home
            </Link>{" "}
            / Blog / {post.title}
          </p>
        </div>
      </section>

      {/* ✅ Blog Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-600 text-sm mb-6">
          {post.date} | {post.comments} comments | {post.readTime} | By{" "}
          {post.author}
        </p>

        <article className="prose max-w-none text-gray-800 leading-relaxed">
          {post.content.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return <p key={index}>{block.text}</p>;

              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-2 border-[#E6B877] p-6 my-8 rounded-lg text-center text-lg italic text-black bg-gradient-to-br"
                  >
                    <span className="text-[#E6B877] text-4xl">“</span>
                    {block.text}
                  </blockquote>
                );

              case "heading":
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-gray-900 mt-10 mb-4"
                  >
                    {block.text}
                  </h2>
                );

              case "list":
                return (
                  <ul
                    key={index}
                    className="list-disc pl-6 space-y-2 text-gray-800"
                  >
                    {block.items.map((item: string, i: number) => (
                      <li key={i} className="marker:text-[#E6B877]">
                        {item}
                      </li>
                    ))}
                  </ul>
                );

              default:
                return null;
            }
          })}
        </article>
      </section>

      {/* ✅ Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Related posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.id}`}
                className="group block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-[#E6B877] mb-2">
                    {related.category}
                  </p>
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#E6B877] transition">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {related.date} | {related.comments} comments
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
