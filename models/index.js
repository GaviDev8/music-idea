const { Sequelize, DataTypes } = require('sequelize');

// Create a connection to your database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', // Assuming PostgreSQL
});

// Import model files
const UserModel = require('./user');
const PlaylistModel = require('./playlist');
const TrackModel = require('./track');
const PlaylistTrackModel = require('./playlistTrack');

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Playlist = PlaylistModel(sequelize, DataTypes);
const Track = TrackModel(sequelize, DataTypes);
const PlaylistTrack = PlaylistTrackModel(sequelize, DataTypes);

// relationships
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

// Export models and sequelize connection
module.exports = {
  User,
  Playlist,
  Track,
  PlaylistTrack,
  sequelize
};
