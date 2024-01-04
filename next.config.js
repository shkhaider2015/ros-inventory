/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ros-rosbucket221548-newdev.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
