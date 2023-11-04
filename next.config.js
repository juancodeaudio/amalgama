/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverActions: true
  },
  transpilePackages: ['three'],
}
 
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
