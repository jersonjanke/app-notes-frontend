/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    swcMinify: true,
    styledComponents: true,
    removeConsole: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
