import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const navigate = useNavigate();

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle OTP request
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      Toastify({
        text: "Please enter your email",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await axios.post(
        "https://book-store-server-pry1.onrender.com/otp/request-otp",
        { email }
      );
      Toastify({
        text: response?.data?.message || "OTP sent successfully!",
        backgroundColor: "green",
        duration: 3000,
      }).showToast();
      // Pass the email as a query parameter to the verify OTP page
      navigate(`/forgot-password/verify-otp?email=${email}`);
    } catch (error) {
      Toastify({
        text: error?.response?.data?.message || "Error sending OTP",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
    }

    setIsSendingOtp(false);
  };

  return (
    <div className="w-full sm:max-w-md lg:max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>
      <form onSubmit={handleSendOtp}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSendingOtp}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {isSendingOtp ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
