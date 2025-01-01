import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "./Rimberio.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/authenticate";
import { toast } from "react-toastify"; // Import Toastify

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  // Check localStorage for admin role on component mount
  const role = localStorage.getItem('role');

  // Set isAdmin based on the role from localStorage
  useEffect(() => {
    if (role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [role]);

  // Close the menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Links for normal users
  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/all-books", label: "All Books" },
    ...(isLoggedIn
      ? [
          { to: "/profile", label: "Profile" },
          { to: "/cart", label: "Cart" },
        ]
      : []),
  ];

  // Admin-specific links
  const adminLinks = [
    { to: "/admin", label: "Dashboard" },
  ];

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    dispatch(authActions.logout());
    toast.success("Logged out successfully!",{
      autoClose : 500,
    }); // Show Toastify success message
    <Navigate to={"/login"} />; // Navigate to login
  };

  return (
    <nav className="shadow-xl sticky top-0 bg-zinc-100 w-full px-4 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to={localStorage.getItem('role') === 'admin' ?  '/admin' : '/'}>
              <img src={logo} alt="Logo" className="w-14" />
            </Link>
            <h1 className="text-indigo-700 font-bold text-3xl">
              Book<span className="text-gray-700">Store</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center text-lg font-medium">
            {/* Render links based on user role */}
            {(isAdmin ? adminLinks : menuLinks).map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                className="px-4 py-2 bg-white text-gray-700 border border-gray-400 rounded-md shadow hover:bg-indigo-600 hover:text-white transition"
                onClick={handleLogout}
              >
                LogOut
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-400 rounded-md shadow hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-45" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-48 bg-gray-100 border-l border-gray-300 shadow-lg z-50 flex flex-col p-6 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-4 space-y-4">
          {/* Render links based on user role */}
          {(isAdmin ? adminLinks : menuLinks).map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="block text-lg text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              className="block px-4 py-2 bg-white text-gray-700 border border-gray-400 rounded-md shadow hover:bg-indigo-600 hover:text-white transition"
              onClick={handleLogout}
            >
              LogOut
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 bg-white text-gray-700 border border-gray-400 rounded-md shadow hover:bg-indigo-600 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
