const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class PlaylistTrack extends Model {}

PlaylistTrack.init({
  playlistId: {
    type: DataTypes.UUID,
    references: {
      model: 'playlists',
      key: 'id'
    }
  },
  trackId: {
    type: DataTypes.UUID,
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
