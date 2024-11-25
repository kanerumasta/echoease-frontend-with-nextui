const env = require('./utils/validateEnv'); // This will validate and load environment variables

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images:{
    domains: ['192.168.1.242']
  }

};

module.exports = nextConfig;
