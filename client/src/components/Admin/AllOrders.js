import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "../../Loader/LoadingIndicator"; // Assuming you have a loader component

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/order/get-all-orders", { headers });
        setOrders(response?.data?.data || []);
      } catch (error) {
        toast.error("Failed to fetch orders.", { autoClose: 1000 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/order/update-order-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        setIsEditing(null); // Close the edit mode
        toast.success("Order status updated.", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Failed to update status.", { autoClose: 1000 });
    }
  };

  return (
    <div className="h-auto md:h-full p-4 mx-4 sm:mx-6 md:mx-16 rounded-md">
      <h1 className="text-2xl text-indigo-700 font-bold mb-6">All Orders</h1>

      {isLoading ? (
        <LoadingIndicator />
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No new orders found.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {orders.map((order) => (
            <div
              className="group relative p-6 hover:bg-zinc-50 hover:shadow-md  transition-transform duration-150 ease-in-out border-2 border-solid border-gray-100 rounded-lg flex flex-col"
              key={order._id}
            >
              <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
              <p className="text-sm text-gray-600">
                <strong>Status: </strong>
                {isEditing === order._id ? (
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="border border-indigo-300 rounded p-1 text-sm mt-2"
                  >
                    <option value="order placed">Order Placed</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  order.status
                )}
              </p>
              
              <p className="text-sm mt-2">
                <strong>Ordered by:</strong> {order.user?.username || "Unknown"}
              </p>
              <div className="space-y-2 mt-4">
                <h4 className="font-semibold text-gray-800">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600">
                      <strong>Book Title:</strong> {item?.book?.title || "No title available"}
                      <br />
                      <strong>Quantity:</strong> {item?.quantity || "N/A"}
                    </li>
                  ))}
                  <button
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg  text-sm"
                onClick={() => {
                  if (isEditing === order._id) {
                    handleStatusChange(order._id);
                  } else {
                    setIsEditing(order._id);
                    setNewStatus(order.status); // Pre-fill the current status
                  }
                }}
              >
                {isEditing === order._id ? "Save" : "Edit Status"}
              </button>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
