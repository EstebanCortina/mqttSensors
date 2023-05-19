const { WSPORT } = require('../config/config.js');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: WSPORT });


client.on('connect', () => {
  client.subscribe('esliPrueba');
  console.log("Suscrito");
});

wss.on('connection', () => {
  console.log("WebSocket conectado");
})

module.exports = (req, res) => {

  client.on('message', (topic, message) => {
    console.log(JSON.parse(message));


    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });


  });
  res.status(200).send("Escuchando");
}
