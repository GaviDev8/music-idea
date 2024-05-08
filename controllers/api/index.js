const router = require('express').Router();
const playlistRoute = require('./playlistRoute');
const trackRoute = require('./trackRoute');
const userRoute = require('./userRoute');
const searchRoute = require('./searchRoute');


router.use('/playlist', playlistRoute);
router.use('/track', trackRoute);
router.use('/user', userRoute);
router.use('/search', searchRoute);

module.exports = router;