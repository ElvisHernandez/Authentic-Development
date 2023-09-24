// @ts-check
const { withBlitz } = require("@blitzjs/next");
const { withSentryConfig } = require("@sentry/nextjs");

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

module.exports = withSentryConfig(
  withBlitz(config),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "authentic-development",
    project: "authentic-development",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
