import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "standalone",
  poweredByHeader: false,
  redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "inventory\\.rollingtime\\.de" }],
        destination: "https://openinventory.polyxo.de/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
