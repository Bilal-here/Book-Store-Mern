const { user } = require('../models/user');

// Add to Cart
async function addToCart(req, res) {
    try {
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isBookAdded = userData.cart.includes(bookid);

        if (isBookAdded) {
            return res
                .status(200)
                .json({ message: 'Book is already in the cart' });
        }

        await user.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });

        return res.json({
            success: 'Success',
            message: 'Book added to cart',
        });
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

// Remove from Cart
async function removeFromCart(req, res) {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;

        const userData = await user.findById(id);
        const isBookIn = userData.cart.includes(bookid);

        if (isBookIn) {
            await user.findByIdAndUpdate(id, {
                $pull: { cart: bookid },
            });
        }

        res.status(200).json({
            success: 'Success',
            message: 'Book removed from cart',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get Cart Items
async function getCartItems(req, res) {
    try {
        const { id } = req.headers;
        const userData = await user.findById(id).populate('cart');
        const cart = userData.cart.reverse();

        res.status(200).json({
            success: 'Success',
            message: cart,
        });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
}

module.exports = { addToCart, removeFromCart, getCartItems };
