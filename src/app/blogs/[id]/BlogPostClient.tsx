"use client";

import Link from "next/link";
import { BlogPost } from "@/data/blogData";
import { useEffect, useState } from "react";
import BlogSchema from "./BlogSchema";

export default function BlogPostClient({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  const [progress, setProgress] = useState(0);
  const headings = post.content.filter((b) => b.type === "heading");

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const current = window.scrollY;
      setProgress((current / total) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-poppins bg-[#fafafa] text-gray-800">
      {/* SEO Schema */}
      <BlogSchema post={post} />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50">
        <div
          className="h-full bg-amber-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="py-32 px-6 text-center bg-gradient-to-br from-[#141414] via-[#1c1c1c] to-[#141414] text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-5">
          {post.category}
        </p>

        <h1 className="font-playfair text-4xl md:text-5xl max-w-3xl mx-auto mb-8">
          {post.title}
        </h1>

        <div className="w-16 h-[2px] bg-amber-400 mx-auto mb-8" />
      </section>

      {/* Content Layout */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_260px] gap-12 pt-14">
        {/* Article */}
        <article className="max-w-3xl leading-[1.85] text-[17px]">
          {post.content.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p key={index} className="mb-8 text-gray-700">
                    {block.text}
                  </p>
                );

              case "heading":
                return (
                  <h2
                    key={index}
                    id={`section-${index}`}
                    className="font-playfair text-2xl mt-16 mb-6 text-gray-900"
                  >
                    {block.text}
                  </h2>
                );

              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="my-14 px-8 py-6 bg-white border-l-4 border-amber-400 italic rounded-md shadow-sm"
                  >
                    {block.text}
                  </blockquote>
                );

              case "list":
                return (
                  <ul key={index} className="mb-10 pl-6 space-y-3">
                    {block.items?.map((item: string, i: number) => (
                      <li key={i} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                );

              default:
                return null;
            }
          })}

          {/* Internal Links (SEO gold) */}
          <div className="mt-20 border-t pt-10">
            <h3 className="font-playfair text-xl mb-4">
              Explore More from Curry & Hops
            </h3>
            <p className="text-gray-600">
              Curious about our food philosophy? Check out our{" "}
              <Link
                href="/menu"
                className="text-amber-600 hover:underline"
              >
                menu
              </Link>{" "}
              or learn more{" "}
              <Link
                href="/about"
                className="text-amber-600 hover:underline"
              >
                about us
              </Link>
              .
            </p>
          </div>
        </article>

        {/* Table of Contents */}
        <aside className="sticky top-28 hidden md:block text-sm">
          <p className="uppercase tracking-widest text-gray-400 mb-4">
            On this page
          </p>
          <ul className="space-y-3">
            {headings.map((h, i) => (
              <li key={i}>
                <a
                  href={`#section-${post.content.indexOf(h)}`}
                  className="text-gray-600 hover:text-amber-600 transition"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Related Posts */}
      <section className="bg-white py-20 mt-20 border-t">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-playfair text-3xl text-center mb-14">
            Related Reads
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blogs/${rel.id}`}
                className="group block border rounded-xl p-8 hover:shadow-lg transition"
              >
                <p className="text-xs uppercase tracking-widest text-amber-600 mb-3">
                  {rel.category}
                </p>
                <h3 className="font-playfair text-xl group-hover:text-amber-600 transition">
                  {rel.title}
                </h3>
                <p className="text-sm text-gray-500 mt-4">{rel.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
