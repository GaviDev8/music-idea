const router = require('express').Router();
const { User, Playlist } = require("../../models");
// connect auth if needed

// getting playlist route
router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.findAll({
            attributes: ["id", "title", "userId", "createdOut"],
            order: [["createdOut", "ASC"]],
            include: {
                model: User
            }
        });
        res.status(200).json(playlist);
    } catch (err) {
        res.status(500).json(err);
    }
});

// getting playlist by playlistId
router.get("/:playlistId", async (req, res) => {
    try {
      const playlist = await Playlist.findOne({
        where: {
          id: req.params.playlistId,
        },
      });
      res.status(200).json(playlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // new playlist
  // should i include the auth there?
  router.post("/", async (req, res) => {
    try {
      // Title
      const { title } = req.body;
      // Create Playlist with info from createplaylist.js
      const newPlaylist = await Playlist.create({
        title: req.body.title,
        userId: req.body.userId,
      });
      res.json(newPlaylist);
    } catch (error) {
      console.error('Error creating playlist:', error);
      res.status(400).json({ error: error.toString() });
    }
  });

  // update playlist 
  router.put("/:playlistId", async (req, res) => {
    try {
      const updatedPlaylist = await Playlist.update(req.body,{
        where: {
          id: req.params.playlistId,
        }})
      res.status(200).json(updatedPlaylist);
    } catch (err) {
      console.error(err)
      res.status(400).json(err);
      console.error(err)
    }
  });

  // delete playlist
  router.delete("/:playlistId", async (req, res) => {
    try {
      const deletePlaylist = await Playlist.destroy({
        where: {
          id: req.params.playlistId,
        },
      });
      if (!deletePlaylist) {
        res.status(404).json({ message: "No playlist found with this id!" });
        return;
      }
      res.status(200).json(deletePlaylist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
