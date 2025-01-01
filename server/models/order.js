const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    items: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          ref: 'books',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      default: 'order placed',
      enum: ['order placed', 'out for delivery', 'delivered', 'cancelled'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', orderSchema);
