const mongoose = require('mongoose');

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  favourites: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'books',
    },
  ],
  cart: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'books',
    },
  ],
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'order',
    },
  ],
}, { timestamps: true });  // Corrected from 'timestams' to 'timestamps'

module.exports = mongoose.model('user', user);
