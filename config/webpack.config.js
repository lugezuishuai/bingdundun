const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.prod.config')
const { isEnvDevelopment } = require('./helper/constant');

module.exports = () => {
  const config = isEnvDevelopment ? devConfig : proConfig;
  return merge(baseConfig, config);
};
