const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainSchema = new Schema({
  when: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500,
  },
  room: {
    type: String
  }
});

 const MainMessage = mongoose.model("Main", MainSchema)
 const Gamer = mongoose.model("Gamer", MainSchema)
 const Pets = mongoose.model("Pet", MainSchema)

 module.exports = { MainMessage, Gamer, Pets}
