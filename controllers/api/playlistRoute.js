const router = require("express").Router();
const { User, Playlist, Track, PlaylistTrack } = require("../../models");
// connect auth if needed

// getting playlist route
router.get("/", async (req, res) => {
  try {
    const playlist = await Playlist.findAll({
      attributes: ["id", "title", "userId", "createdOut"],
      order: [["createdOut", "ASC"]],
      include: {
        model: User,
      },
    });
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get playlist by publicId
router.get("/:publicId", async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      where: {
        publicId: req.params.publicId,
      },
      include: [
        {
          model: Track,
          as: "tracks",
        },
      ],
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.render("playlist", {
      playlist,
      tracks: playlist.tracks,
    });
  } catch (err) {
    console.error("Error fetching playlist:", err);
    res.status(500).json(err);
  }
});

// new playlist
router.post("/", async (req, res) => {
  try {
    // Auth check
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newPlaylist = await Playlist.create({
      title: req.body.title,
      userId: userId,
    });

    res.status(200).json(newPlaylist);
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(400).json(err);
  }
});

// update playlist
router.put("/:playlistId", async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.update(req.body, {
      where: {
        id: req.params.playlistId,
      },
    });
    res.status(200).json(updatedPlaylist);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
    console.error(err);
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
