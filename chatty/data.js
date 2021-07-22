

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MessageSchema = new Schema({
  when: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  body: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
})

module.exports = Messages = mongoose.model('Message', MessageSchema)