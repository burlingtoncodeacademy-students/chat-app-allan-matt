require('./initDB')();
require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
//Middleware
app.use(express.static(staticDir));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://chatapp.76wa3.mongodb.net/ChatApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

app.listen(port, () => {
  console.log('listening on port: ' + port) 
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected. You done good there son.")
})

const { Main, Gamer, Pets } = require("./chatty/mainschema")

/*
app.get("/rooms", (req, res) => {
  res.sendFile(path.resolve('./rooms/chattyIndex.json'))
})
*/

//see all the available restaurants in JSON
app.get("/rooms/:room", async (req, res) => {
  let allMessages = await list(req.params.room)
  res.send(allMessages)
});

app.post("/rooms/:chatAppRoom", async (req, res) => {
  await addPost(req.params.chatAppRoom, req.body.post)
  res.sendStatus(201)
})


async function addPost(chatAppRoom, postObject ) {
  //checking what room we're in
  let room = ""
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
  newPost.save()
} 

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

let allPosts = await room.find({})
return allPosts

}

app.get("*", (req, res) => {
  res.sendFile (__dirname + "/client/public/index.html")
})

//see db data from Main Chatroom
//app.get("/rooms/main", async (req, res) => {
 // let mainPosts = await Main.find()
 // let allPosts = []
  //console.log(mainPosts)
  //await mainPosts.forEach(message => {
    //allPosts.push(message)
 // })

  //res.json(allPosts)
//});
/*
app.post("/rooms/main", async (req, res) => {
  const post = new Main({
    when: Date.now(),
    user: req.body.user,
    message: req.body.message
  })

  await post.save();  
  let mainPosts = await Main.find()
  let allPosts = []
  console.log(mainPosts)
  await mainPosts.forEach(message => {
    allPosts.push(message)
  })

  res.json(allPosts)
  res.redirect("/rooms/main")

}) */
/*
//see data from Main Chatroom
app.get("/rooms/gaming/data", async (req, res) => {
  let gamingPosts = await Gamer.find()
  console.log(gamingPosts)
  res.json(gamingPosts)
});

app.post("/rooms/gaming", async (req, res) => {
  const post = new Gamer({
    when: Date.now(),
    user: req.body.user,
    message: req.body.message
  })

  await post.save();
  res.redirect('/rooms/gaming')
})

//see data from Pet Chatroom
app.get("/rooms/pets/data", async (req, res) => {
  let petPosts = await Pet.find({})
  console.log(petPosts)
  res.json(petPosts)
});

app.post("/rooms/pets", async (req, res) => {
  const post = new Pet({
    when: Date.now(),
    user: req.body.user,
    message: req.body.message
  })

  await post.save();
  res.redirect('/rooms/pets')
})
*/








