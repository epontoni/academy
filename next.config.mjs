/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "utfs.io",
            //port: "443",
          },
        ],
      },
};

export default nextConfig;
