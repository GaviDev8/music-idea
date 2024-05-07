const router = require('express').Router();
const { User, Track, Playlist, PlaylistTrack } = require("../../models");
// connect auth if needed

// getting playlist route
router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.findAll({
            attributes: ["id", "title", "userId", "createdOut"],
            order: [["createdOut", "ASC"]],
            include: {
                model: Playlist
            }
        });
        res.status(200).json(Playlist);
    } catch (err) {
        res.status(500).json(err);
    }
});

// getting playlist by playlistId
router.get("/:playlistId", async (req, res) => {
    try {
      const Playlist = await Playlist.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(Playlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // new playlist
  // should i include the auth there?
  router.post("/", async (req, res) => {
    try {
      const newPlaylist = await Playlist.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPlaylist);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update playlist 
  router.put("/:playlistId", async (req, res) => {
    try {
      const newPlaylist = await Playlist.update(req.body,{
        where: {
          id: req.params.id,
        }})
      res.status(200).json(newPlaylist);
    } catch (err) {
      console.error(err)
      res.status(400).json(err);
      console.error(err)
    }
  });

  // delete playlist
  router.delete("/:playlistId", async (req, res) => {
    try {
      const Playlist = await Playlist.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!Playlist) {
        res.status(404).json({ message: "No playlist found with this id!" });
        return;
      }
      res.status(200).json(Playlist);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
