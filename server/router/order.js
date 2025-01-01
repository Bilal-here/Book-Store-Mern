// Import required modules and controllers
const express = require('express');
const { authToken, verifyAdmin } = require('./userAuthentication');
const {
    placeOrder,
    getOrderHistory,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/order'); // Ensure the correct path

// Create the router
const orderRouter = express.Router();

// Define the routes
orderRouter.post('/place-order', authToken, placeOrder);
orderRouter.get('/get-order-history', authToken, getOrderHistory);
orderRouter.get('/get-all-orders', authToken, verifyAdmin, getAllOrders);
orderRouter.put('/update-order-status/:orderId', authToken, verifyAdmin, updateOrderStatus);

// Export the router
module.exports = orderRouter;
