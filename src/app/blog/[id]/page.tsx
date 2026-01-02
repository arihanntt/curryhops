import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blogData";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.id === Number(params.id));

  if (!post) {
    return {};
  }

  const url = `https://curryandhops.com/blog/${post.id}`;

  return {
    title: `${post.title} | Curry & Hops`,
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Curry & Hops",
      images: [
        {
          url: `${url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${url}/opengraph-image`],
    },

    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = blogPosts.find((p) => p.id === Number(params.id));

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
