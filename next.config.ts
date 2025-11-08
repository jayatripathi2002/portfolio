import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    // Disable legacy image optimization API
    disableStaticImages: true,
    // Enable modern image optimization
    unoptimized: false,
  },
  // Enable static exports for images
  output: 'standalone',
};

export default nextConfig;
