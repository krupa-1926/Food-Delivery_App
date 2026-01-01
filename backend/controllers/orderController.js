// import orderModel from './../models/orderModel.js';
// import userModel from './../models/userModel.js';
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Placing user order for frontend
// const placeOrder = async (req, res) =>{

//     const frontend_url = 'http://localhost:5173';
//     try {
//         // const { items, amount, address } = req.body;

//         const newOrder = new orderModel({
//             userId: req.user.id,
//             items: req.body.items,
//             amount:req.body.amount,
//             address: req.body.address,
//             payment:false,  
//         })

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.user.id,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             price_data :{
//                 currency: "lkr",
//                 product_data:{
//                     name: item.name
//                 },
//                 unit_amount:item.price*100*300
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data :{
//                 currency:"lkr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
//         })

//         res.json({success:true, session_url:session.url})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})
//     }
// }

// const verifyOrder = async (req, res) =>{
//     const {orderId, success} = req.body;
//     try {
//         if(success=='true'){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:true, message:"Paid"})
//         }else{
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({success:false, message:"Not Paid"})
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})
//     }
// }

// // user orders for frontend
// const userOrders = async (req,res) => {
//     try {
//         const orders = await orderModel.find({userId:req.body.userId})
//         res.json({success:true, data:orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})
//     }
// }

// // listing orders for admin panel
// const listOrders = async (req,res) =>{
//    try {
//     const orders = await orderModel.find({});
//     res.json({success:true, data:orders})
//    } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})  
//    } 
// }

// // api for updating order status
// const updateStatus = async (req, res) =>{
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//         res.json({success:true, message:"Status Updated"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:"Error"})  
//     }
// }

// export {placeOrder, verifyOrder, userOrders,listOrders, updateStatus}


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
