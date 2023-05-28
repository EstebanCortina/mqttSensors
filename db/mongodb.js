const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/data2';

const dbConnect = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Conexion exitosa a la bd");
  } catch (error) {
    console.log("Error DB:" + error);
  }
};


module.exports = dbConnect;





