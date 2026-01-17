export default function RestaurantSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://curryandhops.com/#restaurant",
    "name": "Curry and Hops",
    "alternateName": "Curry & Hops Mohali",
    "image": "https://curryandhops.com/og-image.jpg",
    "description": "Curry and Hops is a premier modern Indian bistro and microbrewery in Mohali where spice meets craft. Offering curated Indian cuisine, finely crafted brews, and live music events.",
    "servesCuisine": ["Indian", "Modern Indian", "Brewery", "Tandoori"],
    "priceRange": "₹₹",
    "telephone": "+918699966565", 
    "url": "https://curryandhops.com",
    "menu": "https://curryandhops.com/menu",
    
    // ✅ EXACT ADDRESS FROM YOUR GOOGLE MAPS LINK
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gmada Aerocity",
      "addressLocality": "Sahibzada Ajit Singh Nagar",
      "addressRegion": "Punjab",
      "postalCode": "140306",
      "addressCountry": "IN"
    },
    
    // ✅ PRECISE COORDINATES FOR "NEAR ME" SEARCHES
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.632128,
      "longitude": 76.767222
    },

    "areaServed": [
      { "@type": "City", "name": "Mohali" },
      { "@type": "City", "name": "Chandigarh" },
      { "@type": "City", "name": "Zirakpur" }
    ],

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "23:59"
      }
    ],

    "sameAs": [
      "https://www.instagram.com/curryandhopsmohali",
      "https://www.facebook.com/curryandhopsmohali",
      "https://www.zomato.com/chandigarh/curry-hops-aerocity-mohali"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}