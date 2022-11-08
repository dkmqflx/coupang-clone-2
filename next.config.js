/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'thumbnail8.coupangcdn.com',
      'thumbnail6.coupangcdn.com',
      'thumbnail10.coupangcdn.com',
    ],
  },
};

module.exports = nextConfig;
