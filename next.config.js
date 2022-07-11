const nextConfig = {
  reactStrictMode: false,
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
