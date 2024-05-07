require('dotenv').config();
const sequelize = require('../config/config');

// Imports
const User = require('./user');
const Playlist = require('./playlist');
const Track = require('./track');
const PlaylistTrack = require('./playlistTrack');

// Relationships
User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

Playlist.belongsToMany(Track, {
  through: PlaylistTrack,
  foreignKey: 'playlistId',
  otherKey: 'trackId'
});

Track.belongsToMany(Playlist, {
  through: PlaylistTrack,
  foreignKey: 'trackId',
  otherKey: 'playlistId'
});

// Sync
sequelize.sync({ force: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Failed to sync database: ", error);
  });

module.exports = {
  User,
  Playlist,
  Track,
  PlaylistTrack,
  sequelize
};
