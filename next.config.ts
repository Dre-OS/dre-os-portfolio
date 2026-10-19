import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/**'), new URL('https://via.placeholder.com/**')],
  },
};

export default nextConfig;
