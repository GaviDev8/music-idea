// connections
const router = require('express').Router();
const { User } = require("../../models");
const auth = require('../../utils/auth');

// Get the user ID from session
router.get("/session", (req, res) => {
  if (req.session && req.session.user_id) {
    res.json({ userId: req.session.user_id });
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

// user login 
router.post('/login', async (req, res) => {
   console.log('login')
  try {
        const userData = await User.findOne({
            where: { username: req.body.username},
        });
        if (!userData) {
            res.status(404).json({message: "Incorrect username or password."});
            return;
        }
        console.log(req.body)
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(404).json({message: "Incorrect username or password."});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: "You are logged in!"});
        });
    } catch (error) {
        res.status(400).json(error)
    }
});

// user logs out
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  // sign-ups 
  router.post("/signup", async (req, res) => {
    try {
        const userData = await User.create({
            ...req.body,
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({user: userData, message: "You are registered"})
        });
    } catch(err) {
      res.status(400).json(err)
    }
});

  module.exports = router;


