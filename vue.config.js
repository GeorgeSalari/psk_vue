const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    port: 8080,
    allowedHosts: ["all"],
    historyApiFallback: true,
  },
  configureWebpack: {
    watchOptions: {
      poll: true,
    },
  },
});
