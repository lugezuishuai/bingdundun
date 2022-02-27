module.exports = [
  {
    path: '/api',
    changeOrigin: true,
    target: 'http://localhost:4001',
    headers: { 'Access-Control-Allow-Origin': '*' },
    // pathRewrite(path) {
    //     return path.replace('/api', '/') + '.json';
    // }
  },
  {
    path: '/socket.io',
    changeOrigin: true,
    target: 'http://localhost:4001',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ws: true, // 支持WebSocket
  }
];
