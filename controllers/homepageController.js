const router = require('express').Router();
const { User, Track, Playlist, PlaylistTrack } = require('../models');
// connect auth once done

// Render to homepage
router.get("/", async (req, res) => {
    try {
        res.render("homepage", { Track, Playlist });
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
    res.render("register");
  });

  module.exports = router;