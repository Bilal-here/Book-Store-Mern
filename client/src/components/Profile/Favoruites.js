import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Favourites() {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);

  let headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://book-store-server-pry1.onrender.com/get-fav-books", { headers });
        setFav(response?.data?.data || []);
      } catch (err) {
        toast.error("Failed to fetch favourites.", { autoClose: 1000 });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleRemove = async (bookId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to remove this book?</p>
          <button
            onClick={async () => {
              try {
                const newHeaders = {
                  ...headers,
                  bookid: bookId,
                };
                const response = await axios.delete("https://book-store-server-pry1.onrender.com/remove-book-from-fav", {
                  headers: newHeaders,
                });
                setFav((prevFav) => prevFav.filter((book) => book._id !== bookId));
                toast.success(response?.data?.message || "Book removed successfully!", {
                  autoClose: 3000,
                  style: { backgroundColor: '#4F46E5', color: 'white' }, // Indigo 600 background color
                });
              } catch (err) {
                toast.error(err.response?.data?.message || "Error removing book. Try again!", { autoClose: 3000 });
              } finally {
                closeToast();
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-xl text-gray-700 font-bold mb-4">Favourites</h1>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : fav.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {fav.map((book, index) => (
            <div
              className="relative p-4 border border-gray-300 rounded shadow-md bg-white hover:shadow-lg transition"
              key={index}
            >
              <button
                className="absolute top-2 right-2 text-red-900 text-3xl font-bold hover:text-red-700 group"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(book._id);
                }}
              >
                ×
                <span className="absolute -top-8 right-0 w-24 p-1 text-sm text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Remove this book.
                </span>
              </button>
              <Link to={`/more-details/${book._id}`}>
                <img
                  src={book.file || "https://via.placeholder.com/150"}
                  alt={`${book.title || "Book"} Avatar`}
                  className="w-full max-h-[220px] object-contain mb-4 mx-auto rounded-2xl"
                />
                <h2 className="text-lg font-semibold">{book.title || "No Title Available"}</h2>
                <p className="text-sm text-gray-600">by {book.author || "Unknown Author"}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No books in Favourites.</p>
      )}
    </div>
  );
}

export default Favourites;
