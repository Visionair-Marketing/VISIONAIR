import type { NextConfig } from "next";

// Only apply the GitHub Pages project-page subpath during the Pages build
// (set by .github/workflows/deploy.yml). Leave it empty everywhere else so
// local dev and any other host (e.g. Vercel) keep serving from root.
const basePath = process.env.GITHUB_PAGES === "true" ? "/VISIONAIR" : "";

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
