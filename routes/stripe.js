const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);


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
  res.send('Payment successful, thank you!')
  } catch (error) {
    return res.status(400).json({ error })
  }
});

export default router;