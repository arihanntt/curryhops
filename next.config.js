/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // keep this
    },
  },

  // 👇 ADD THIS (fixes Vercel build error)
  
};

module.exports = nextConfig;
