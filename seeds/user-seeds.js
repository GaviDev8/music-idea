const { User } = require('../models');

const seedUsers = async () => {
  const count = await User.count();
  if (count === 0) {
    const users = await User.bulkCreate([
      { username: 'user1', password: 'password123' },
      { username: 'user2', password: 'password123' }
    ], {
      individualHooks:true,
      returning: true
    });
    // Checking if we already made these specific users
    console.log('Users seeded');
    return users;
  } else {
    console.log('Users already seeded');
    return await User.findAll();
  }
};

module.exports = seedUsers;