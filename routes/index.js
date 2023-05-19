const router = require('express').Router();

const apiController = require('../controllers/apiController.js');
router.get('/', apiController);



module.exports = router;
