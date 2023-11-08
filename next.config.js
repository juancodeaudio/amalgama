/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverActions: true
  },
  transpilePackages: ['three'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
 
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
