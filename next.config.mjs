/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn-icons-png.flaticon.com", "geographyandyou.com"], // ✅ allow this host
  },
};

export default nextConfig;
