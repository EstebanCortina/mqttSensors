const { client, wss } = require('../config/config.js');


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
