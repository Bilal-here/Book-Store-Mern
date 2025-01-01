// bookController.js

const books = require("../models/books");

// Add Book
const addBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { title, author, price, desc, language } = req.body;

    const book = new books({
      title,
      author,
      price,
      desc,
      language,
      file: req.file.path, // Cloudinary URL
    });

    const savedBook = await book.save();
    return res
      .status(200)
      .json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    console.error("Error in addBook controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getBookById controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const booksList = await books.find();
    return res.status(200).json({ message: "Books found", books: booksList });
  } catch (error) {
    console.error("Error in getAllBooks controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Recent Books
const getRecentBooks = async (req, res) => {
  try {
    const allBooks = await books.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({ status: "Success", data: allBooks });
  } catch (err) {
    console.error("Error in getRecentBooks controller:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Recent Book by ID
const getRecentBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await books.findById(id);

    if (!book) {
      return res.status(404).json({ status: "Fail", message: "Book not found" });
    }

    return res.status(200).json({ status: "Success", data: book });
  } catch (err) {
    console.error("Error in getRecentBookById controller:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, desc, language } = req.body;

    const updateData = { title, author, price, desc, language };

    if (req.file) {
      updateData.file = req.file.path; // Cloudinary URL
    }

    const updatedBook = await books.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error in updateBook controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await books.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error in deleteBook controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addBook,
  getBookById,
  getAllBooks,
  getRecentBooks,
  getRecentBookById,
  updateBook,
  deleteBook,
};
