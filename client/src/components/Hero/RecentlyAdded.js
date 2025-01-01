import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function RecentlyAdded() {
  const [recent, setRecent] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0,0)
    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      axios
        .get("http://192.168.1.203:8080/books/get-recent-books")
        .then((response) => {
          setRecent(response?.data?.data || []);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isVisible]);

  return (
    <div
      className="h-auto md:h-full mb-14 rounded-md p-2 mx-4 md:mx-24"
      ref={sectionRef}
    >
      <div className="border-[1px] border-gray-300 border-solid my-8"></div>
      <h1 className="text-2xl text-indigo-700 font-bold">Recently Added Books</h1>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mt-6"></div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {recent.map((item, i) => (
            <Link to={`/more-details/${item._id}`} key={i}>
              <motion.div
                className="group relative px-4 py-2 hover:bg-zinc-50 hover:shadow-md hover:scale-105 transition-transform duration-50 ease-in-out border-2 rounded-lg border-solid border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <div>
                  <motion.img
                    src={item.file}
                    alt="Book."
                    className="w-full h-60 object-contain rounded-md"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="m-auto">
                    <h3 className="text-md text-gray-700 transition-colors duration-300">
                      <b>{item.title.slice(0, 30)}..</b>
                    </h3>
                    <p className="mt-1 text-sm text-gray-700 transition-colors duration-300">
                      By {item.author.slice(0, 15)}.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
      {/* Decorative Section */}
      <div className="mt-16">
        <motion.div
          className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Discover Your Next Favorite Book!</h2>
          <p className="text-lg mb-6">Explore our curated collection of featured books handpicked just for you.</p>
          <Link to="/all-books">
            <motion.button
              className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Featured Books
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Another Section: Promotional Banner */}
      <div className="mt-16">
        <motion.div
          className="bg-gray-200 p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Special Offer: 20% off on All Books!</h2>
          <p className="text-lg mb-4">Hurry! Limited time offer. Get your favorite books with 20% discount.</p>
          <Link to="/discounted-books">
            <motion.button
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Grab the Deal
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default RecentlyAdded;
