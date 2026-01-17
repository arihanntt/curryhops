// src/types/blog.ts

export interface ContentBlock {
  type: "paragraph" | "quote" | "heading" | "list";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  comments: number;
  excerpt: string;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  content: ContentBlock[];
}