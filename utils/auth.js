const express = require('express');
const router = express.Router();

const auth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = auth;