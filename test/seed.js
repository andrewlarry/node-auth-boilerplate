const { User } = require('../models');

const users = [{
    email: 'user1@test.com',
    password: 'password1'
  },
  {
    email: 'user2@test.com',
    password: 'password2'
}];


// Save test users in db
const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

module.exports = { users, populateUsers };