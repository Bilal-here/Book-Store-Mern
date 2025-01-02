import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [language, setLanguage] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://book-store-server-pry1.onrender.com/books/get-book/${id}`);
        const bookData = response.data.book;
        setBook(bookData);
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setPrice(bookData.price);
        setDesc(bookData.desc);
        setLanguage(bookData.language);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('desc', desc);
    formData.append('language', language);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.put(`https://book-store-server-pry1.onrender.com/books/update-books/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert('Book updated successfully');
      navigate('/admin'); // Redirect to book list
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Error updating book');
    }
  };

  if (loading) {
    return <div>Loading book details...</div>;
  }

  return (
    <div className="edit-book-form p-4 md:p-8">
      <h2 className="text-2xl text-indigo-700 font-bold mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="p-3 w-full border border-gray-300 rounded-lg shadow-sm"
        />
        <button
          type="submit"
          className="p-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-800 transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
