# mqttSensors

Este servidor obtiene datos de sensores, recopilados y gestionados por un ESP32 a través del protocolo de comunicación MQTT.

# Cosas por hacer:
### *__18/05/2023 -- 19/05/2023__*
- Investigar como usar websockets. (crear uno en el backend y conectarme a el desde el frontend) ✅

- Investigar como usar la libreria ArduinoJSON. ✅

- Rehacer la libreria para el ESP32 y probar en local. ❌  
  - Quitar codigo que ya no sirve. __*Listo*__
  - Añadir Multiwifi. __*Listo*__
  - Empaquetar la data de los sensores en un JSON. __*Pendiente*__ (Necesito mas cables para conectar los demas sensores, pero ya mando el luxometro en Json)
  - Hacer publish del JSON. __*Listo*__
  - Revisar que el JSON si lo reciba el servidor. __*Listo*__

- Definir los websockets y establecer la comunicacion en tiempo real. __*Listo*__ ✅
### *__19/05/2023 -- 21/05/2023__*
- Definir el schema de los documentos a insertar en la coleccion de MongoDB. (e investigar bien sobre los schemas de mongoose) ❌
  - Revisar tipos de datos.
  - Observar similitudes.
  - Aclarar dudas con Esli sobre el timestamp de las mediciones.

- Crear la base de datos y la coleccion en MongoDB. (definir si será en MongoDB Atlas o MongoDB local)❌

- Conectar la base de datos a la aplicacion. ❌
### *__21/05/2023 -- fecha de entrega__*
- Analizar la factibilidad de usar una funcion Lambda para guardar los documentos. (si es factible, entonces debera usarse MongoDB Atlas) ❌

- Testear, aprobar y refactorizar. ❌

- Implementar con el front-end. ❌
  - Crear websockets para la comunicacion en neartime. Esta en mi chatgpt.

- Si hay tiempo, ver lo de hacer reportes de la coleccion. ❌