const { HOST, PORT } = require('./config/config.js');
const express = require('express');
const app = express();




app.get('/', (req, res) => {
  res.send("<h1>Usar /api</h1>");
})


const router = require('./routes');
app.use('/api', router);



app.listen(PORT, HOST, () => {
  console.log(`Running on ${HOST}:${PORT}`);
});

