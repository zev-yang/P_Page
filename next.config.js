/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/P_Page',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/P_Page',
  trailingSlash: true,
}

module.exports = nextConfig 