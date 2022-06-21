/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    swcMinify: true,
    styledComponents: true,
  },
};

module.exports = nextConfig;
