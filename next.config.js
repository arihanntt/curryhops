/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    // Keep your existing Cloudinary domain
    domains: ["res.cloudinary.com"],

    // Recommended: use remotePatterns (more secure & modern) for external images
    remotePatterns: [
      // Your existing ones
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
      {
        protocol: "https",
        hostname: "growomaha.com",
      },
      {
        protocol: "https",
        hostname: "bdc2020.o0bc.com",
      },
      {
        protocol: "https",
        hostname: "phulkari.com.au",
      },
      {
        protocol: "https",
        hostname: "assets.architecturaldigest.in",
      },

      // ────────────────────────────────────────────────
      // Added for Pexels (fixes your current error)
      // ────────────────────────────────────────────────
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",     // ← this is the actual image host
      },

      // Bonus: common ones you're likely using already (Unsplash, Pixabay, etc.)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
      {
        protocol: "https",
        hostname: "*.pixabay.com",
      },
    ],
  },
};

module.exports = nextConfig;