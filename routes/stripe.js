const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")('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');

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
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
});

module.exports = router;