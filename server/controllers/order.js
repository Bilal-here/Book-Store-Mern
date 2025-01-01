// Import required modules and models
const User = require('../models/user');
const Order = require('../models/order');

// Controller to place an order
const placeOrder = async (req, res) => {
    try {
        const userId = req.headers.id;
        const { order } = req.body; // Get the order items (array) from request body

        if (!order || order.length === 0) {
            return res.status(400).json({ message: 'Order is empty.' });
        }

        // Create a new order document with all items
        const newOrder = new Order({
            user: userId,
            items: order.map((item) => ({
                book: item._id,
                quantity: item.quantity || 1, // Default quantity to 1 if not provided
            })),
        });

        // Save the new order to the database
        await newOrder.save();

        // Update user's orders and clear the cart
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { orders: newOrder._id },
                $set: { cart: [] }, // Clear the cart
            },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Order Placed Successfully', order: newOrder });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Controller to get order history
const getOrderHistory = async (req, res) => {
    try {
        const userId = req.headers.id; 
        const userData = await User.findById(userId)
            .populate({
                path: 'orders', // Populating the user's orders
                populate: { path: 'items.book' }, // Populating the book details in each order
            });

        if (!userData || !userData.orders) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        // Reverse the orders array to show the most recent order first
        const orderData = userData.orders.reverse();

        return res.status(200).json({ message: 'Success', data: orderData });
    } catch (error) {
        console.error('Error fetching order history:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Controller to get all orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: 'items.book' })
            .populate({ path: 'user', select: '-password' })
            .sort({ createdAt: -1 });

        return res.json({ data: userData });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Controller to update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // To return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ data: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Export all controllers
module.exports = {
    placeOrder,
    getOrderHistory,
    getAllOrders,
    updateOrderStatus,
};
