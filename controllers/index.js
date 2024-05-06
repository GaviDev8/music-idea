const router = require('express').Router();
const apiRoutes = require('./api');
const userController = require('./userController');
const playlistController = require('./playlistController');
const playlistTrackController = require('./playlistTrackController');

router.use('/api', apiRoutes);
router.use('/', userController);
router.use('/', playlistController);
router.use('/', playlistTrackController);

module.exports = router;
