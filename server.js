require("dotenv").config()
require('./initDB')();
const mongoose = require("mongoose")
const express = require("express");
const path = require("path");
const router = express.Router()
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
  console.log("mongoose is connected")
})