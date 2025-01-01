import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  // Single useState to hold all form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
    file: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('price', formData.price);
    data.append('desc', formData.desc);
    data.append('language', formData.language);
    data.append('file', formData.file);

    try {
      const response = await axios.post('http://192.168.1.203:8080/books/add-books', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        alert('Book added successfully');
        // Reset form fields upon successful API call
        setFormData({
          title: '',
          author: '',
          price: '',
          desc: '',
          language: '',
          file: null,
        });
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book');
    }
  };

  return (
    <div className="add-book-form p-4 md:p-8">
      <h2 className="text-2xl text-indigo-700 font-bold mb-6">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleChange}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <button type="submit" className="p-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-800 transition">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
