import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from query parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!email) {
      Toastify({
        text: "No email provided!",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      Toastify({
        text: "Please fill in all fields",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
      return;
    }

    if (newPassword.length < 8) {
      Toastify({
        text: "Password must be at least 8 characters long",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://192.168.1.203:8080/otp/verify-otp", {
        email,
        otp,
        newPassword,
      });

      Toastify({
        text: "Password reset successful",
        backgroundColor: "green",
        duration: 3000,
      }).showToast();
      navigate("/login");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Error verifying OTP",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full sm:max-w-md lg:max-w-lg mx-auto my-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold text-center mb-4">
        Verify OTP
      </h2>
      {/* Display OTP sent message */}
      {email && (
        <div className="text-center mb-4 text-green-500">
          OTP has been sent to: {email}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
