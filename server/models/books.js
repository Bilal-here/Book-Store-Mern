const mongoose = require("mongoose");

const book = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    file: {
      type: String, // Store the file as binary data (Buffer)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", book);
