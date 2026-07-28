import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Découverte par les agents (RFC 8288) : llms.txt décrit le site,
            // le sitemap en liste les URLs.
            key: "Link",
            value:
              '</llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
