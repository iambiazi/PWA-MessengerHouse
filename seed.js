const { db } = require('./User');
const { User } = require('./User');
const mongoose = require('mongoose');


const sampleUsers = [
  {
    username: 'test',
    password: 'password',
  },
  {
    username: 'Brian',
    password: 'password',
  },
  {
    username: 'rando',
    password: 'password',
  },
];

const seedDB = function() {
  User.create(sampleUsers)
    .then(() => mongoose.connection.close())
    .catch(err => console.error(err));
};

seedDB();
