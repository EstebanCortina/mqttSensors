# mqttSensors

Este servidor obtiene datos de sensores, recopilados y gestionados por un ESP32 a través del protocolo de comunicación MQTT.

# Cosas por hacer:
### *__18/05/2023 -- 19/05/2023__*
- Investigar como usar websockets. (crear uno en el backend y conectarme a el desde el frontend) ✅

- Investigar como usar la libreria ArduinoJSON. ✅

- Rehacer la libreria para el ESP32 y probar en local. ✅  
  - Quitar codigo que ya no sirve. __*Listo*__
  - Añadir Multiwifi. __*Listo*__
  - Empaquetar la data de los sensores en un JSON. __*Pendiente*__ (Necesito mas cables para conectar los demas sensores, pero ya mando el luxometro en Json y volver a checar que pines pueden ser analog)
  - Hacer publish del JSON. __*Listo*__
  - Revisar que el JSON si lo reciba el servidor. __*Listo*__

- Definir los websockets y establecer la comunicacion en tiempo real. __*Listo*__ ✅
### *__19/05/2023 -- 21/05/2023__*
- Investigar como funcionan las colecciones Time Series de MongoDB. ✅
  - Esquema de la BD: BD:data, Coleccion: sensores, timeField: timeStamp, metaField: sensorName, granularity: seconds.
- Definir el schema de los documentos a insertar en la coleccion de MongoDB. ✅ 
    ````JSON
      {
        "_id":objectId(),
        "timeStamp": dateTime,
        "sensorName": String,
        "value": int                
      }
    ````
    - Ver si es lo mejor un json con todos los valores, o jsons invidivuales para cada sensor
  - Revisar tipos de datos. __*Listo*__ (Lux=analog, humo=analog, flama=analog con el map (1,2,3))
  - Observar similitudes. __*Listo*__ (Todos tienen valores, todos se toman en un cierto tiempo y todos tienen un nombre)
  - Aclarar dudas con Esli sobre el timestamp de las mediciones. __*Listo*__ (cada que se tomen las medidas que se mande un timestamp, sera cada 5 segundos yo creo)

- Crear la base de datos y la coleccion en MongoDB. ✅ (Sera en MongoDB Atlas con las Time Series pero se definira que los registros de hace 5 minutos se borren y asi no pasar el limite de 512 mb.)

- Conectar la base de datos a la aplicacion. ✅ (se esta probando en local pero ya esta la conexion)
### *__21/05/2023 -- fecha de entrega__*
- Analizar la factibilidad de usar una funcion Lambda para guardar los documentos. ❌

- Testear, aprobar y refactorizar. ❌

- Implementar con el front-end. ❌
  - Crear websockets para la comunicacion en neartime. Esta en mi chatgpt. __*Listo*__ 
  - Revisar que las graficas den lectura correctamente. 
  - Reorganizar el front para consistencia
  - Si hay tiempo implementar Vue.js como front.

- Si hay tiempo, ver lo de hacer reportes de la coleccion. (ya me dijo esli que la misma libreria te hace reportes automaticos)❌

