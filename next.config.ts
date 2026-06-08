import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/orientgrill1",
  assetPrefix: "/orientgrill1/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
