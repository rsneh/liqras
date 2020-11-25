const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-plugin-svgr");

module.exports = withPlugins([
  withSvgr
]);
