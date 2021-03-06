const mongoose = require('mongoose');

const { Schema } = mongoose;

/*  Contains all users, which includes their chatrooms */
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  chats: []
});

module.exports = mongoose.model('User', UserSchema);
