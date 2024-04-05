/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: () => [
    {
      source: '/',
      destination: '/dashboard',
      permanent: true
    }
  ],
}

module.exports = nextConfig
