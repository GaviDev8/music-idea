const router = require('express').Router();
const playlistRoute = require('./playlistRoute');
const trackRoute = require('./trackRoute');
const userRoute = require('./userRoute');
const playlistTrackRoute = require("./playlistTrackRoute");
const searchRoute = require('./searchRoute');


router.use('/playlist', playlistRoute);
router.use('/track', trackRoute);
router.use('/user', userRoute);
router.use("/playlistTrack", playlistTrackRoute);
router.use('/search', searchRoute);

module.exports = router;