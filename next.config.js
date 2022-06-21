/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: true,
    removeConsole: {
      exclude: ['error'],
    },
  },
};

module.exports = nextConfig;
