const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Playlist extends Model {}

Playlist.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'groov_users',
      key: 'id'
    }
  },
  publicId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Playlist',
  tableName: 'playlists'
});

module.exports = Playlist;
