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
module.exports = Data;