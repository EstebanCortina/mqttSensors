const client = require('../config/mqttConfig.js');
const Data = require('../models/sensor.js');
const wsBroadcast = require('../modules/wsBroadcast.js');


const conexiones = [];


module.exports = (ws) => {
  console.log("Nueva conexion");
  conexiones.push(ws);
  client.on('message', (topic, message) => {

    const messageObj = JSON.parse(message);

    messageObj.forEach(sensor => {
      const fechaActual = new Date();
      const offset = (fechaActual.getTimezoneOffset() + 60) * 60 * 1000;
      const fechaLocal = new Date(fechaActual.getTime() - offset);
      const fechaISO = fechaLocal.toISOString();

      //Agregar fecha al objeto de respuesta.
      sensor.timeStamp = fechaLocal;
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


        } catch (error) {

        }
      })();
    });
    (async () => {
      try {
        await wsBroadcast(conexiones, ws, messageObj);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  //Websockets actions

  ws.on('message', (message) => {
    console.log(JSON.parse(message));
    client.publish('focoEsli/api/foco1', 'Mensaje desde front');
  });

  ws.on('close', () => {
    (async () => {
      try {
        await wsBroadcast(conexiones, ws);
        console.log("cerrado");
      } catch (error) {
        console.error(error);
      }
    })();
  });

}