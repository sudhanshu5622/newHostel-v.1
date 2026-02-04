// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const db = require("../config/db");

// const Owner = require("../models/Owner");

// const { generateOTP, sendEmailOTP, sendSmsOTP } = require("../utils/otpUtil");

// const OTP_EXPIRES_MIN = Number(process.env.OTP_EXPIRES_MIN) || 5;

// function getExpiryDate() {
//   return new Date(Date.now() + OTP_EXPIRES_MIN * 60 * 1000);
// }

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     // basic validation
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ error: "All fields required" });
//     }
//     // password length check
//     if (password.length < 6) {
//       return res.status(400).json({ error: "Password must be 6+ characters" });
//     }

//     // uniqueness
//     const existingEmail = await Owner.findOne({ email });
//     if (existingEmail) return res.status(400).json({ error: "Email already registered" });
//     const existingPhone = await Owner.findOne({ phone });
//     if (existingPhone) return res.status(400).json({ error: "Phone already registered" });

//     // hash password
//     const hashed = await bcrypt.hash(password, 10);

//     // generate OTPs
//     const emailOtp = generateOTP();
//     const phoneOtp = generateOTP();

//     // save owner as unverified
//     const owner = await Owner.create({
//       name,
//       email,
//       phone,
//       password: hashed,
//       isEmailVerified: false,
//       isPhoneVerified: false,
//       otp: { emailOtp, phoneOtp },
//       otpExpiry: getExpiryDate()
//     });

//     // send OTPs (mock)
//     await sendEmailOTP(email, emailOtp);
//     await sendSmsOTP(phone, phoneOtp);

//     // respond but do not include OTPs in response in production
//     return res.status(201).json({
//       message: "Signup successful. OTPs sent to email and phone.",
//       ownerId: owner._id
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { ownerId, emailOtp, phoneOtp } = req.body;
//     if (!ownerId) return res.status(400).json({ error: "ownerId required" });

//     const owner = await Owner.findById(ownerId);
//     if (!owner) return res.status(404).json({ error: "Owner not found" });

//     if (!owner.otp || !owner.otp.emailOtp || !owner.otp.phoneOtp) {
//       return res.status(400).json({ error: "No OTPs found. Resend OTP." });
//     }

//     if (owner.otpExpiry < new Date()) {
//       return res.status(400).json({ error: "OTP expired. Please resend." });
//     }

//     // check each OTP
//     if (emailOtp !== owner.otp.emailOtp || phoneOtp !== owner.otp.phoneOtp) {
//       return res.status(400).json({ error: "Invalid OTP(s)" });
//     }

//     owner.isEmailVerified = true;
//     owner.isPhoneVerified = true;
//     owner.otp = { emailOtp: null, phoneOtp: null };
//     owner.otpExpiry = null;
//     await owner.save();

//     return res.json({ message: "Verification successful. You can now login." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.resendOtp = async (req, res) => {
//   try {
//     const { ownerId } = req.body;
//     if (!ownerId) return res.status(400).json({ error: "ownerId required" });

//     const owner = await Owner.findById(ownerId);
//     if (!owner) return res.status(404).json({ error: "Owner not found" });

//     const emailOtp = generateOTP();
//     const phoneOtp = generateOTP();
//     owner.otp = { emailOtp, phoneOtp };
//     owner.otpExpiry = getExpiryDate();
//     await owner.save();

//     await sendEmailOTP(owner.email, emailOtp);
//     await sendSmsOTP(owner.phone, phoneOtp);

//     return res.json({ message: "Resent OTPs to email and phone." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { identifier, password } = req.body; // identifier = email or phone
//     if (!identifier || !password) return res.status(400).json({ error: "All fields required" });

//     // find by email or phone
//     const owner = await Owner.findOne({
//       $or: [{ email: identifier }, { phone: identifier }]
//     });
//     if (!owner) return res.status(400).json({ error: "Invalid credentials" });

//     // only verified owners can login
//     if (!owner.isEmailVerified || !owner.isPhoneVerified) {
//       return res.status(403).json({ error: "Please verify both email and phone first" });
//     }

//     const isMatch = await bcrypt.compare(password, owner.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     // generate JWT
//     const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN || "7d"
//     });

//     // return token
//     return res.json({
//       message: "Login successful",
//       token,
//       owner: { id: owner._id, name: owner.name, email: owner.email, phone: owner.phone }
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.dashboard = async (req, res) => {
//   // req.owner set by authMiddleware
//   return res.json({ message: `Welcome ${req.owner.name}`, owner: req.owner });
// };

// anothe one


// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Owner = require("../models/Owner");

// /* ================= REGISTER OWNER ================= */
// exports.registerOwner = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existing = await Owner.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const owner = await Owner.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Owner registered",
//       owner: {
//         id: owner._id,
//         name: owner.name,
//         email: owner.email
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// /* ================= LOGIN OWNER ================= */
// exports.loginOwner = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const owner = await Owner.findOne({ email });
//     if (!owner) {
//       return res.status(400).json({ message: "Owner not found" });
//     }

//     const isMatch = await bcrypt.compare(password, owner.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: owner._id },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       owner: {
//         id: owner._id,
//         name: owner.name,
//         email: owner.email
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";

/* ================= REGISTER OWNER ================= */
export const registerOwner = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Owner.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await Owner.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Owner registered",
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN OWNER ================= */
console.log(req.body);

export const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(400).json({ message: "Owner not found" });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: owner._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      owner: {
        id: owner._id,
        name: owner.name,
        email: owner.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

