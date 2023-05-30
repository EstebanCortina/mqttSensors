const client = require('../config/mqttConfig.js');
const Data = require('../models/sensor.js');
const wsBroadcast = require('../modules/wsBroadcast.js');


const conexiones = [];


module.exports = (ws) => {
  console.log("Nueva conexion");
  conexiones.push(ws);
  client.on('message', (topic, message) => {
    const messageObj = JSON.parse(message);
    console.log(messageObj);

    messageObj.forEach(sensor => {
      const fechaActual = new Date();
      const offsetHorario = -6 * 60 * 60 * 1000; // Convertir 6 horas a milisegundos

      // Aplicar el desplazamiento horario
      fechaActual.setTime(fechaActual.getTime() + offsetHorario);



      const fechaISO = fechaActual.toISOString();
      console.log(fechaActual);

      //Agregar fecha al objeto de respuesta.
      sensor.timeStamp = fechaActual;
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
    const publish = JSON.parse(message);
    if (publish.type === 1) {
      client.publish('focoEsli/api/foco1', 'Mensaje desde front');
    } else if (publish.type === 2) {
      client.publish('focoEsli/api/foco2', 'Mensaje desde front');
    } else if (publish.type === 3) {
      client.publish('focoEsli/api/foco3', 'Mensaje desde front');
    } else {
      client.publish('focoEsli/api/foco4', 'Mensaje desde front');
    }
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