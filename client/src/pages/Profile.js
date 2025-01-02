import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Profile() {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [profile, setProfile] = useState();
  const [dpChange, setDpChange] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-user-details",
          { headers }
        );
        setProfile(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dpChange]);

  const containerVariants = {
    hidden: { opacity: 0, x: "-50%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: "50%" },
    visible: {
      opacity: 1,
      x: "0%",
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  return (
    <motion.div
      className="bg-indigo-50 h-auto md:h-screen rounded-md p-4 mx-4 md:mx-16 my-8 flex flex-col md:flex-row gap-6 md:gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Sidebar */}
      <motion.div
        className="w-full md:w-1/6 h-full bg-indigo-700 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Sidebar profile={profile} setDpChange={setDpChange} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="w-full md:w-5/6 bg-white rounded-lg shadow-md p-6 overflow-scroll overflow-x-hidden flex flex-col"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <h1 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
          Welcome, {profile?.username || "User"}!
        </h1>
        <div className="border-[2px] border-solid border-grey-700"></div>
        <Outlet />
      </motion.div>
    </motion.div>
  );
}

export default Profile;
