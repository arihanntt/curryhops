import type { MenuSection } from "@/types/menu";

// We extend the type here to ensure TypeScript recognizes the new SEO & Bar fields
interface ExtendedMenuItem {
  name: string;
  desc: string;
  price: string;
  imageUrl?: string;
  showBottlePeg?: boolean;
  pegPrice?: string;
  bottlePrice?: string;
}

interface ExtendedMenuSection {
  title: string;
  items: ExtendedMenuItem[];
}

export default function MenuSchema({
  sections,
}: {
  sections: ExtendedMenuSection[]; // Use the extended type here
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Curry & Hops Signature Menu",
    "mainEntityOfPage": "https://curryandhops.com/menu", 
    "inLanguage": "en",
    "provider": {
      "@type": "Restaurant",
      "name": "Curry & Hops Brewing Co.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mohali",
        "addressRegion": "Punjab",
        "addressCountry": "IN"
      }
    },
    "hasMenuSection": sections.map((section) => ({
      "@type": "MenuSection",
      "name": section.title,
      "hasMenuItem": section.items.map((item) => {
        // Fallback logic: if pegPrice is missing, use standard price
        const rawPrice = item.showBottlePeg ? item.pegPrice : item.price;
        // Clean the price string to ensure only numbers are sent to Google
        const numericPrice = rawPrice ? rawPrice.replace(/[^0-9.]/g, '') : "0";

        return {
          "@type": "MenuItem",
          "name": item.name,
          "description": item.desc,
          "image": item.imageUrl ? `https://curryandhops.com${item.imageUrl}` : undefined,
          "offers": {
            "@type": "Offer",
            "price": numericPrice,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        };
      }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}