// Define the content block interface
interface ContentBlock {
  type: "paragraph" | "quote" | "heading" | "list";
  text?: string;
  items?: string[];
}

// Define the blog post interface
export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  comments: number;
  image: string;
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
    title: "Mastering Craft Beer Brewing: Innovations of 2025",
    category: "Craft Beer",
    date: "Sep 08, 2025 10:30 PM IST",
    comments: 18,
    image: "/images/blogbeer.jpg",
    excerpt:
      "Unveil the groundbreaking techniques redefining craft beer in 2025, from AI-driven fermentation to eco-conscious hop cultivation and sustainable brewing practices.",
    author: "John Doe",
    readTime: "7 min",
    tags: ["craft beer", "brewing", "innovation", "sustainability"],
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Craft beer brewing is undergoing a massive transformation in 2025, driven by a fusion of cutting-edge technology and a renewed commitment to sustainability. Breweries are leveraging AI to optimize fermentation processes, ensuring richer flavors and higher efficiency, while adopting eco-friendly practices to reduce their carbon footprint."
      },
      {
        type: "heading",
        text: "The Role of AI in Modern Brewing"
      },
      {
        type: "paragraph",
        text: "Artificial intelligence is revolutionizing yeast selection and fermentation timing. Advanced algorithms analyze environmental factors and yeast behavior, predicting the perfect conditions for each brew, resulting in consistent quality and unique flavor profiles."
      },
      {
        type: "quote",
        text: "Vivamus tristique ligula quis orci malesuada tincidunt. Praesent magna purus, pharetra eu eleifend non, euismod vitae leo."
      },
      {
        type: "heading",
        text: "Sustainable Hop Cultivation"
      },
      {
        type: "paragraph",
        text: "Hop farmers are turning to vertical farming and organic methods to grow resilient crops. These techniques not only conserve water but also enhance the natural aroma of hops, offering brewers a sustainable ingredient source."
      },
      {
        type: "list",
        items: [
          "AI-driven yeast optimization for flavor enhancement",
          "Vertical farming for water-efficient hop growth",
          "Eco-friendly packaging to reduce waste",
          "Carbon-neutral brewing facilities"
        ]
      },
      {
        type: "paragraph",
        text: "These advancements are setting new standards in the industry, blending tradition with innovation to create beers that taste better and benefit the planet."
      }
    ]
  },
  {
    id: 2,
    title: "Sustainable Gastronomy: How 2025 Chefs Redefine Fine Dining",
    category: "Food & Sustainability",
    date: "Sep 07, 2025 08:15 PM IST",
    comments: 26,
    image: "/images/blogbeer.jpg",
    excerpt:
      "Farm-to-table is evolving into seed-to-soil-to-plate. Explore how chefs embrace regenerative farming, zero-waste kitchens, and AI-powered menu engineering to redefine fine dining.",
    author: "Emma Lee",
    readTime: "9 min",
    tags: ["fine dining", "sustainability", "AI menus", "regenerative farming"],
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Fine dining in 2025 transcends mere taste and presentation, becoming a movement rooted in ecological responsibility. Chefs are pioneering regenerative farming techniques, ensuring that every dish reflects a commitment to the environment, while zero-waste kitchens turn leftovers into culinary masterpieces."
      },
      {
        type: "heading",
        text: "Zero-Waste Kitchens: A New Culinary Frontier"
      },
      {
        type: "paragraph",
        text: "Innovative chefs are transforming kitchen waste into valuable resources. Onion skins are simmered into rich broths, citrus peels are distilled into zesty cocktails, and vegetable trimmings are dehydrated for seasoning, creating a closed-loop system that minimizes waste."
      },
      {
        type: "quote",
        text: "A dish isn’t truly elegant unless it respects the soil it came from."
      },
      {
        type: "heading",
        text: "AI-Powered Menu Engineering"
      },
      {
        type: "paragraph",
        text: "Artificial intelligence is reshaping menus by adapting to real-time ingredient availability and guest preferences. AI systems suggest substitutions based on freshness and even personalize dishes using biometric data for tailored nutrition."
      },
      {
        type: "list",
        items: [
          "Real-time ingredient substitution for peak freshness",
          "Biometric-based menu personalization",
          "AI-predicted flavor pairings for innovative dishes"
        ]
      },
      {
        type: "paragraph",
        text: "This synergy of sustainability and technology has elevated fine dining into a responsible, luxurious experience that honors both the palate and the planet."
      }
    ]
  },
  {
    id: 3,
    title: "The Future of Coffee: Smart Brews and Climate-Resilient Beans",
    category: "Coffee Culture",
    date: "Sep 05, 2025 11:00 AM IST",
    comments: 33,
    image: "/images/blogbeer1.jpg",
    excerpt:
      "Coffee isn’t just a beverage; in 2025 it’s a data-driven ecosystem. From blockchain-tracked beans to AI baristas, see how the daily cup is being reimagined amid climate challenges.",
    author: "Raj Patel",
    readTime: "8 min",
    tags: ["coffee", "blockchain", "AI barista", "climate resilience"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Coffee enthusiasts are witnessing a golden age in 2025, where the humble bean is fortified against climate change through gene-edited hybrids, ensuring robust flavors even as global temperatures rise."
      },
      {
        type: "heading",
        text: "Blockchain Coffee Supply Chains"
      },
      {
        type: "paragraph",
        text: "Blockchain technology allows consumers to trace every step of the coffee journey, from Ethiopian highlands to their morning brew, ensuring ethical sourcing and fair trade practices with a simple QR code scan."
      },
      {
        type: "quote",
        text: "Transparency is the new luxury in coffee."
      },
      {
        type: "heading",
        text: "Rise of the AI Barista"
      },
      {
        type: "paragraph",
        text: "AI baristas are redefining the coffee experience, crafting foam art tailored to individual tastes and adjusting brew strength based on mood data collected from wearable devices."
      },
      {
        type: "list",
        items: [
          "AI-crafted foam art for personalized cups",
          "Mood-based brewing adjustments",
          "Voice-activated orders with precision pouring"
        ]
      },
      {
        type: "paragraph",
        text: "This blend of sustainability, traceability, and personalization transforms the daily coffee ritual into a sophisticated, tech-enhanced experience."
      }
    ]
  },
  {
    id: 4,
    title: "The Craft of Cocktails: Molecular Mixology in 2025",
    category: "Cocktails & Bars",
    date: "Sep 04, 2025 09:45 PM IST",
    comments: 21,
    image: "/images/blogbeer.jpg",
    excerpt:
      "Molecular mixology takes center stage, with cocktails infused with nanotech bubbles, edible holograms, and AI-designed flavor profiles for an immersive bar experience.",
    author: "Sophia Green",
    readTime: "10 min",
    tags: ["cocktails", "mixology", "nanotech", "AI flavor"],
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Bars in 2025 have evolved into immersive laboratories where cocktails are not just drinks but multi-sensory narratives, crafted with precision using molecular techniques and cutting-edge technology."
      },
      {
        type: "heading",
        text: "Nanotech Infusions"
      },
      {
        type: "paragraph",
        text: "Nanotechnology enables bartenders to encapsulate aromas within tiny bubbles, releasing layered flavors that evolve with each sip, creating a dynamic drinking experience."
      },
      {
        type: "quote",
        text: "Each drink is not just consumed, but experienced as a narrative of evolving tastes."
      },
      {
        type: "heading",
        text: "AI Mixologists"
      },
      {
        type: "paragraph",
        text: "AI systems design custom cocktails by analyzing guest DNA and emotional states, offering personalized drinks that adapt to the moment, even in virtual metaverse lounges."
      },
      {
        type: "list",
        items: [
          "DNA-based custom cocktail creation",
          "Emotion-responsive drink adjustments",
          "Virtual bartenders in metaverse bars"
        ]
      },
      {
        type: "paragraph",
        text: "Molecular mixology blends science and art, delivering cocktails that are as much about memory-making as they are about taste."
      }
    ]
  },
  {
    id: 5,
    title: "Beyond Traditional Wine: The Bioengineered Vintages of 2025",
    category: "Wine & Spirits",
    date: "Sep 02, 2025 05:20 PM IST",
    comments: 29,
    image: "/images/blogbeer1.jpg",
    excerpt:
      "From lab-grown grapes to AI-sommelier pairings, the wine industry is rewriting centuries of tradition with bold bioengineering and digital innovation.",
    author: "Lucas Martin",
    readTime: "12 min",
    tags: ["wine", "bioengineering", "AI sommelier", "future of wine"],
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Wine, a symbol of heritage, is being reimagined in 2025 through biotechnology and digital tools, preserving its soul while pushing the boundaries of flavor and production."
      },
      {
        type: "heading",
        text: "Lab-Grown Grapes & Yeast Engineering"
      },
      {
        type: "paragraph",
        text: "Bioengineers are cultivating yeast strains that enhance wine aromas and developing lab-grown grapes resilient to climate shifts, opening new flavor frontiers."
      },
      {
        type: "quote",
        text: "Tomorrow’s grand cru may be designed in a lab, but still tell the story of the land."
      },
      {
        type: "heading",
        text: "AI Sommeliers & Personalized Pairings"
      },
      {
        type: "paragraph",
        text: "AI sommeliers scan dishes to suggest perfect wine matches and monitor cellar conditions, ensuring each bottle reaches its peak flavor potential."
      },
      {
        type: "list",
        items: [
          "Dish-scanning for instant wine pairing",
          "Custom wine blending via flavor fingerprinting",
          "AI-monitored cellars for optimal aging"
        ]
      },
      {
        type: "paragraph",
        text: "This fusion of tradition and technology ensures wine remains a timeless indulgence while adapting to the demands of a modern world."
      }
    ]
  }
];