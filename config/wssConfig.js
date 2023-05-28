const app = require('./expressConfig.js');

const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

module.exports = {
  server: server,
  wss: wss
};
