/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'localhost', protocol: 'http', port: '123', pathname: '/images/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/compliance',
        destination: '/sebi-compliance',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-of-information',
        permanent: true,
      },
      {
        source: '/terms-of-use',
        destination: '/terms-of-information',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
