// Prefixes public-asset paths for GitHub Pages project-page hosting, where
// the site is served from /VISIONAIR instead of the domain root. Set via
// NEXT_PUBLIC_BASE_PATH in .github/workflows/deploy.yml; leave unset on
// Vercel/Cloudflare/local dev so assets resolve from the root as normal.
//
// next/image's `unoptimized` mode does not auto-prefix local image src
// strings with basePath during static export, so any <Image>/<img> pointing
// at a /public asset must prepend this manually.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prefixes a root-absolute /public path with basePath, e.g. asset("/images/x.jpg").
export function asset(path: string): string {
  return `${basePath}${path}`;
}
