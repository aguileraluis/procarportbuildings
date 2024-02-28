const Signed = require("../models/Signed");
const express = require('express'); 
const router = express.Router();
//CREATE

router.post("/signupfornewsletter", async(req, res) => {

  const newuser = new Signed({
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    phonenumber : req.body.phonenumber,
    zipcode : req.body.zipcode,
    style : req.body.style,
    size : req.body.size,

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