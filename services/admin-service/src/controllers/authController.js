// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/Admin");
// const User = require("../models/User");
// const { secret, expiresIn } = require("../config/jwt");

// const SALT_ROUNDS = 10;

// /**
//  * @route   POST /api/auth/admin/login
//  * @desc    Admin login
//  * @access  Public
//  */
// exports.adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ success: false, message: "Email and password required" });

//     const admin = await Admin.findOne({ email });
//     if (!admin)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       secret,
//       { expiresIn }
//     );

//     res.json({
//       success: true,
//       message: "Admin login successful",
//       data: { token }
//     });
//   } catch (error) {
//     console.error("Admin login error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /**
//  * @route   POST /api/auth/create-admin
//  * @desc    Create admin (ONLY FOR DEV / FIRST TIME)
//  * @access  Public (remove in production)
//  */
// exports.createAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const exists = await Admin.findOne({ email });
//     if (exists)
//       return res.status(409).json({ success: false, message: "Admin already exists" });

//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//     const admin = await Admin.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({
//       success: true,
//       message: "Admin created successfully",
//       data: {
//         id: admin._id,
//         email: admin.email
//       }
//     });
//   } catch (error) {
//     console.error("Create admin error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /**
//  * @route   POST /api/auth/user/register
//  * @desc    Create user (for testing/admin panel data)
//  * @access  Public
//  */
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const exists = await User.findOne({ email });
//     if (exists)
//       return res.status(409).json({ success: false, message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user"
//     });

//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error("Create user error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const adminLogin = async (req, res) => {
  try {
    res.json({ message: "Admin login working" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};
