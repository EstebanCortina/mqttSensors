const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  client.subscribe('focoEsli/datos');
  console.log("Suscrito");
});

module.exports = client;