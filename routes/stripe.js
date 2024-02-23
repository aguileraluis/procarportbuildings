const router = require("express").Router();
const dotenv = require("dotenv"); 
 dotenv.config();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);
// 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

router.post("/payment", async (req, res) => {
  try {

    const customer = await stripe.customers.create({
      email : token.email,
      source : token.id
  })

  await stripe.charges.create(
    {
      customer : customer.id,
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
  } catch (error) {
    return res.status(400).json({ error })
  }
});

module.exports = router;