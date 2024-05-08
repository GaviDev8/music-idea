const express = require('express');
const router = express.Router();
const { getTracks } = require('@green-code/music-track-data');

// This is GET /search/:query
router.get('/:query', async (req, res) => {

  try {
    const results = await getTracks(req.params.query);
    res.json(results);
  } catch (error) {
    console.error('Error during fetch,', error);
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;