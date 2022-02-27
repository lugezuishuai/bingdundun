const path = require('path');

// 项目根目录
const basePath = path.join(__dirname, '../../');

function resolve(...params) {
  return path.resolve(basePath, ...params)
}

module.exports = resolve;