const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-plugin-svgr");

const nextConfig = {
  images: {
    domains: [
      'localhost',
      'avatars1.githubusercontent.com'
    ],
  }
};

module.exports = withPlugins([
  withSvgr
], nextConfig);
