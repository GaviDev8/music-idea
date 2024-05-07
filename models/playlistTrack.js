const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class PlaylistTrack extends Model {}

PlaylistTrack.init({
  playlistId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'playlists',
      key: 'id'
    }
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tracks',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'PlaylistTrack',
  tableName: 'playlist_tracks'
});

module.exports = PlaylistTrack;
