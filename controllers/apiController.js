const { wss } = require('../config/wssConfig.js');
const wsController = require('./wsController.js');
wss.on('connection', wsController);

module.exports = (req, res) => {
  res.status(200);
}
