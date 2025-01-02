import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CartItem from "./CartItem";
import PriceDetails from "./PriceDetails";
import LoadingIndicator from "../../Loader/LoadingIndicator";
import { toast } from "react-toastify";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://book-store-server-pry1.onrender.com/cart/get-cart-items",
          { headers }
        );
        const items = response?.data?.message || [];
        const updatedItems = items.map((item) => ({
          ...item,
          quantity: item.quantity || 1, // Default quantity if not provided
        }));
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
        calculateTotalItems(updatedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const calculateTotalItems = (items) => {
    const total = items.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://book-store-server-pry1.onrender.com/cart/remove-from-cart/${id}`, {
        headers,
      });
      const updatedItems = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
      calculateTotalItems(updatedItems);
    } catch (error) {
      toast.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    calculateTotalItems(updatedItems);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items before placing an order." , {
        autoClose : 1000,
      });
      return;
    }

    setLoadingOrder(true);
    try {
      const response = await axios.post(
        "https://book-store-server-pry1.onrender.com/order/place-order",
        { order: cartItems.map((item) => ({ _id: item._id, quantity: item.quantity || 1 })) },
        { headers }
      );

      if (response.status === 200) {
        toast.success("Order placed successfully!" , {
          autoClose:1000,
        });

        for (const item of cartItems) {
          await axios.delete(`https://book-store-server-pry1.onrender.com/cart/remove-from-cart/${item._id}`, {
            headers,
          });
        }

        setCartItems([]);
        setTotalPrice(0);
        setTotalItems(0);
        setOrderSuccess(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing your order. Please try again.", { 
        autoClose : 1000,
      });
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="h-auto md:h-full flex items-center justify-center p-8 mx-8 md:mx-20 mt-8">
      {loading || loadingOrder ? (
        <LoadingIndicator />
      ) : (
        <motion.div
          className="w-full max-w-7xl p-2 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl text-indigo-700 font-bold mb-8">Your Cart</h1>

          {orderSuccess && (
            <motion.div
              className="bg-green-100 text-green-800 p-4 rounded-md mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-semibold">Order placed successfully!</h2>
              <p>Thank you for your purchase. We are processing your order.</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="border p-8 rounded-lg shadow-md bg-gray-50"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Cart Items</h2>
              {cartItems.length > 0 ? (
                <div className="space-y-8">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CartItem
                        item={item}
                        onRemove={handleRemoveItem}
                        onQuantityChange={handleQuantityChange}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-lg">Your cart is empty.</p>
              )}
            </motion.div>

            <PriceDetails
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
          </div>

          {cartItems.length > 0 && !orderSuccess && (
            <motion.div
              className="flex justify-end mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700"
                onClick={handlePlaceOrder}
              >
                Place Order Now
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Cart;
