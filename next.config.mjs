/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? {
        output: "export",
        trailingSlash: true
      }
    : {}),
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["three", "gsap"]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source"
    });
    return config;
  }
};

export default nextConfig;
