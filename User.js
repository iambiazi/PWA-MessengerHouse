const mongoose = require('mongoose');
const mongoUri = require('./config.js');
// const mongoUri = 'mongodb://localhost/user';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  _id: String,
  username: { type: String, index: { unique: true }},
  password: String,
  conversations: [String],
  unread: [String],
});

const User = mongoose.model('User', userSchema);

User.create({
  _id: 'admin1',
  username: 'admin1',
  password: 'password',
  conversations: [],
  unread: [],
}).catch(err => console.error(err));

module.exports.db = db;
module.exports.User = User;
