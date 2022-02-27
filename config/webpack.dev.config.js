const proxy = require('./helper/proxy');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    client: {
      logging: 'error',
      overlay: false,
      webSocketTransport: 'ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    historyApiFallback: true,
    open: true,
    port: 5000,
    proxy,
    watchFiles: {
      options: {
        ignored: process.env.WATCH_FILES_REG ? !new RegExp(process.env.WATCH_FILES_REG) : undefined,
      },
    },
    webSocketServer: 'ws',
  },
};
