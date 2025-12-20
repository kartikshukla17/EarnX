import type { NextConfig } from "next";
import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Skip type checking during build for deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during build for deployment
    ignoreDuringBuilds: true,
  },
  images:{
    domains: [
      "i.pinimg.com", ]
  },
  webpack: (config) => {
    // Handle ESM modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
    };

    // Handle ESM modules in node_modules
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Add ignore patterns for problematic modules
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /Module not found: Can't resolve/,
      /Can't resolve '\.\/modular\.js'/,
      /Can't resolve '\.\/utils\.js'/,
    ];

    return config;
  },
  // experimental: {
  //   esmExternals: 'loose',
  // },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "849ae2c8-85c2-4b7f-ba56-95e47f684738"
});

export default withCivicAuth(nextConfig)
