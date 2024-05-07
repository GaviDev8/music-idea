const seedUsers = require('./user-seeds');
const seedPlaylists = require('./playlists-seeds');
const seedTracks = require('./tracks-seeds');
const seedPlaylistTracks = require('./playlistTrack-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPlaylists();
  console.log('\n----- PLAYLISTS SEEDED -----\n');

  await seedTracks();
  console.log('\n----- TRACKS SEEDED -----\n');

  await seedPlaylistTracks();
  console.log('\n----- PLAYLIST TRACKS SEEDED -----\n');

  process.exit(0);
};

seedAll();