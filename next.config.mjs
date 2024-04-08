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
    ],
  },
};

export default nextConfig;
