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
    title: "Modern Indian Bistro vs Traditional Restaurants in Mohali: The Real Difference",
    category: "Indian Dining",
    date: "Jan 15, 2026",
    comments: 14,
    excerpt: "Discover why diners in Mohali are switching to Modern Indian Bistros. We explore the evolution of regional flavours, contemporary plating, and the perfect dining vibe at Curry & Hops Aerocity.",
    author: "Curry & Hops Team",
    readTime: "8 min",
    tags: ["best restaurant in mohali", "modern indian bistro", "indian food aerocity"],
    featured: true,
    content: [
      { type: "paragraph", text: "The Mohali dining scene has evolved rapidly. While traditional dhabas and legacy restaurants focus on heavy cream and standard gravies, the Modern Indian Bistro focuses on lightness, ingredient sourcing, and visual storytelling." },
      { type: "heading", text: "Why Mohali Diners Prefer the Bistro Experience" },
      { type: "paragraph", text: "Unlike the noisy environment of casual eateries, a bistro like Curry & Hops offers a curated space designed for long conversations, craft beverages, and high-quality Indian fusion." },
      { type: "list", items: ["Small-batch, fresh ingredient sourcing", "Balanced spice profiles for global palates", "Artisanal plating that respects tradition", "A sophisticated yet relaxed acoustic environment"] },
      { type: "quote", text: "Modern Indian food isn’t about changing flavours—it’s about respecting them with contemporary intention." }
    ]
  },
  {
    id: 2,
    title: "Ultimate Guide to the Best Brewery in Mohali: What to Look for in a Craft Beer",
    category: "Craft Beer",
    date: "Jan 10, 2026",
    comments: 21,
    excerpt: "Searching for the best brewery in Mohali? Learn about our microbrewery process, seasonal craft beer taps, and why Curry & Hops is the top-rated pub for beer lovers near Chandigarh.",
    author: "Head Brewer, Curry & Hops",
    readTime: "10 min",
    tags: ["best brewery in mohali", "microbrewery chandigarh", "craft beer mohali"],
    featured: true,
    content: [
      { type: "heading", text: "What Makes a Microbrewery Truly 'Craft'?" },
      { type: "paragraph", text: "Most commercial beers are pasteurized and filled with preservatives. In our Mohali brewery, our beer is live, unfiltered, and brewed in small batches to preserve the complex malt and hop profiles." },
      { type: "heading", text: "Top Craft Beers on Tap This Season" },
      { type: "list", items: ["Belgian Witbier: Citrusy and refreshing with coriander notes", "Premium Lager: Crisp, clean, and perfect for the Punjab heat", "Indian Pale Ale (IPA): Bold hops with a fruity aroma", "Specialty Stout: Smooth, dark, and chocolatey for winter evenings"] },
      { type: "quote", text: "The best beer is the one that tells a story of its ingredients and the hands that brewed it." }
    ]
  },
  {
    id: 3,
    title: "10 Best Places to Eat in Mohali: Why We Top the List for Families & Foodies",
    category: "Local Dining",
    date: "Jan 05, 2026",
    comments: 11,
    excerpt: "Finding the best places to eat in Mohali can be overwhelming. We've curated a list of top-rated spots, featuring Curry & Hops for its unique blend of craft beer and modern Indian cuisine.",
    author: "Curry & Hops Kitchen",
    readTime: "7 min",
    tags: ["best places to eat in mohali", "top restaurants aerocity", "dining near chandigarh airport"],
    featured: false,
    content: [
      { type: "paragraph", text: "Aerocity, Mohali has become a culinary hub. Whether you are a local or traveling from Chandigarh Airport, finding a restaurant that offers both quality food and great service is key." },
      { type: "heading", text: "Consistency: The Secret to Being the Best Restaurant" },
      { type: "paragraph", text: "At Curry & Hops, we believe a great menu is one the kitchen can execute perfectly every single day. From our slow-cooked dals to our tandoori platters, every bite is tested for consistency." },
      { type: "list", items: ["Centrally located in G-Block Aerocity", "Ample parking for large family groups", "Customized birthday and anniversary packages", "Outdoor and indoor seating options"] }
    ]
  },
  {
    id: 4,
    title: "Sufi Nights and Live Music: The Best Nightlife Experience in Mohali",
    category: "Events",
    date: "Dec 28, 2025",
    comments: 19,
    excerpt: "Looking for live music in Mohali tonight? Discover the magical Sufi nights and acoustic sessions at Curry & Hops, the heart of Aerocity nightlife.",
    author: "Events Manager",
    readTime: "6 min",
    tags: ["live music mohali", "sufi night chandigarh", "nightlife in mohali"],
    featured: false,
    content: [
      { type: "heading", text: "The Soul of Aerocity: Live Unplugged Sessions" },
      { type: "paragraph", text: "Nightlife in Mohali has shifted from loud, crowded clubs to soulful, acoustic environments. Our Sufi nights have become a signature event for those who appreciate good music with their craft beer." },
      { type: "quote", text: "Music is the wine that fills the cup of silence—and it pairs best with our freshly brewed hops." },
      { type: "paragraph", text: "Join us every weekend for performances by the Tri-city's best artists. We offer a sophisticated space where you can actually hear the music and your conversation at the same time." }
    ]
  },
  {
    id: 5,
    title: "Top 5 Family Restaurants in Mohali for Large Groups & Celebrations",
    category: "Family Dining",
    date: "Dec 20, 2025",
    comments: 8,
    excerpt: "Planning a family dinner? Check out why Curry & Hops is rated among the best family restaurants in Mohali for birthdays, anniversaries, and reunions.",
    author: "Curry & Hops Team",
    readTime: "7 min",
    tags: ["family restaurant mohali", "birthday celebration mohali", "group dining aerocity"],
    featured: false,
    content: [
      { type: "heading", text: "Space, Service, and Spice Levels" },
      { type: "paragraph", text: "Families in Mohali value comfort. Our restaurant is designed with large tables and a dedicated staff trained to handle the unique needs of multi-generational groups." },
      { type: "list", items: ["Kids-friendly non-spicy options", "Comfortable sofa seating for elders", "Private dining sections for celebrations", "Prompt service for hungry little ones"] }
    ]
  },
  {
    id: 6,
    title: "Craft Beer & Biryani: Why This is the Ultimate Food Pairing in Mohali",
    category: "Food Pairing",
    date: "Dec 15, 2025",
    comments: 15,
    excerpt: "Learn the secrets of pairing craft beer with spicy Indian food. Our head brewer breaks down why a Belgian Witbier is the perfect companion for our signature Biryani.",
    author: "Master Brewer",
    readTime: "9 min",
    tags: ["best biryani in mohali", "beer and food pairing", "brewery experience"],
    featured: false,
    content: [
      { type: "paragraph", text: "The carbonation and malt profile of craft beer act as a palate cleanser, making it a far superior pairing for Indian spices than traditional wine or spirits." },
      { type: "heading", text: "How to Match Flavours" },
      { type: "list", items: ["Spicy Kebabs + Bold IPA", "Creamy Dal Makhani + Smooth Lager", "Fragrant Biryani + Belgian Witbier", "Rich Desserts + Coffee Stout"] }
    ]
  },
  {
    id: 7,
    title: "Best Places for a Date Night in Mohali: Ambience, Food, and Music",
    category: "Lifestyle",
    date: "Dec 05, 2025",
    comments: 25,
    excerpt: "Searching for the perfect date night spot? Discover why Curry & Hops offers the best ambience and romantic setting for couples in Aerocity Mohali.",
    author: "Curry & Hops Team",
    readTime: "5 min",
    tags: ["date night places mohali", "romantic restaurants mohali", "best ambience mohali"],
    featured: false,
    content: [
      { type: "paragraph", text: "A date night requires three things: Dim lighting, soft music, and food that prompts conversation. Our bistro is designed to offer an intimate atmosphere without being overly formal." },
      { type: "heading", text: "The Perfect Date Night Itinerary" },
      { type: "list", items: ["Start with our craft beer sampler", "Share a platter of our modern Indian appetizers", "Enjoy a live acoustic set", "Finish with our signature fusion dessert"] }
    ]
  },
  {
    id: 8,
    title: "Aerocity Mohali: The Rising Culinary Hub Near Chandigarh Airport",
    category: "Local News",
    date: "Nov 25, 2025",
    comments: 12,
    excerpt: "Aerocity is no longer just a residential area—it's Mohali's new food capital. See why travelers and locals are flocking to this area for the best dining experiences.",
    author: "Local Foodie",
    readTime: "6 min",
    tags: ["aerocity mohali restaurants", "dining near mohali airport", "it city mohali food"],
    featured: false,
    content: [
      { type: "paragraph", text: "With the expansion of IT City and proximity to Chandigarh International Airport, Aerocity Mohali has seen a boom in premium dining options, led by innovative brands like Curry & Hops." },
      { type: "heading", text: "Convenience Meets Quality" },
      { type: "paragraph", text: "Whether you are catching a flight or working in a nearby tech park, the area now offers world-class microbreweries and fine-dining bistros within a 5-minute radius." }
    ]
  },
  {
    id: 9,
    title: "What to Look for in a Microbrewery: A Masterclass by Curry & Hops",
    category: "Brewery Education",
    date: "Nov 15, 2025",
    comments: 10,
    excerpt: "Ever wondered how your beer is made? We take you behind the scenes of our microbrewery in Mohali to show you the science of hops, malt, and fermentation.",
    author: "Head Brewer",
    readTime: "11 min",
    tags: ["how beer is made", "mohalis best brewery", "microbrewery guide"],
    featured: false,
    content: [
      { type: "heading", text: "The 4 Pillars of Great Beer" },
      { type: "paragraph", text: "Water quality, malt selection, hop variety, and yeast health. At our Mohali facility, we use imported malts and temperature-controlled fermentation to ensure every pint is world-class." },
      { type: "list", items: ["Milling and Mashing", "Boiling and Hopping", "Fermentation (The Magic Step)", "Conditioning and Serving"] }
    ]
  },
  {
    id: 10,
    title: "Planning a Corporate Event in Mohali? Choose the Right Venue",
    category: "Corporate",
    date: "Nov 05, 2025",
    comments: 5,
    excerpt: "Host your next corporate lunch or team-building event at Mohali's premier bistro. High-speed Wi-Fi, premium craft beer, and a professional yet relaxed environment.",
    author: "Business Events Team",
    readTime: "6 min",
    tags: ["corporate event venue mohali", "business lunch mohali", "team dinner aerocity"],
    featured: false,
    content: [
      { type: "heading", text: "Work Meets Play" },
      { type: "paragraph", text: "Our venue offers the perfect balance for corporate gatherings. Use our quiet sections for lunch meetings, and switch to our brewery section for post-work team celebrations." },
      { type: "list", items: ["Customized corporate meal menus", "High-speed internet for presentations", "Exclusive brewery tours for team building", "Professional service and billing"] }
    ]
  }
];