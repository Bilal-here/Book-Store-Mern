import React from 'react';
import { motion } from 'framer-motion';  // Import motion from framer-motion
import image from './Library.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="h-auto md:h-[80vh] rounded-md p-4 mx-4 md:mx-16 my-8 flex flex-col md:flex-row md:px-10 gap-6 md:gap-12">
      
      {/* Left section for heading */}
      <div className="md:w-1/2 pt-10 md:pt-24 text-center md:text-left">
        {/* Apply animation on the heading */}
        <motion.h1
          className="font-extrabold text-3xl sm:text-4xl md:text-6xl text-indigo-700 leading-tight"
          initial={{ opacity: 0, y: -50 }}  // Initial state
          animate={{ opacity: 1, y: 0 }}    // Animated state
          transition={{ duration: .7}}      // Animation duration
        >
          Discover New Worlds With Every Page..
        </motion.h1>

        {/* Apply animation on the paragraph */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: .7 }}
        >
          Dive into a world of stories, knowledge, and imagination. Explore our curated collection tailored just for you.
        </motion.p>

        {/* Apply animation on the button */}
        <Link to={'/all-books'}>
        <motion.button
          className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-md shadow hover:bg-indigo-700 transition"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay:0.5 , duration:.7 }}
        >
          Explore Now
        </motion.button>
        </Link>
      </div>

      {/* Right section for image */}
      <div className="md:w-1/2 flex items-center justify-center">
        {/* Apply animation on the image */}
        <motion.img
          src={image}
          alt="Library"
          className="w-full max-w-md sm:max-w-lg md:max-w-full max-h-full rounded-lg object-contain"
          initial={{ opacity: 0, x:200 }}
          animate={{ opacity: 1, x:0 }}
          transition={{ delay: 0.7, duration: .7 }}
        />
      </div>
      
    </div>
  );
}

export default Hero;
