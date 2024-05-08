const router = require('express').Router();
const apiRoutes = require('./api');
const playlistTrack = require('./playlistTrackController');
const homepage = require('./homepageController');

router.use('/', homepage);
router.use('/playlistTrack', playlistTrack);
router.use('/api', apiRoutes);


module.exports = router;