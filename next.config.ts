import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
          {
            protocol: "https",
            hostname: "api.dicebear.com",
          },
          {
            protocol: "https",
            hostname: "illustrations.popsy.co",
            port: "",
            pathname: "/violet/man-and-calendar.svg",
          },
      {
        protocol: "https",
        hostname: "wcqqluhzyzprvmfqsdgh.supabase.co",
      }
    ]
  }
};

export default nextConfig;


