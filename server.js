const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config({ path: "./config.env" });
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

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology : true, useNewUrlParser : true } )
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
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
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get("/", function (req, res) {
      res.send("Api running")
  })
}

const port = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});