// craco.config.js
// https://github.com/DocSpring/craco-antd/pull/75
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A",
              "@link-color": "#1DA57A",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
