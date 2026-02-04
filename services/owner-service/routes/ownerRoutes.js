import express from "express";
const router = express.Router();

import { registerOwner, loginOwner } from "../controllers/ownerController.js";

router.post("/register", registerOwner);
router.post("/login", loginOwner);

router.get("/is-auth", (req, res) => {
  res.json({ success: true });
});

export default router;


// const jwt = require("jsonwebtoken");
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const Owner = require("../models/Owner");

// const router = express.Router();


// // ================= REGISTER OWNER =================
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existingOwner = await Owner.findOne({ email });

//     if (existingOwner) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const owner = await Owner.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "Owner registered successfully",
//       owner: {
//         id: owner._id,
//         name: owner.name,
//         email: owner.email,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ================= LOGIN OWNER =================
// router.post("/login", async (req, res) => {
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

//     res.json({
//       message: "Login successful",
//       owner: {
//         id: owner._id,
//         name: owner.name,
//         email: owner.email,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
