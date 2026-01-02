export default function RestaurantSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Curry & Hops",
    "image": "https://curryandhops.com/og-image.jpg",
    "description":
      "Curry & Hops is a modern Indian bistro in Mohali where spice meets craft, offering curated Indian cuisine and finely crafted brews.",
    "servesCuisine": "Indian",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mohali",
      "addressRegion": "Punjab",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chandigarh"
    },
    "url": "https://curryandhops.com",
    "sameAs": [
      "https://www.instagram.com/curryandhopsmohali",
      "https://www.facebook.com/curryandhopsmohali"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
