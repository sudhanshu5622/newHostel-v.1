// otpUtil: generate OTP and helper functions
const crypto = require("crypto");

function generateOTP(length = 6) {
  // numeric OTP
  const otp = (Math.floor(Math.random() * Math.pow(10, length))).toString().padStart(length, "0");
  return otp;
}

// mock send email (replace with nodemailer or other provider)
async function sendEmailOTP(email, otp) {
  // In production use nodemailer / transactional email provider
  console.log(`[MOCK EMAIL] Sending OTP to ${email}: ${otp}`);
  // return success
  return true;
}

// mock send SMS (replace with Twilio etc.)
async function sendSmsOTP(phone, otp) {
  console.log(`[MOCK SMS] Sending OTP to ${phone}: ${otp}`);
  return true;
}

module.exports = { generateOTP, sendEmailOTP, sendSmsOTP };
