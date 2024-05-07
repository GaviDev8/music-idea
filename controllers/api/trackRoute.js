const router = require('express').Router();
const { Track } = require('../../models');
const { User, Playlist, PlaylistTrack } = require("../models");

// find all tracks
router.get("/", async (req, res) => {
    try {
      const tracks = await Track.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Playlist,
          },
          {
            model: PlaylistTrack,
          },
        ],
      });
      res.status(200).json(tracks);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // find tracks by id
  router.get("/:id", async (req, res) => {
    try {
      const tracks = await Track.findAll({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // post track 
  router.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const newTrack = await Track.create({
        ...req.body,
        id: req.session.id, // should this be by user_id or playlistId?
        
      });
      res.status(200).json(newTrack);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  });
  
  module.exports = router;