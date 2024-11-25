/** @type {import('next').NextConfig} */
const nextConfig = {
  cleanDistDir: true,
  poweredByHeader: false,
  reactStrictMode: false,
  experimental: {
    optimizeServerReact: false,
    taint: true,
  },
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/notifications',
      '@mantine/modals',
      '@mantine/carousel',
      '@mantine/dates',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
