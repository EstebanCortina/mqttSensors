const { PORT } = require('./config/config.js');
const app = require('./config/expressConfig.js');
const { server } = require('./config/wssConfig.js');


const router = require('./routes');
app.use('/', router);


server.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

