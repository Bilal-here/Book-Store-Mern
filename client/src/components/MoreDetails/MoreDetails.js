import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MoreDetails = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0,0)
    axios
      .get(`http://192.168.1.203:8080/books/get-recent-books/${id}`)
      .then((response) => {
        setBook(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://192.168.1.203:8080/cart/add-to-cart",
        {},
        { headers }
      );
      toast[response.data.message.includes("already") ? "error" : "success"](
        response?.data?.message,
        {
          autoClose: 1500,
          style: {
            backgroundColor: response.data.message.includes("already")
              ? "#EF4444"
              : "#4F46E5",
            color: "white",
          },
        }
      );
    } catch (error) {
      toast.error("Failed to add book to cart. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://192.168.1.203:8080/add-book-to-fav",
        {},
        { headers }
      );
      toast[response.data.message.includes("already") ? "error" : "success"](
        response?.data?.message,
        {
          autoClose: 1500,
          style: {
            backgroundColor: response.data.message.includes("already")
              ? "#EF4444"
              : "#4F46E5",
            color: "white",
          },
        }
      );
    } catch (error) {
      toast.error("Failed to add book to favourites. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-b-4 border-indigo-600 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Book not found.</p>
      </div>
    );
  }

  return (
    
    <div className="2xl:container 2xl:mx-auto lg:py-14 lg:px-20 md:py-10 md:px-6 py-8 px-4">
      <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
          <div className="w-full lg:w-full md:w-full flex justify-center items-center">
            <img
              src={book.file}
              alt="Book Preview"
              className="border-8 shadow-2xl md:border-[20px] w-[22rem] h-auto object-contain"
            />
          </div>
        </div>
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center px-8">
          <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-700 mt-4">
            {book.title}
          </h2>
          <h4 className="font-medium lg:text-2xl text-2xl lg:leading-9 leading-7 text-gray-700 mt-1">
            by {book.author}
          </h4>
          <p className="font-normal text-base leading-6 text-gray-600 mt-4">{book.desc}</p>
          <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6">
            ₹{book.price}/-
          </p>
          <button
            className="focus:outline-none focus:ring-2 hover:bg-indigo-700 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-indigo-600 w-full py-5 lg:mt-12 mt-6"
            onClick={handleCart}
          >
            Add to cart
          </button>
          <button
            className="focus:outline-none focus:ring-2 hover:bg-indigo-700 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-indigo-600 w-full py-5 lg:mt-4 mt-2"
            onClick={handleFavourite}
          >
            Add to Favourites
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
