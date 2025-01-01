const express = require('express')
const user = require('../models/user')
const { authToken,verifyAdmin } = require('./userAuthentication')
const favRouter = express.Router()
const {addBookToFav,removeBookFromFav,getFavBooks} = require('../controllers/favourite')


//Route to handle add to favourite
favRouter.put('/add-book-to-fav',authToken,addBookToFav)

//Route to handle remove book from favourites
favRouter.delete('/remove-book-from-fav',authToken,removeBookFromFav)

//Route to get all favourite books of a user
favRouter.get('/get-fav-books',authToken,getFavBooks)


module.exports = favRouter