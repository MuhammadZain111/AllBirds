import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lfh3.googleusercontent.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
