/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // you can increase if needed
    },
  },
};

module.exports = nextConfig;
