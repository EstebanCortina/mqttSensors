const { client, wss, WebSocket } = require('../config/config.js');


client.on('connect', () => {
  client.subscribe('esliPrueba');
  console.log("Suscrito");
});

wss.on('connection', () => {
  console.log("WebSocket conectado");
})

const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  timeStamp: {
    type: Date
  },
  sensorName: String,
  value: Number,
  state: Boolean
}, { collection: 'sensores' }); // Especificar el nombre de la colección

// Modelo basado en el esquema
const Data = mongoose.model('Data', dataSchema);



module.exports = (req, res) => {

  client.on('message', (topic, message) => {
    const messageObj = JSON.parse(message);
    console.log(messageObj);
    messageObj.forEach(sensor => {
      const fechaActual = new Date();
      const offset = (fechaActual.getTimezoneOffset() + 60) * 60 * 1000;
      const fechaLocal = new Date(fechaActual.getTime() - offset);
      const fechaISO = fechaLocal.toISOString();
      //console.log(fechaLocal);      
      (async () => {
        try {
          const nuevoDocumento = new Data({
            timeStamp: fechaISO,
            sensorName: sensor.name,
            value: sensor.value,
            state: sensor.state
          });

          // Guardar el nuevo documento
          await nuevoDocumento.save();

          console.log('Documento insertado correctamente.');
        } catch (error) {

        }
      })();
    });


    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });


  res.status(200).send("Escuchando");
}
