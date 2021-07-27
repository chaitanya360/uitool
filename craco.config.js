const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#ff4769",
              "layout-header-background": "#ff685A",
              "layout-trigger-background": "@primary-color",
              "component-background": "#ffeeec",
              "input-color": "black",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
