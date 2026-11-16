import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 960, 1080, 1200, 1440],
    qualities: [70, 75, 80, 85],
  },
};

export default nextConfig;
