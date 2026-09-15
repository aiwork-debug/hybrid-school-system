import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb", // Barri video files aur slides upload karne ke liye limit barha di hai
    },
  },
};

export default nextConfig;