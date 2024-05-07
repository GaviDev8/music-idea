const router = require('express').Router();
const apiRoutes = require('./api');
const playlistTrackController = require('./playlistTrackController');


router.use('/api', apiRoutes);
router.use('/', playlistTrackController);

module.exports = router;
