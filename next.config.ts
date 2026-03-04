import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',          // optional, leave empty
        pathname: '/**',   // allow any path/size on this domain
      },
      // Optional: Add your real production image hosts too (e.g. Unsplash, Cloudinary, your S3 bucket)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // If you use Firebase Storage, AWS S3, etc., add them here
    ],
  },
};

export default nextConfig;