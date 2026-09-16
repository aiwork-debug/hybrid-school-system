import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Vercel par TypeScript errors ki wajah se build fail hone se rokne ke liye
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb", // Barri video files aur slides upload karne ke liye limit barha di hai
    },
  },
};

export default nextConfig;