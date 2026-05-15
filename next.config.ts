/**
 * Performance notes:
 * - If PageSpeed shows ~2.5–3s critical path to `bam.nr-data.net`, that is New Relic browser/RUM injected by the host (e.g. Vercel Observability),
 *   not this repo. Disable RUM or load it after idle in the dashboard — otherwise mobile LCP stays capped regardless of app code.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    /** Allow `quality={95}` on `next/image` (case study rasters). Default is `[75]`. */
    qualities: [75, 95],
    localPatterns: [
      {
        pathname: "/**",
      },
      {
        pathname: "/**",
        search: "?v=20260508-hq",
      },
      {
        pathname: "/**",
        search: "?v=20260514-hq",
      },
      {
        pathname: "/**",
        search: "?v=20260516-b2b-case",
      },
      {
        pathname: "/**",
        search: "?v=20260516-sfc-case",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
    /**
     * Inline Tailwind/App CSS into the HTML doc to avoid render-blocking CSS on first paint (helps LCP/FCP on slow mobile).
     * Trade-off: larger HTML on first load; better for mostly-static portfolios with modest CSS.
     */
    inlineCss: true,
  },
};

export default nextConfig;
