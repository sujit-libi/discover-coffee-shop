/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
