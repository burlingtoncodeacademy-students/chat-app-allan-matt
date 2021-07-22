

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

module.exports = Messages = mongoose.model('message', MessageSchema)