/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // builds a plain static site into ./out
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
