const User = require("../models/User");
const express = require('express'); 
const router = express.Router();
//CREATE

router.post("/signup", async(req, res) => {

  const newuser = new User({
    name : req.body.name,
    fifteenpercent : req.body.fifteenpercent,
    totalprice : req.body.totalprice,
    fname : req.body.fname, 
    lname : req.body.lname, 
    email : req.body.email, 
    phonenumber : req.body.phonenumber, 
    address : req.body.address,
    sideheight : req.body.sideheight,
    bothsidesclosed : req.body.bothsidesclosed,
    verticalsides : req.body.verticalsides,
    eachend : req.body.eachend
    
  });

  try {
      const user = await newuser.save()
      res.send("User Registered Successfully")
      return user;
  } catch (error) {
    console.log(error)
      return res.status(400).json({ error });
  }
}); 

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;