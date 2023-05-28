const WebSocket = require('ws');
const { wss } = require('../config/wssConfig.js');

function wsBroadcast(conexiones, ws, message) {
  return new Promise((resolve, reject) => {
    const index = conexiones.indexOf(ws);
    if (index !== -1) {
      conexiones.splice(index, 1);
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
    resolve();
  })
}






module.exports = wsBroadcast;