/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
});

const nextConfig = {
  reactStrictMode: true, // تفعيل التحذيرات أثناء التطوير
  swcMinify: true,       // تحسين الأداء
  eslint: {
    ignoreDuringBuilds: true // تخطي أخطاء ESLint وقت build
  },
  typescript: {
    ignoreBuildErrors: true  // تخطي أخطاء TypeScript وقت build
  },
  images: {
    unoptimized: false,      // خليه false للاستفادة من تحسين الصور
    formats: ["image/avif", "image/webp"], // دعم صور حديثة عالية الجودة
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  }
};

module.exports = withPWA(nextConfig);
