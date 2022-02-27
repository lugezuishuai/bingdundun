const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { isAnalyse } = require('./helper/constant');

module.exports = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    isAnalyse && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      '...',
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          priority: -20, // 优先级，当模块符合多个规则时，采取优先级高的规则
          minChunks: 2, // 模块被引用2次及以上的才抽离
          reuseExistingChunk: true, // 已经被分离，被重用而不是生成新的模块
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
        base: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-use|react-redux|redux)[\\/]/,
          name: 'base',
          priority: 0,
        },
        libs: {
          test: /[\\/]libs[\\/]/,
          name: 'libs',
          priority: 10,
        },
      },
    },
  },
};
