// importing components to use for the server
require('./initDB')();
require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//Middleware
app.use(express.static(staticDir));
app.use(express.urlencoded({extended: true}))


//connecting to mongoose DB
mongoose.connect('mongodb+srv://chatapp.76wa3.mongodb.net/ChatApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

//Telling server to listen for connection
app.listen(port, () => {
  console.log('listening on port: ' + port) 
})

//mongoose connection messages
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected. You done good there son.")
})

//importing the mongoose models
const { Main, Gamer, Pets, MainMessage } = require("./chatty/mainschema")


//Getting all messages to display, only set up for main room currently
app.get("/rooms/main", async (req, res,) => {
  let allMessages = await MainMessage.find({})
  res.send(allMessages)
});

//creating a new message and sending to the database
app.post("/rooms/mains", async (req, res,) => {
  const post = new MainMessage({
    when: Date.now(),
    user: req.body.user,
    message: req.body.message
  })

  await post.save();  
  res.redirect('/rooms/main')
})



//adding a new post to display in the chat room
async function addPost(chatAppRoom, postObject ) {
  //checking what room we're in
  let room = ""
  //if statements setting the room variable based on what chat room we're in
  if (chatAppRoom === "gamers") {
    room = Gamer
  } else if (chatAppRoom === "pets") {
    room = Pets
  } else if (chatAppRoom === "mains") {
    room = Main
  }
  //making new post object
  let newPostObject = {
    when: Date.now(),
    user: postObject.user,
    message: postObject.message
  }
  //making new post for the room we're in (new document collection)
  let newPost = new room(newPostObject)
  await newPost.save()
} 

//function to list all messages sent previously based on the chat room we're in
async function list(chatAppRoom) {
   //checking what room we're in
   let room = ""
   if (chatAppRoom === "gamers") {
     room = Gamer
   } else if (chatAppRoom === "pets") {
     room = Pets
   } else if (chatAppRoom === "mains") {
     room = Main
   }
//find those posts from the collection
let allPosts = await room.find({})
return allPosts
}


app.get("*", (req, res) => {
  res.sendFile (__dirname + "/client/public/index.html")
})