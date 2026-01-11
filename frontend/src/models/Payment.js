const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hostelName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    currency: {
  type: String,
  default: "INR",
},
receipt: String,

  },
});

module.exports = mongoose.model("Payment", paymentSchema);
