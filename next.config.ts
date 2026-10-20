import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The site ships no user accounts and no sensitive state, so the goal here is
 * narrow and achievable: make it hard to frame, hard to fingerprint, and hard
 * to leak a referrer to a third party. Every one of these is a single header
 * with no runtime cost and no way for a page to opt out of it by accident.
 *
 * There is deliberately no Content-Security-Policy yet. A CSP that is not
 * enforced with a nonce is theatre, and Next's inline bootstrap scripts need
 * one — that is a change worth making properly (via middleware) rather than
 * shipping a policy loose enough to allow `unsafe-inline`, which allows
 * exactly the thing a CSP exists to stop.
 */
const securityHeaders = [
  // No framing: this site is never a widget inside someone else's page.
  { key: "X-Frame-Options", value: "DENY" },
  // Trust the declared Content-Type instead of letting the browser guess.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin cross-site, the full path same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here needs a camera, a microphone or a location.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // The version number of the framework is not a thing visitors need.
  poweredByHeader: false,

  images: {
    // AVIF first, WebP as the fallback: the product screenshots are large flat
    // UI surfaces, which is exactly the content AVIF compresses best.
    formats: ["image/avif", "image/webp"],
    // 90 is for the product screenshots: small UI text turns soft at the
    // default 75. Everything else keeps 75.
    qualities: [75, 90],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
