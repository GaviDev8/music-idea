const router = require('express').Router();
const { User, Track, Playlist, PlaylistTrack } = require('../models');
const auth = require('../utils/auth')

// Render to homepage
router.get("/", auth, async (req, res) => {
    try {  
    const playlistData = await Playlist.findAll({
      where: { userId: req.session.user_id}, 
      include: [{model: Track, through: PlaylistTrack, as: 'tracks' }]
    }); 
    const playlist = playlistData.map((list) => list.get({plain: true}))
    console.log(playlist)  
    res.render("home", {playlist, logged_in: req.session.logged_in});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error" });
    }
});

// this route is used to render the login pg and will redirect user to homepage
router.get("/login", async (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("login");
  });
  
  // this route is used to render the signup 
  router.get("/signup", async (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("login");
  });

  module.exports = router;