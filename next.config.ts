import type { NextConfig } from "next";

const adminHeaders = [
  { key: "Cache-Control", value: "private, no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 960, 1080, 1200, 1440],
    qualities: [70, 75, 80, 85],
    localPatterns: [
      { pathname: "/media/**", search: "" },
      { pathname: "/api/photos/*", search: "" },
    ],
  },
  async headers() {
    return ["/admin/:path*", "/api/admin/:path*"].map((source) => ({ source, headers: adminHeaders }));
  },
};

export default nextConfig;
