import Stripe from "stripe";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment
export const createPaymentIntent = async (req, res) => {
  const { userId } = req.body;
  try {
    const cartItems = await Cart.find({ userId }).populate("productId");
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.qty * item.productId.price * 100;
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment creation failed" });
  }
};
