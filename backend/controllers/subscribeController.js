import Razorpay from "razorpay";
import User from "../models/userModel.js";
import crypto from "crypto";
import { log } from "console";

export const createSubscription = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  try {
    const options = {
      amount: 19900, // ₹199 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const subscription = await instance.orders.create(options);

    res.json({ success: true, subscription });
  } catch (error) {
    console.error("Error in subscribe:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifySubscription = async (req, res) => {
  const key_secret = process.env.RAZOR_PAY_SECRET;

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const generatedSigniture = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSigniture !== razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      role: "subscriber",
      razorpayPaymentId: razorpay_payment_id,
      razorpaySubscriptionId: razorpay_order_id,
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
    return res.json({ success: true });
  } catch (error) {
    console.error("Verification error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        role: "user",
      },
      { new: true }
    );

    res.status(200).json({
      message: "Membership canceled successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
