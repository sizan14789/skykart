import type { NextConfig } from "next"; 

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*", 
  //       destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,  
  //     },
  //   ];
  // },
  images: {
    domains: [
      "plus.unsplash.com", 
      "images.unsplash.com",
      "i.ibb.co.com",
    ],
  },
};

export default nextConfig;
