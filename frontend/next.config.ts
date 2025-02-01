import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"], // Allow Cloudinary images
  },
};

export default nextConfig;
