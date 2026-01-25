/** @type {import('next').NextConfig} */
process.env.NEXT_DISABLE_GOOGLE_FONTS = "1"
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zrrffsjbfkphridqyais.supabase.co",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
}

export default nextConfig
