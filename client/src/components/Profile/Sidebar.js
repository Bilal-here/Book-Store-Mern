import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingIndicator from "../../Loader/LoadingIndicator";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";

function Sidebar({ profile , setDpChange}) {
  const [file, setFile] = useState(null); // Track selected file for upload
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage the state of the modal

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle profile picture upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      setError(null); // Reset error message
      setDpChange(false)
      const response = await axios.put(
        "https://book-store-server-pry1.onrender.com/profile/update-avatar", // Update with your backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
          },
        }
      );
      setDpChange(true)

      toast.success(response.data.message);
      setLoading(false);
      setIsModalOpen(false); // Close the modal after successful upload
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Error uploading image");
      console.error(err);
    }
  };

  return !profile ? (
    // Show the loader when the profile prop is null or undefined
    <LoadingIndicator />
  ) : (
    <div className="flex flex-col items-center text-center my-6">
      {/* Profile Picture */}
      <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden mb-4">
        <img
          src={profile?.avatar || "https://via.placeholder.com/150"}
          alt="Profile Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Username and Email */}
      <h1 className="text-white text-xl font-semibold">{profile?.username || "Guest"}</h1>
      <h2 className="text-gray-300 text-sm mb-6">{profile?.email || "guest@example.com"}</h2>

      {/* Line */}
      <div className="border-2 border-solid border-white opacity-50 w-[90%] mb-6" />

      {/* Profile Picture Upload Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Change Profile Picture
      </button>

      {/* Modal for File Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[400px]">
            <h2 className="text-center text-xl font-semibold mb-4">Upload Profile Picture</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="flex justify-between">
              <button
                onClick={handleUpload}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="w-full space-y-4 px-4 flex flex-col justify-between mt-6">
        
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            `block text-lg hover:text-black hover:bg-zinc-50 hover:px-4 hover:py-2 transition px-4 py-2 rounded-md ${
              isActive ? "text-white bg-transparent" : "text-white bg-transparent"
            }`
          }
        >
          Favourites
        </NavLink>
        <NavLink
          to={"/profile/order-history"}
          className={({ isActive }) =>
            `block text-lg hover:text-black hover:bg-zinc-50 hover:px-4 hover:py-2 transition px-4 py-2 rounded-md ${
              isActive ? "text-black bg-zinc-50" : "text-white bg-transparent"
            }`
          }
        >
          Order History
        </NavLink>
        <NavLink
          to={"/profile/settings"}
          className={({ isActive }) =>
            `block text-lg hover:text-black hover:bg-zinc-50 hover:px-4 hover:py-2 transition px-4 py-2 rounded-md ${
              isActive ? "text-black bg-zinc-50" : "text-white bg-transparent"
            }`
          }
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
 