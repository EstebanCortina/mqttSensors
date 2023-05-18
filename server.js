const { HOST, PORT } = require('./config/config.js');
const express = require('express');
const app = express();


const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  client.subscribe('esliSensores/#');
});

const data = {
  flama: '',
  humo: '',
  luzAmbiental: ''
};


client.on('message', (topic, message) => {
  switch (topic) {
    case "esliTest/Flama":
      data.flama = message.toString();
      break;
    case "esliTest/Humo":
      data.humo = message.toString();
      break;
    case "esliTest/LuzAmbiental":
      data.luzAmbiental = message.toString();
      break;
  }
  console.log(`Topic[${topic}]: ${message}`);
});




const router = require('./routes');
app.use('/api', router);






app.listen(PORT, HOST, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});

