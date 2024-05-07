const { PlaylistTrack } = require('../models');

const playlistTrackData = [
  { playlistId: 1, trackId: 1 },
  { playlistId: 1, trackId: 2 },
  { playlistId: 2, trackId: 2 }
];

const seedPlaylistTracks = async () => {
  await PlaylistTrack.bulkCreate(playlistTrackData);
};

module.exports = seedPlaylistTracks;