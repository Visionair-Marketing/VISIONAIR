import type { NextConfig } from "next";
import { basePath } from "./lib/base-path";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    // GitHub Pages has no image-optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
