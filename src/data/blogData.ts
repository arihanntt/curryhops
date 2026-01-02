// Content block interface
interface ContentBlock {
  type: "paragraph" | "quote" | "heading" | "list";
  text?: string;
  items?: string[];
}

// Blog post interface
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

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "What Makes a Modern Indian Bistro Different from a Traditional Restaurant?",
    category: "Indian Dining",
    date: "Aug 28, 2025",
    comments: 14,
    excerpt:
      "Modern Indian bistros blend regional flavours, contemporary techniques, and relaxed dining. Here’s how they differ from traditional Indian restaurants and why diners in Mohali are embracing the shift.",
    author: "Curry & Hops Team",
    readTime: "6 min",
    tags: ["indian bistro", "modern indian food", "mohali restaurants"],
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Indian dining has evolved rapidly over the last decade. While traditional restaurants focus on familiarity and legacy recipes, modern Indian bistros experiment with presentation, portioning, and flavour balance — without losing authenticity."
      },
      {
        type: "heading",
        text: "Tradition Meets Contemporary Technique"
      },
      {
        type: "paragraph",
        text: "At a modern Indian bistro, classic dishes are refined rather than replaced. Butter chicken may arrive with a lighter sauce, dal makhani may be slow-cooked with precise timing, and plating is treated with the same care as flavour."
      },
      {
        type: "quote",
        text: "Modern Indian food isn’t about changing flavours — it’s about respecting them with intention."
      },
      {
        type: "heading",
        text: "A More Relaxed Dining Experience"
      },
      {
        type: "paragraph",
        text: "Unlike formal fine dining or noisy casual eateries, bistros strike a balance. They are designed for long conversations, craft drinks, and meals that feel indulgent yet comfortable."
      },
      {
        type: "list",
        items: [
          "Smaller, thoughtfully designed menus",
          "Better ingredient sourcing",
          "Balanced spice levels",
          "Craft beverages paired with food"
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Why Craft Beer Pairs Surprisingly Well with Indian Food",
    category: "Craft Beer",
    date: "Aug 22, 2025",
    comments: 21,
    excerpt:
      "Indian food is bold, layered, and complex — exactly why craft beer works so well with it. We break down flavour pairings that actually make sense.",
    author: "Head Brewer, Curry & Hops",
    readTime: "7 min",
    tags: ["craft beer india", "beer with indian food", "brewery mohali"],
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "For years, Indian food has been paired almost exclusively with spirits or wine. But craft beer, when brewed with intention, complements Indian spices better than most people expect."
      },
      {
        type: "heading",
        text: "Balancing Spice with Malt"
      },
      {
        type: "paragraph",
        text: "Malty beers help soften heat, while hops cut through richness. A wheat beer works beautifully with tandoori starters, while a mild ale pairs well with creamy gravies."
      },
      {
        type: "quote",
        text: "The right beer doesn’t overpower Indian food — it refreshes the palate."
      },
      {
        type: "heading",
        text: "Breaking Old Pairing Myths"
      },
      {
        type: "paragraph",
        text: "Indian cuisine isn’t one-dimensional. From smoky kebabs to slow-cooked dals, craft beer offers versatility that adapts to diverse flavour profiles."
      },
      {
        type: "list",
        items: [
          "Wheat beers with grilled dishes",
          "Light ales with North Indian curries",
          "Low-bitterness brews for spice-heavy meals"
        ]
      }
    ]
  },

  {
    id: 3,
    title: "Behind the Scenes: How a Restaurant Menu Is Actually Designed",
    category: "Restaurant Stories",
    date: "Aug 15, 2025",
    comments: 11,
    excerpt:
      "A restaurant menu is more than a list of dishes. From costing to flavour balance, here’s what goes into designing a menu that actually works.",
    author: "Curry & Hops Kitchen",
    readTime: "5 min",
    tags: ["restaurant menu design", "indian restaurant kitchen"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Most diners never see the weeks of testing that go into a menu. Every dish must work individually and collectively, balancing spice, texture, and preparation time."
      },
      {
        type: "heading",
        text: "Costing, Consistency, and Creativity"
      },
      {
        type: "paragraph",
        text: "Ingredients must be sourced consistently, prices must stay reasonable, and dishes must remain exciting. It’s a constant negotiation between creativity and practicality."
      },
      {
        type: "quote",
        text: "A good menu is one the kitchen can execute perfectly, every single day."
      },
      {
        type: "heading",
        text: "Why Fewer Dishes Often Work Better"
      },
      {
        type: "paragraph",
        text: "Smaller menus allow chefs to focus on quality. Each dish earns its place and is refined over time rather than rushed into rotation."
      }
    ]
  },

  {
    id: 4,
    title: "Dining in Mohali: What Locals Look for in a Great Restaurant",
    category: "Local Dining",
    date: "Aug 08, 2025",
    comments: 19,
    excerpt:
      "From ambience to consistency, here’s what diners in Mohali actually value when choosing where to eat — beyond Instagram aesthetics.",
    author: "Curry & Hops Team",
    readTime: "6 min",
    tags: ["restaurants in mohali", "best places to eat mohali"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Mohali’s dining scene has matured. Diners now value consistency, comfort, and genuine hospitality over gimmicks."
      },
      {
        type: "heading",
        text: "Food That Feels Familiar Yet Refined"
      },
      {
        type: "paragraph",
        text: "People want flavours they recognise — just executed better. Overly experimental menus rarely sustain long-term loyalty."
      },
      {
        type: "quote",
        text: "The best restaurants feel dependable, not trendy."
      },
      {
        type: "heading",
        text: "Why Ambience Still Matters"
      },
      {
        type: "paragraph",
        text: "Lighting, seating, and sound design all influence how long guests stay — and whether they return."
      }
    ]
  }
];
