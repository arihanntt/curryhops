/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    // Keep Cloudinary
    domains: ["res.cloudinary.com"],

    // Allow external editorial / stock images
    remotePatterns: [
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
      
    ],
  },
};

module.exports = nextConfig;
