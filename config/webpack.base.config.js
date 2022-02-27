const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 单独抽离css文件
const WebpackBar = require('webpackbar');
const resolve = require('./helper/resolve');
const webpack = require('webpack');
const dotenv = require('dotenv');
const { isEnvProduction, publicPath, srcPath, distPath } = require('./helper/constant');
dotenv.config({ path: '.env' });

const miniCssLoader = isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: false, // 禁用css Modules
  },
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    cacheCompression: false,
    compact: isEnvProduction,
  },
};

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: isEnvProduction ? 'js/[name].[contenthash:8].js' : '[name].[hash:8].js',
    chunkFilename: isEnvProduction ? 'js/[name].[contenthash:8].js' : '[name].[hash:8].js',
    path: distPath,
    publicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': srcPath,
    },
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
      tsconfig: [resolve('tsconfig.json')],
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        use: [babelLoader],
        exclude: [/node_modules/, resolve('libs/three.min.js')],
      },
      {
        test: /\.css$/i,
        use: [
          miniCssLoader,
          cssLoader, 
        ]
      },
      {
        test: /\.(png|jpe?g|gif|glb|gltf)(\?.*)?$/,
        type: 'asset', // url-loader
        generator: {
          filename: 'image/[name].[hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    // 如果需要web环境也能访问，必须用这个插件注入
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      title: '冰墩墩',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      filename: 'index.html',
      env: process.env.NODE_ENV,
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new WebpackBar(),
  ],
};
