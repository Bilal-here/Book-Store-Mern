import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Logo & Description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-indigo-600">BookStore</h2>
            <p className="text-gray-400 text-sm">
              Your one-stop online bookstore. Find your favorite books, new releases, and bestsellers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to = {"/"} className="text-gray-400 hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-books" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  Privacy Policy  
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 2L6 12l12 8V2z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 6c-1 1-2.2 1.6-3.3 2-1-1.4-2.7-2.4-5-2.4-3.4 0-6.1 2.4-6.1 5.5 0 2.4 1.8 4.3 4.2 5.1-.4.1-.8.2-1.3.2-1.1 0-2.1-.3-3-.9 1.4 3.5 5.6 4.6 8.7 3.6 3.1-.9 5.3-3.5 5.3-6.5 0-.1 0-.2 0-.3 0-.2 0-.3 0-.5z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 4.2c0 1.2-.8 2.3-1.9 2.7C18.7 7.5 16.2 8 12 8S5.3 7.5 4.9 6.9C3.8 6.5 3 5.5 3 4.2 3 3 3.8 2 4.9 1.5 5.3 1.2 7.5 1 12 1s6.7.2 7.1.5C20.2 2 21 3 21 4.2zM12 9.3c1.6 0 2.9 1.3 2.9 2.9 0 1.6-1.3 2.9-2.9 2.9-1.6 0-2.9-1.3-2.9-2.9 0-1.6 1.3-2.9 2.9-2.9z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-400 text-sm">
              Email: <a href="mailto:support@bookstore.com" className="text-indigo-600">support@bookstore.com</a>
            </p>
            <p className="text-gray-400 text-sm">
              Phone: <span className="text-indigo-600">+123-456-7890</span>
            </p>
            <p className="text-gray-400 text-sm">
              Address: 123 Bookstore Lane, Hyderabad, India
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
