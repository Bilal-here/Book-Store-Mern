import React from 'react';
import { Link } from 'react-router-dom';
import BookList from '../components/Admin/BookList'; 
import AddBook from '../components/Admin/AddBook';

function AdminDashboard() {
  return (
    <div className="h-auto md:h-full rounded-md p-4 mx-4 sm:mx-6 md:mx-16">
      <h1 className="text-3xl text-indigo-700 font-bold mb-4">Admin Dashboard</h1>
      
      <div className="actions mb-8 space-x-4">
        <Link to="/admin/add-book">
          <button className="btn btn-primary p-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-800 transition">
            Add New Book
          </button>
        </Link>

        <Link to="/admin/all-orders">
          <button className="btn btn-primary p-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-800 transition">
            All-Orders
          </button>
        </Link>
      </div>

      <h2 className="text-2xl text-gray-800 font-bold mb-6">All Books</h2>
      <BookList />
    </div>
  );
}

export default AdminDashboard;
