const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

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
  },
  playlistId: {
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

/*
Something for Gabriela to set up routes to the playlists

router.get('/playlist/:uuid'

const playlist = await Playlist.findOne({ where: { playlistId: req.params.uuid }
res.render('playlist', { playlist });
*/