const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    port: 8080,
    allowedHosts: ["all"],
  },
  configureWebpack: {
    watchOptions: {
      poll: true,
    },
  },
});
