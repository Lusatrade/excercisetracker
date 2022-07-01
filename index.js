const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const apiRoute = require('./routes/apiRoute')
const bodyParser = require('body-parser')
const fs = require('fs')

const logPath = __dirname + '/logs.txt'

//Middleware
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const logger = (req,res,next)=>{
  const dt = new Date().toString().match(/^([a-z]{3}\s[a-z]{3}\s[0-9]{2}\s[0-9]{4})/i)[0]
  const params = JSON.stringify(req.params)
  const body = JSON.stringify(req.body)
  const query = JSON.stringify(req.query)
  fs.appendFile(logPath,`${dt}\t ${req.method}\t ${req.path}\n\tQuery:\t${query}\n\tParams:\t${params}\n\tBody:\t${body}\n--------------------------------------------------------\n`,(err)=>{
    if(err){
      console.log(err);
    }else{
      next()
    }})
}

//routes
app.get('/api/logs',(req,res)=>{
  res.sendFile(logPath,console.log)
})
app.use('/api/users',logger,apiRoute)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const startUp = () => {
  mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
    } else {
      console.log('Mongo database has connected');
      const listener = app.listen(process.env.PORT || 3000, () => {
        console.log("Your app is listening on port " + listener.address().port);
      });
    }
  });
};

startUp()
