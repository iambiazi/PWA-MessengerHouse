const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/user';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });


const userSchema = new mongoose.Schema({
  username: { type: String, index: { unique: true }},
  password: String,
  conversations: [String],
  unread: [String],
});

const User = mongoose.model('User', userSchema);

module.exports.db = db;
module.exports.User = User;
