//importing mongoose to make schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//making the schema
const MainSchema = new Schema({
  //Setting time message was sent
  when: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  //Setting user conditions
  user: {
    //it's a string!
    type: String,
    //required to submit
    required: true,
    //trim removes whitespaces
    trim: true,
    //sets the max length of the username
    maxLength: 100,
  },
  //Setting message conditions
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500,
  },
  //giving models a room condition for referencing later 
  room: {
    type: String
  }
});
//exporting the models
 const MainMessage = mongoose.model("Main", MainSchema)
 const Gamer = mongoose.model("Gamer", MainSchema)
 const Pets = mongoose.model("Pet", MainSchema)

 module.exports = { MainMessage, Gamer, Pets}
