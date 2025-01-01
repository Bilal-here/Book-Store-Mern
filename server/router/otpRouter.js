const express = require('express');
const rateLimit = require('express-rate-limit');
const { requestOtp, verifyOtp } = require('../controllers/otpRouter');

const router = express.Router();

// Rate limiter to throttle OTP requests
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Too many OTP requests. Please try again later.",
});

// Routes
router.post('/request-otp', otpLimiter, requestOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
