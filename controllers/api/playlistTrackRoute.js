const express = require("express");
const router = express.Router();
const { PlaylistTrack } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const { playlistId, trackId } = req.body;
    const playlistTrack = await PlaylistTrack.create({ playlistId, trackId });
    res.status(200).json(playlistTrack);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;