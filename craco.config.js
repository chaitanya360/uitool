const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // "primary-color": "#ff4769",
              // "layout-header-background": "#ff685A",
              // "layout-trigger-background": "@primary-color",
              // "component-background": "#ffeeec",
              // "input-color": "black",
              "primary-color": "#2C2C2C",
              "layout-header-background": "#3a3a3a",
              "layout-trigger-background": "dodgerblue",
              "component-background": "#c8ffe3",
              "input-color": "black",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
