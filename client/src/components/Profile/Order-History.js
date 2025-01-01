import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.203:8080/order/get-order-history",
          { headers }
        );
        setOrders(response?.data?.data || []);
      } catch (err) {
        toast.error("Failed to fetch order history.", { autoClose: 1000 });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-xl text-gray-700 font-bold mb-4">Order History</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              className="border border-gray-300 rounded shadow-md p-4 bg-white hover:shadow-lg transition"
              key={index}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Order ID: {order._id}
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Order Time:</strong>{" "}
                {new Date(order?.createdAt).toLocaleString()} {/* Display the order time */}
              </p>
              <div className="space-y-2 mt-4">
                <h4 className="font-semibold text-gray-800">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-600">
                      <strong>Book Title:</strong>{" "}
                      {item?.book?.title || "No title available"}<br />
                      <strong>Quantity:</strong> {item?.quantity || "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
