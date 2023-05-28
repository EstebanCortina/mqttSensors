const router = require('express').Router();
const panelController = require('../controllers/panelController.js');
router.get('/', panelController);

module.exports = router;