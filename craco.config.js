const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#00C2FF",
              "layout-header-background": "#0080B9",
              "layout-trigger-background": "@primary-color",
              "component-background": "#0080B9",
              "input-color": "white",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
