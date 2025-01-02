  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { motion } from "framer-motion"; // Import framer-motion
  import LoadingIndicator from "../Loader/LoadingIndicator";

  function AllBooks() {
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [searchQuery, setSearchQuery] = useState(""); // Track search input

    useEffect(() => {
      window.scrollTo(0, 0);
      axios
        .get("https://book-store-server-pry1.onrender.com/books/get-books")
        .then((response) => {
          setAllBooks(response?.data?.books);
          setFilteredBooks(response?.data?.books); // Initialize filtered books
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading after API call
        });
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    // Filter books based on search query
    useEffect(() => {
      if (searchQuery.trim() === "") {
        setFilteredBooks(allBooks); // If no search query, show all books
      } else {
        setFilteredBooks(
          allBooks.filter(
            (book) =>
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    }, [searchQuery, allBooks]);

    return (
      <div className="h-auto md:h-full rounded-md p-4 mx-4 sm:mx-6 md:mx-16">
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl text-indigo-700 font-bold mb-4">
              All available Books
            </h1>

            {/* Search Input */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-4"
            >
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </motion.div>

            {/* Book Grid */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 mb-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8"
            >
              {filteredBooks?.length > 0 ? (
                filteredBooks?.map((item, i) => (
                  <Link to={`/more-details/${item._id}`} key={item.id}>
                    <motion.div
                      className="group relative p-3 h-96 hover:bg-zinc-50 hover:shadow-md hover:scale-105 transition-transform duration-150 ease-in-out border-2 rounded-lg border-solid border-gray-100 flex justify-center flex-col"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <div className="p-auto lg:p-2 mb-4">
                        <motion.img
                          src={item.file}
                          alt="Book."
                          className="w-auto object-cover rounded-md bg-gray-200"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="m-2 space-y-3 space-x-auto">
                        <h3 className="text-lg text-gray-700 transition-colors duration-300">
                          <b>{item.title.slice(0, 25)}..</b>
                        </h3>
                        <p className="mt-1 text-sm text-gray-700">
                          By {item.author.slice(0, 20)}.
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No books found.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }

  export default AllBooks;
