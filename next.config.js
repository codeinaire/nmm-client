const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack: (config) => {
    // https://github.com/justadudewhohacks/face-api.js/issues/154
    config.node = { fs: "empty", fetch: "empty" };
    return config;
  },
  target: "serverless",
});
