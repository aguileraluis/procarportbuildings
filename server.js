// ⚠️ LOAD ENVIRONMENT VARIABLES FIRST!
const dotenv = require("dotenv");
require('dotenv').config({ path: "./.env" });
dotenv.config();

// NOW load everything else
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/usersRoute");
const stripeRoute = require("./routes/stripe");
const authRoute = require("./routes/auth");
// ✅ Email route removed - no longer needed
const seedAdminUser = require("./config/seedAdmin");
const cors = require("cors");
const path = require("path");
const usersRoute = require('./routes/usersRoute');
const signedRoute = require('./routes/signedRoute');
mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("✅ DB Connection Successful!");
    seedAdminUser();
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });

app.use(cors());

// ⚠️ CRITICAL: Stripe webhook needs raw body BEFORE express.json()
// This specific route must be registered before the express.json() middleware
// because Stripe webhook signature verification requires the raw request body
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

// Parse JSON for all other routes
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", stripeRoute);
app.use('/api/users', usersRoute);
app.use('/api/signedupusers', signedRoute);
app.use('/api/auth', authRoute);
// ✅ Email route removed - no longer needed

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  app.get("/", function (req, res) {
    res.send("🚀 ProCarport Buildings API Server is running!")
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Backend server is running on port ${port}!`);
  console.log(`📡 Stripe webhook endpoint: http://localhost:${port}/api/checkout/webhook`);
});