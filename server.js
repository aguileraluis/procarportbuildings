const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/usersRoute");
const stripeRoute = require("./routes/stripe");
const authRoute = require("./routes/auth");
const seedAdminUser = require("./config/seedAdmin");
const cors = require("cors");
const path = require("path");
const usersRoute = require('./routes/usersRoute');
const signedRoute = require('./routes/signedRoute');
mongoose.set('strictQuery', true);
const dotenv = require("dotenv");
require('dotenv').config({ path: "./.env" });
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("DB Connection Successfull!");
    seedAdminUser();
  })
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
app.use('/api/auth', authRoute);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
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

app.listen(port || 5000, () => {
  console.log("Backend server is running!");
});