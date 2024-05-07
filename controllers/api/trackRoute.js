const router = require('express').Router();
const { Track } = require('../../models');

// find all tracks - may not need?
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.status(200).json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
  
  // find tracks by id
  router.get("/:id", async (req, res) => {
    try {
      const tracks = await Track.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(track);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // post track 
  router.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const newTrack = await Track.create({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        imageURL: req.body.imageURL,
        userId: req.session.user_id,
      });
      res.status(200).json(newTrack);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  });
  
  module.exports = router;