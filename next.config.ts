import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    // Ensure TS errors are caught during build (matches Vercel behavior)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
