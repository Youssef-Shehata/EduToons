/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neat-sturgeon-534.convex.cloud',
        // port:'',
        pathname: '/api/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        // port:'',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
