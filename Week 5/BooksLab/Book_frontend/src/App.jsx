import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookCard from './components/BookCard';
import BookEditor from './components/BookEditor';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [tab, setTab] = useState('list');

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:3000/books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
      });
      fetchBooks();  // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdate = async (updatedBook) => {
    try {
      await fetch(`http://localhost:3000/books/${updatedBook._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      fetchBooks();  // Refresh the list after updating
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleAdd = async (newBook) => {
    try {
      await fetch(`http://localhost:3000/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      fetchBooks();  // Refresh the list after adding
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="app">
      <Navbar currentTab={tab} setTab={setTab} />
      {tab === 'list' && (
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book._id} book={book} onDelete={() => handleDelete(book._id)} />
            ))
          ) : (
            <p>No books available.</p>  // Fallback message
          )}
        </div>
      )}
      {tab === 'add' && <BookForm onSave={handleAdd} />}
      {tab === 'edit' && <BookEditor books={books} onUpdate={handleUpdate} onDelete={handleDelete} />}
    </div>
  );
}

export default App;
