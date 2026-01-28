import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Configure to use PORT environment variable
  env: {
    PORT: process.env.PORT || '8000',
  },
};

export default nextConfig;
