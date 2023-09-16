// @ts-check
const { withBlitz } = require("@blitzjs/next");

if (!process.env.AWS_S3_IMAGE_HOST) {
  throw new Error("AWS_S3_IMAGE_HOST must be defined");
}

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.AWS_S3_IMAGE_HOST,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withBlitz(config);
