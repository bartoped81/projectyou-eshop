import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  eslint: {
    // Ignorovat ESLint chyby při production buildu
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorovat TypeScript chyby při production buildu (dočasně)
    ignoreBuildErrors: true,
  },
  // Vypnout static export pro stránky které používají dynamické funkce
  output: undefined,
};

export default nextConfig;
