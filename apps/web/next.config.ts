import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@insucare/domain"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
