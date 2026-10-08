import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.83.96.173",
    "10.83.96.*",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
