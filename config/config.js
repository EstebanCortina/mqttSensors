const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

const db = require('../db/mongodb.js');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://test.mosquitto.org');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.WSPORT });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000,
  DB: db,
  client: client,
  wss: wss
}


