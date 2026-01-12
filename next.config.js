/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    // This is the key change — allows ANY external domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',           // ← wildcard = allow all https domains
      },
      {
        protocol: 'http',
        hostname: '**',           // ← optional: also allow http (less secure, but useful sometimes)
      },
    ],
  },
};

module.exports = nextConfig;