require('dotenv').config();
const sequelize = require('../config/config');

// Imports
const User = require('./user');
const Playlist = require('./playlist');
const Track = require('./track');
const PlaylistTrack = require('./playlistTrack');

// Relationships
User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId'});

Playlist.belongsToMany(Track, {
  through: PlaylistTrack,
  foreignKey: 'playlistId',
  otherKey: 'trackId',
  as: 'tracks'
});

Track.belongsToMany(Playlist, {
  through: PlaylistTrack,
  foreignKey: 'trackId',
  otherKey: 'playlistId'
});

module.exports = {
  User,
  Playlist,
  Track,
  PlaylistTrack
};
