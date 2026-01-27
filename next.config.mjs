/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zrrffsjbfkphridqyais.supabase.co",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "al-azab.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dn4ne1ep1/**",
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
}

export default nextConfig
