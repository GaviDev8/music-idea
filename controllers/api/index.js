const router = require('express').Router();
const playlistRoute = require('./playlistRoute');
const trackRoute = require('./trackRoute');
const userRoute = require('./userRoute')


router.use('/playlist', playlistRoute);
router.use('/track', trackRoute);
router.use('/user', userRoute)

module.exports = router;