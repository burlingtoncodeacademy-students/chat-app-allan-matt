const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

  module.exports = Gamer = mongoose.model('Gamer', GamerSchema)