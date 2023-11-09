const url = new URL(process.env.CMS_IMAGE_PATTERN);
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
      },
    ],
  },
};
