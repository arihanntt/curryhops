// src/components/BlogSchema.tsx
import { BlogPost } from "@/types/blog"; // ✅ Ensure this matches the filename above

export default function BlogSchema({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person", // Use Person for specific authors
      "name": post.author
    },
    "publisher": {
      "@type": "Restaurant",
      "name": "Curry & Hops",
      "logo": {
        "@type": "ImageObject",
        "url": "https://curryandhops.com/images/logo.png"
      }
    },
    "datePublished": new Date(post.date).toISOString(),
    "image": "https://curryandhops.com/og-image.jpg", 
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://curryandhops.com/blogs/${post.id}`
    },
    "keywords": post.tags.join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}