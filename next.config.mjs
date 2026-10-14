/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { hostname: 'localhost', protocol: 'http', port: '123', pathname: '/images/**' },
      ],
    },
  };
  

export default nextConfig;
