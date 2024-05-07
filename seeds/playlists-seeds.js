const { Playlist } = require('../models');
const seedUsers = require('./user-seeds');
const { v4: uuidv4 } = require('uuid');

const seedPlaylists = async () => {
  const count = await Playlist.count();
  if (count === 0) {
    
    const users = await seedUsers();
    const playlists = await Playlist.bulkCreate([
      { title: 'Rock Hits', userId: users[0].id, publicId: uuidv4() },
      { title: 'Jazz Classics', userId: users[1].id, publicId: uuidv4() }
    ]);

    console.log('Playlists seeded');
    return playlists;
  } else {
    console.log('Playlists already seeded');
    return await Playlist.findAll();
  }
};

module.exports = seedPlaylists;