const { Track } = require('../models');

const seedTracks = async () => {
  const count = await Track.count();
  if (count === 0) {
    const tracks = await Track.bulkCreate([
      { title: 'Imagine', artist: 'John Lennon', album: 'Imagine', imageURL: 'path/to/image1.jpg' },
      { title: 'What a Wonderful World', artist: 'Louis Armstrong', album: 'What a Wonderful World', imageURL: 'path/to/image2.jpg' }
    ]);
    console.log('Tracks seeded');
    return tracks;
  } else {
    console.log('Tracks already seeded');
    return await Track.findAll();
  }
};

module.exports = seedTracks;