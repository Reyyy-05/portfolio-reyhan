/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['github.com', 'raw.githubusercontent.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
