const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config({ path: "./.env" });
dotenv.config();
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/usersRoute");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const path = require("path");
const usersRoute= require('./routes/usersRoute');
const signedRoute = require('./routes/signedRoute');
mongoose.set('strictQuery', true);

var mongoURL = 'mongodb+srv://luisaguileragarciamail:Knu081895!luis@cluster0.fgnl8h4.mongodb.net/project0';

mongoose.connect(mongoURL, { useUnifiedTopology : true, useNewUrlParser : true }); 

var connection = mongoose.connection; 

connection.on('connected', ()=> {
    console.log('Mongo DB Connection Successful'); 
});

connection.on('error', ()=> {
  console.log('Mongo DB Connection failed'); 
}); 

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", stripeRoute);
app.use('/api/users', usersRoute);
app.use('/api/signedupusers', signedRoute);

__dirname = path.resolve();

if(process.env.NODE_ENV === "production") {
  var mongoURL = 'mongodb+srv://luisaguileragarciamail:Knu081895!luis@cluster0.fgnl8h4.mongodb.net/project0';

mongoose.connect(mongoURL, { useUnifiedTopology : true, useNewUrlParser : true }); 

var connection = mongoose.connection; 

connection.on('connected', ()=> {
    console.log('Mongo DB Connection Successful'); 
});

connection.on('error', ()=> {
  console.log('Mongo DB Connection failed'); 
}); 
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get("/", function (req, res) {
      res.send("Api running")
  })
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});