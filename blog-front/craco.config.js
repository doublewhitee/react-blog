// craco.config.js
// https://github.com/DocSpring/craco-antd/pull/75
const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
};
