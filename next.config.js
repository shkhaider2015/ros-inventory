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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude handlebars from webpack
      config.externals.push('handlebars');
      config.externals.push('draft-js')
    }

    return config;
  },
};

module.exports = nextConfig;
