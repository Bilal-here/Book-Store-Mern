import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../../Store/authenticate";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";  // Import toastify

function Login() {
  // State for controlled inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    axios
      .post("http://localhost:8080/sign-in", formData)
      .then((response) => {
        toast.success("Signin Successful!", {  // Success toast
          autoClose: 1500,
          style: { backgroundColor: "#4F46E5", color: "white" },
        });
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response?.data?.role));

        localStorage.setItem("id", response?.data?.id);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("role", response?.data?.role);
        navigate("/profile");
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error during signIn:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "An error occurred during sign-in.", {  // Error toast
          autoClose: 3000,
          style: { backgroundColor: "#EF4444", color: "white" },
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 px-4 py-4 sm:py-8">
      {/* Login Header */}
      <div className="mb-6 sm:mb-8 text-center mt-16 sm:mt-20">
        <h1 className="text-4xl sm:text-5xl text-indigo-700 font-extrabold">
          Welcome Back!
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Please log in to your account to continue.
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-300"
      >
        {/* Email Input */}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
            autoComplete="email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition"
        >
          Login
        </button>

        {/* Additional Options */}
        <div className="mt-4 text-center">
          <Link
            to={"/forgot-password"}
            className="text-gray-700 hover:text-indigo-700 text-sm sm:text-base"
          >
            Forgot Password
          </Link>
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
