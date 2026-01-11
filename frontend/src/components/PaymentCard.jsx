const crypto = require("crypto");
const Payment = require("../models/Payment");

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    hostelName,
    userName,
    userId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false });
  }

  // 💾 Save Payment
  const payment = await Payment.create({
    userId,
    userName,
    hostelName,
    amount,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    status: "SUCCESS",
  });

  // 🧾 Receipt
  const receipt = {
    receiptId: payment._id,
    paymentId: payment.paymentId,
    hostelName,
    amount,
    date: payment.createdAt,
  };

  res.status(200).json({
    success: true,
    receipt,
  });
};
