const router = require('express').Router();
const apiRoutes = require('./api');
const homepage = require('./homepageController');

router.use('/', homepage);
router.use('/api', apiRoutes);


module.exports = router;