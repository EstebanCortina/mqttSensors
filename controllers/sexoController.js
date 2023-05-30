const path = require('path');
module.exports = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/sexo.html'));
}