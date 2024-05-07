const { Playlist } = require('../models');

const playlistData = [
  { title: 'Playlist 1', userId: 1 },
  { title: 'Playlist 2', userId: 2 }
];

const seedPlaylists = async () => {
  await Playlist.bulkCreate(playlistData);
};

module.exports = seedPlaylists;