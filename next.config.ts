import type { NextConfig } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: { fullUrl: true },
    browserToTerminal: true,
    incomingRequests: true,
  },
  trailingSlash: true,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://interns-test-fe.snp.agency/api/:path*/`,
      },
    ];
  },
};

export default nextConfig;
