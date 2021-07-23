require('./initDB')();
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
app.use(express.static(staticDir));
app.use(express.urlencoded({extended: true}))
const Main = require('./chatty/mainschema.js')
const Gamer = require('./chatty/gamerschema.js')
const Pet = require('./chatty/petschema.js')


app.listen(port, () => {
  console.log('listening on port: ' + port) 
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected. You done good there son.")
})

app.get("/rooms", (req, res) => {
  res.sendFile(path.resolve('./rooms/chattyIndex.json'))
})

//see all the available restaurants in JSON
app.get("/rooms/:room", (req, res) => {
  res.sendFile(path.resolve('./rooms/' + req.params.rooms + '.json'));
});



//see db data from Main Chatroom
app.get("/rooms/main", async (req, res) => {
  let mainPosts = await Messages.find({})
  console.log(mainPosts)
  res.json(mainPosts)
});

app.post("/rooms/main", async (req, res) => {
  const post = new Main({
    when: Date.now(),
    user: req.body.user,
    message: req.body.message
  })

  await post.save();
  res.redirect('/rooms/main')
})

//see data from Main Chatroom
app.get("/rooms/gaming", async (req, res) => {
  let gamingPosts = await Messages.find({})
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
app.get("/rooms/pets", async (req, res) => {
  let petPosts = await Messages.find({})
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









