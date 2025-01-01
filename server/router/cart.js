const express = require('express');
const cartRouter = express.Router();
const { authToken } = require('./userAuthentication');
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cart');

// Add to Cart
cartRouter.put('/add-to-cart', authToken, addToCart);

// Remove from Cart
cartRouter.delete('/remove-from-cart/:bookid', authToken, removeFromCart);

// Get Cart Items
cartRouter.get('/get-cart-items', authToken, getCartItems);

module.exports = cartRouter;
