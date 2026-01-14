const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
    },
    { timestamps: true }
);
const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  otp: {
    emailOtp: { type: String },
    phoneOtp: { type: String }
  },
  otpExpiry: { type: Date } // same expiry for both OTPs
}, { timestamps: true });

module.exports = mongoose.model("Owner", OwnerSchema);
