import type { MenuSection } from "@/types/menu";

export default function MenuSchema({
  sections,
}: {
  sections: MenuSection[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Curry & Hops Menu",
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.desc,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "INR",
        },
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
