import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://192.168.1.203:8080/books/get-books');
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      await axios.delete(`http://192.168.1.203:8080/books/delete-books/${id}`, { headers });
      setBooks(books.filter((book) => book._id !== id));
      alert('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="book-list mt-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8">
        {filteredBooks.map((book) => (
          <div key={book._id} className="group relative p-3 hover:bg-zinc-50 hover:shadow-md hover:scale-105 transition-transform duration-150 ease-in-out border-2 rounded-lg border-solid border-gray-100">
            <div className="p-auto lg:p-2 mb-4">
              <img
                src={book.file}
                alt="Book."
                className="w-auto object-cover rounded-md bg-gray-200"
              />
            </div>
            <div className="m-2 space-y-2">
              <h3 className="text-lg text-gray-700">
                <b>{book.title.slice(0, 30)}..</b>
              </h3>
              <p className="mt-1 pb-8 text-sm text-gray-700">By {book.author}</p>
            </div>
            <div className="absolute bottom-2 left-2 flex md:left-7 md:space-x-2 space-x-1">
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-zinc-50 hover:text-black border-solid border-2 border-indigo-600 transition"
              >
                Delete
              </button>
              <Link to={`/admin/edit-book/${book._id}`}>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg border-2 border-solid hover:bg-zinc-50 hover:text-black hover:border-red-500 transition">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
