require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user');
const PlaylistModel = require('./playlist');
const TrackModel = require('./track');
const PlaylistTrackModel = require('./playlistTrack');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 3001,
});

// Initialize
const User = UserModel(sequelize, DataTypes);
const Playlist = PlaylistModel(sequelize, DataTypes);
const Track = TrackModel(sequelize, DataTypes);
const PlaylistTrack = PlaylistTrackModel(sequelize, DataTypes);

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
