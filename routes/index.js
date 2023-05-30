const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send("<h1>Dashboard</h1>");
})

const apiRouter = require('./api.js');
router.use('/api', apiRouter);

const panelRouter = require('./panel');
router.use('/panel', panelRouter);

const sexoRouter = require('./sexo');
router.use('/sexo', sexoRouter);



module.exports = router;
