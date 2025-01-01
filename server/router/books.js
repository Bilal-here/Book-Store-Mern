const express = require("express");
const router = express.Router();
const { authToken, verifyAdmin } = require("./userAuthentication");
const { uploadBook } = require("../config/multerconfig");
const {
  addBook,
  getBookById,
  getAllBooks,
  getRecentBooks,
  getRecentBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book");

// Add Book Route
router.post("/add-books", authToken, verifyAdmin, uploadBook.single("file"), addBook);

// Get a Single Book by ID
router.get("/get-book/:id", getBookById);

// Get All Books
router.get("/get-books", getAllBooks);

// Get Recent Books
router.get("/get-recent-books", getRecentBooks);

// Get Recent Book by ID
router.get("/get-recent-books/:id", getRecentBookById);

// Update Book
router.put("/update-books/:id", authToken, verifyAdmin, uploadBook.single("file"), updateBook);

// Delete Book
router.delete("/delete-books/:id", authToken, verifyAdmin, deleteBook);

module.exports = router;
