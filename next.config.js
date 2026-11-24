
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Prevent public caching of private user and admin pages.
  async headers() {
    return [
      {
        source: '/user/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-store',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
