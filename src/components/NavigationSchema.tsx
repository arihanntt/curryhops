export default function NavigationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Food & Bar Menu",
        "url": "https://curryandhops.com/menu"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Upcoming Events",
        "url": "https://curryandhops.com/events"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Our Blogs",
        "url": "https://curryandhops.com/blogs"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Contact Us",
        "url": "https://curryandhops.com/contact"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}