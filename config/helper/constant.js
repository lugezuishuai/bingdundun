const resolve = require("./resolve");
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const env = process.env;
const isEnvProduction = env.NODE_ENV === 'production';
const isEnvDevelopment = env.NODE_ENV === 'development';
const isAnalyse = env.ANALYSE_ENABLED === 'true';
const publicPath = isEnvProduction ? env.SERVICE_URL : '/';
const srcPath = resolve('src');
const distPath = resolve('dist');

module.exports = {
  isEnvProduction,
  isEnvDevelopment,
  isAnalyse,
  publicPath,
  srcPath,
  distPath,
};