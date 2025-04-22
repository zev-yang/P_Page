/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/P_Page',
  assetPrefix: '/P_Page/',
}

module.exports = nextConfig 