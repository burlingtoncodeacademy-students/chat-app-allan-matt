

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MainSchema = new Schema({
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
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
})

const GamerSchema = new Schema({
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
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
})

const PetSchema = new Schema({
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
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500
  },
})


module.exports = Main = mongoose.model('Main', MainSchema)
module.exports = Gamer = mongoose.model('Main', GamerSchema)
module.exports = Pet = mongoose.model('Main', PetSchema)
