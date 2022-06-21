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
};

module.exports = nextConfig;
