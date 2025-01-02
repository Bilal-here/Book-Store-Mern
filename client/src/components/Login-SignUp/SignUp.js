import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "user", // Default role
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/sign-up", formData)
      .then((response) => {
        toast.success("Signup Successful!", {
          autoClose: 1500,
          style: {
            backgroundColor: "#4F46E5", // Success color
            color: "white",
          },
        });
        // Clear form after successful submission
        setFormData({
          username: "",
          email: "",
          password: "",
          address: "",
          role: "user",
        });

        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Signup Failed! Please try again.";
        toast.error(errorMessage, {
          autoClose: 3000,
          style: {
            backgroundColor: "#EF4444", // Error color
            color: "white",
          },
        });
        console.error("Error during signup:", errorMessage);
      });
  };

  return (
    <div className="flex flex-col min-h-[85vh] lg:min-h-screen bg-gray-100">
      {/* Main content container */}
      <div className="flex-grow flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4 mt-8 sm:mt-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
            Register your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your address"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center mt-4">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Signup;
