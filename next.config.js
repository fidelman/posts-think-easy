/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
