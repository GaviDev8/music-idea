const seedPlaylists = require('./playlists-seeds');
const seedTracks = require('./tracks-seeds');
const { PlaylistTrack } = require('../models');

const seedPlaylistTracks = async () => {
  
  const playlists = await seedPlaylists();
  const tracks = await seedTracks();
  
  if (!playlists || !tracks) {
    console.error('Seeding error: Playlists or Tracks not found.');
    return;
  }

  await PlaylistTrack.bulkCreate([
    { playlistId: playlists[0].id, trackId: tracks[0].id },
    { playlistId: playlists[1].id, trackId: tracks[1].id }
  ]);
  console.log('Playlist tracks seeded');
};

module.exports = seedPlaylistTracks;
