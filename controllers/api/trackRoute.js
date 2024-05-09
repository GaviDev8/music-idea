const router = require("express").Router();
const { Track, PlaylistTrack } = require("../../models");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    // Check for duplicates
    const existingTrack = await Track.findOne({
      where: {
        title: req.body.title,
        artist: req.body.artist,
      },
    });

    if (existingTrack) {
      // If the track already exists, add it to playlist
      await PlaylistTrack.create({
        playlistId: req.body.playlistId,
        trackId: existingTrack.id,
      });
      return res.status(200).json(existingTrack);
    }

    // Create a new track if it doesn't exist
    const newTrack = await Track.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      imageURL: req.body.imageURL,
    });

    // Add new track to the playlist
    await PlaylistTrack.create({
      playlistId: req.body.playlistId,
      trackId: newTrack.id,
    });

    res.status(200).json(newTrack);
  } catch (err) {
    console.error("Error creating track:", err);
    res.status(400).json(err);
  }
});

module.exports = router;