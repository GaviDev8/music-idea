const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Playlist extends Model {}

Playlist.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Playlist',
  tableName: 'playlists'
});

module.exports = Playlist;
