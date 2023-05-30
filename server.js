const { PORT } = require('./config/config.js');
const app = require('./config/expressConfig.js');
const { server } = require('./config/wssConfig.js');

const express = require('express');
const path = require('path');
const staticPath = path.join(__dirname, "./public");
app.use(express.static(staticPath));

const router = require('./routes');
app.use('/', router);


server.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

