const { User, Playlist, Track, PlaylistTrack } = require('../models');

async function seedDatabase() {
  try {
    // Create users
    const user1 = await User.create({ username: 'user1', password: 'password1' });
    const user2 = await User.create({ username: 'user2', password: 'password2' });

    // Create playlists
    const playlist1 = await Playlist.create({ title: 'Playlist 1', userId: user1.id });
    const playlist2 = await Playlist.create({ title: 'Playlist 2', userId: user2.id });

    // Create tracks
    const track1 = await Track.create({ title: 'Track 1', artist: 'Artist 1', album: 'Album 1' });
    const track2 = await Track.create({ title: 'Track 2', artist: 'Artist 2', album: 'Album 2' });

    // Associate tracks with playlists
    await PlaylistTrack.create({ playlistId: playlist1.id, trackId: track1.id });
    await PlaylistTrack.create({ playlistId: playlist1.id, trackId: track2.id });
    await PlaylistTrack.create({ playlistId: playlist2.id, trackId: track2.id });

    console.log('Seed data created!');
  } catch (error) { console.error('Error seeding database:', error); }
}

seedDatabase();
