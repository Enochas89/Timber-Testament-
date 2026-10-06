import type { NextConfig } from "next";

// portal.timbertestament.com is the client portal of the company CRM, which runs on the company server
// (not on Vercel) and is published there with Tailscale Funnel. Vercel forwards every request for that host.
const PORTAL_HOST = "portal.timbertestament.com";
const PORTAL_ORIGIN = "https://flexserver.tail5bc9f4.ts.net:10000";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [{ type: "host", value: PORTAL_HOST }],
          destination: `${PORTAL_ORIGIN}/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        // The portal sends its own security headers; this site's CSP would block it.
        missing: [{ type: "host", value: PORTAL_HOST }],
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'none'; form-action 'self' https://formspree.io; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
