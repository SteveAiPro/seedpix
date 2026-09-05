/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // www → 无 www 301 统一（避免重复内容；seedpix.org 为主 host）
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.seedpix.org" }],
        destination: "https://seedpix.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
