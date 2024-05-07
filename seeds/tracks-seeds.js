const { Track } = require('../models');

const trackData = [
  { title: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
  { title: 'Track 2', artist: 'Artist 2', album: 'Album 2' }
];

const seedTracks = async () => {
  await Track.bulkCreate(trackData);
};

module.exports = seedTracks;