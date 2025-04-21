import Razorpay from "razorpay";
import User from "../models/userModel.js";
import crypto from "crypto";
import { log } from "console";

export const subscribe = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  try {
    const user = req.user;
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    let razorpayCustomerId = user.razorpayCustomerId;

    // ✅ Only create customer if not already created
    if (!razorpayCustomerId) {
      const customer = await instance.customers.create({
        name: user.name,
        email: user.email,
        contact: user.phone,
      });

      razorpayCustomerId = customer.id;

      // Save the customer ID in your database
      await User.findByIdAndUpdate(user._id, {
        razorpayCustomerId: razorpayCustomerId,
      });
    }

    // ✅ Create subscription for that customer
    const subscription = await instance.subscriptions.create({
      plan_id: "plan_QKq0fOk1PKsnYz", // Replace with your real Plan ID
      customer_notify: 1,
      total_count: 1, // One billing cycle only (30 days for monthly)
      customer_id: razorpayCustomerId,
    });

    return res.status(200).json({
      message: "Subscription created successfully",
      subscriptionId: subscription.id,
      subscription,
    });
  } catch (error) {
    console.error("Error in subscribe:", error);
    return res.status(500).json({
      message: "Failed to create subscription",
      error: error.description || error.message,
    });
  }
};

export const verifySubscription = async (req, res) => {
  const key_secret = process.env.RAZOR_PAY_SECRET;

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;
  log(razorpay_signature);
  const generatedSigniture = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest("hex");

  log(generatedSigniture);

  if (generatedSigniture !== razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }
  try {
    const userId = req.user.id;
    log("userId :", userId)

    await User.findByIdAndUpdate(userId, {
      role: "subscriber",
      razorpayPaymentId: razorpay_payment_id,
      razorpaySubscriptionId: razorpay_subscription_id,
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
    return res.json({ success: true });
  } catch (error) {
    console.error("Verification error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
