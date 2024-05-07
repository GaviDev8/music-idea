const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Track extends Model {}

Track.init({
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
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  album: {
    type: DataTypes.STRING, // Optional
  },
  imageURL: {
    type: DataTypes.STRING // Optional
  },
}, {
  sequelize,
  modelName: 'Track',
  tableName: 'tracks',
  timestamps: false
});

module.exports = Track;
