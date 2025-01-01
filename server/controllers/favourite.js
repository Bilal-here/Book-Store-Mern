// Import required modules and models
const user = require('../models/user');

// Controller to add a book to favourites
const addBookToFav = async (req, res) => {
    try {   
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);

        if (isBookFavourite) {
            return res.status(200).json({ message: 'Book is already in favourite' });
        }  

        await user.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: 'Book successfully added to favourites' });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};

// Controller to remove a book from favourites
const removeBookFromFav = async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await user.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);

        if (isBookFavourite) {
            await user.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        res.status(200).json({ message: 'Book removed successfully' });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};

// Controller to get favourite books
const getFavBooks = async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await user.findById(id).populate('favourites');
        const favBooks = userData.favourites; 
        return res.status(200).json({
            status: 'success',
            data: favBooks
        });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};

// Export all controllers
module.exports = {
    addBookToFav,
    removeBookFromFav,
    getFavBooks
};
