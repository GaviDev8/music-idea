const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Track extends Model {}

Track.init({
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
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  album: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'Track',
  tableName: 'tracks'
});

module.exports = Track;