const router = require('express').Router();
const {} = require("../models");

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

router.get("/:id", async (req, res) => {
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

  module.exports = router;
