import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================================
   PLACE ORDER (RAZORPAY)
================================ */
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // 1. Create order in DB
    const newOrder = new orderModel({
      userId: req.user.id,
      items,
      amount,
      address,
      payment: false,
    });

    await newOrder.save();

    // 2. Clear cart
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    // 3. Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // INR → paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    // 4. Send details to frontend
    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    res.json({ success: false, message: "Order failed" });
  }
};

/* ================================
   VERIFY PAYMENT
================================ */
const verifyOrder = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      paymentId,
    });

    res.json({ success: true, message: "Payment successful" });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.json({ success: false, message: "Verification failed" });
  }
};

/* ================================
   USER ORDERS
================================ */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

/* ================================
   ADMIN: LIST ORDERS
================================ */
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

/* ================================
   UPDATE ORDER STATUS
================================ */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
