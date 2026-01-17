import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'], // Protect your private routes
    },
    sitemap: 'https://curryandhops.com/sitemap.xml', // Replace with your real domain
  };
}