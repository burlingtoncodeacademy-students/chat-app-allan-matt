require('./initDB')();
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
app.use(express.static(staticDir));
app.use(express.urlencoded({extended: true}))
const Main = require('./chatty/schema.js')
const Gamer = require('./chatty/schema.js')
const Pet = require('./chatty/schema.js')


app.listen(port, () => {
  console.log('listening on port: ' + port) 
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected. You done good there son.")
})



//see data from Main Chatroom
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
  res.redirect('/Main')
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
  res.redirect('/Gaming')
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
  res.redirect('/Pets')
})


//setting up the catch all route 
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'))
});






