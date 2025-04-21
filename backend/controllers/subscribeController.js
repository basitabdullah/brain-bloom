import Razorpay from "razorpay";
import User from "../models/userModel.js";

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
