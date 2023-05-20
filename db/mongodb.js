const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/data';

const connect = (async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Conexion exitosa a la bd");
  } catch (error) {
    console.log("Error DB:" + error);
  }
})();


module.exports = mongoose;





