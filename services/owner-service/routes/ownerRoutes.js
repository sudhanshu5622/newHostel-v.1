const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const authMiddleware = require("../middleware/authMiddleware");

// signup
router.post("/signup", ownerController.signup);

// verify otp
router.post("/verify-otp", ownerController.verifyOtp);

// resend otp
router.post("/resend-otp", ownerController.resendOtp);

// login
router.post("/login", ownerController.login);

// protected dashboard
router.get("/dashboard", authMiddleware, ownerController.dashboard);

module.exports = router;
