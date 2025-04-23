/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/P_Page',
  assetPrefix: '/P_Page',
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Generate a static version of the API route
  async rewrites() {
    return [
      {
        source: '/api/posts',
        destination: '/api/posts.json',
      },
    ]
  },
}

module.exports = nextConfig 