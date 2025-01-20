import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/auth/signin',
        permanent: true,
      },]},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.itch.zone',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qgxwsaucjynripudbgtz.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 180
};

export default nextConfig;
