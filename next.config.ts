import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**", // επιτρέπει όλα τα paths του Sanity CDN
      },
    ],
  },
};

export default nextConfig;
