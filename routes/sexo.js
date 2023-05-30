const router = require('express').Router();

const sexoController = require('../controllers/sexoController.js');
router.get('/', sexoController);

module.exports = router;