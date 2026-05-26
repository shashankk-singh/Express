const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true , trim: true},
  role: {type: String, required: true , enum: ['admin', 'user']}
});

const User = mongoose.model('User', userSchema)

module.exports = User