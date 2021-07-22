require('./initDB')();
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
app.use(express.static(staticDir));
app.use(express.urlencoded({extended: true}))
const Messages = require('./chatty/data.js')

app.listen(port, () => {
  console.log('listening on port: ' + port) 
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected. You done good there son.")
})

//see all chatrooms IDs as JSON
app.get("/rooms", (req, res) => {
  res.sendFile(path.resolve('./rooms/chattyIndex.json'))
})

//see individual chatrooms in JSON
app.get("/rooms/:chatrooms", (req, res) => {
  res.sendFile(path.resolve('./rooms/' + req.params.chatrooms + '.json'));
});


app.get("/rooms/main", async (req, res) => {
  let mainPosts = await Messages.find({})
  console.log(mainPosts)
  res.json(mainPosts)
});

app.post("/rooms/main", async (req, res) => {
  const message = new Messages({
    when: Date.now,
    user: req.body.user,
    body: req.body.message
  })

  await message.save();
})


//setting up the catch all route 
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'))
});






