const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const validator = require('validator');
const bcrypt = require('bcrypt');
const user = require('../models/user');

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("Environment variables EMAIL_USER and EMAIL_PASS must be defined");
  process.exit(1);
}

// In-memory storage (replace with database for production)
let storedOtp = {};
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generates a 6-digit OTP
const generateOtp = () => crypto.randomInt(100000, 999999);

// Sends OTP to the provided email
const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

// Request OTP Controller
const requestOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.status(404).send('User not found');
    }

    const otp = generateOtp();
    const expiry = Date.now() + OTP_EXPIRY_TIME;
    storedOtp[email] = { otp, expiry };

    try {
      await sendOtpEmail(email, otp);
      res.status(200).send('OTP sent to your email');
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send('Failed to send OTP. Please try again.');
    }
  } catch (error) {
    console.error("Error querying user:", error);
    res.status(500).send('An error occurred. Please try again later.');
  }
};

// Verify OTP Controller
const verifyOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Validate input
  if (!email || !otp || !newPassword) {
    return res.status(400).send('All fields are required');
  }

  // Check if OTP exists and is valid
  const stored = storedOtp[email];
  if (!stored || Date.now() > stored.expiry) {
    return res.status(400).send('OTP is expired or not requested');
  }

  // Check if OTP matches
  if (parseInt(otp) !== stored.otp) {
    return res.status(400).send('Invalid OTP');
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    const updatedUser = await user.findOneAndUpdate(
      { email }, // Find the user by email
      { password: hashedPassword }, // Update the password
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    // Remove the OTP after successful verification
    delete storedOtp[email];

    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('An error occurred while updating the password');
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
};
