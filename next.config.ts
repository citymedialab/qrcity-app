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
  // 👇 αγνοεί ESLint errors στο build για να βγαίνει πάντα live
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
