import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toastify

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle password change submission
  const handleChangePassword = (e) => {
    e.preventDefault();
    
    // Assuming you have the userId and token stored in localStorage
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    
    if (!userId || !token) {
      toast.error("User not authenticated.");
      return;
    }
    

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const data = {
      oldPassword,
      newPassword,
    };

    // Send PUT request to update password
    axios
      .put(`http://192.168.1.203:8080/update-password` ,data , {headers})
      .then((response) => {
        toast.success("Password updated successfully!", {
          autoClose: 1500,
          style: { backgroundColor: "#4F46E5", color: "white" },
        });
        handleCloseModal();  // Close the modal on success
        setOldPassword("");  // Clear the form fields
        setNewPassword("");
      })
      .catch((error) => {
        console.error("Error updating password:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Error changing password.", {
          autoClose: 3000,
          style: { backgroundColor: "#EF4444", color: "white" },
        });
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      {/* Change Password Button */}
      <button
        onClick={handleOpenModal}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Change Password
      </button>

      {/* Modal for Password Change */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Change Password</h3>

            <form onSubmit={handleChangePassword}>
              {/* Old Password Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                  required
                />
              </div>

              {/* New Password Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
