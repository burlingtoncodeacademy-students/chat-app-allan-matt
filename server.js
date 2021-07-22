require('./initDB')();
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
app.use(express.static(staticDir));



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
app.get("/api", (req, res) => {
  res.sendFile(path.resolve('./api/chattyIndex.json'))
})

//see individual chatrooms in JSON
app.get("/api/:chatrooms", (req, res) => {
  res.sendFile(path.resolve('./api/' + req.params.chatrooms + '.json'));
});

//setting up the catch all route 
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./client/public/index.html'))
});

app.post('/api/messages', (req, res) => {
  const chattyKathy = new Messages({ when: req.body.when, user: req.body.user, body: req.body.body, })
  chattyKathy.save();
});
