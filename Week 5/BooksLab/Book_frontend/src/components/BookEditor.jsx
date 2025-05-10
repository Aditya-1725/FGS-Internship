import React, { useState } from 'react';

function BookEditor({ books, onUpdate, onDelete }) {
  const [search, setSearch] = useState('');
  const [editBook, setEditBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      String(book.year).includes(search)
  );

  const handleEdit = (book) => {
    setEditBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
  };

  const handleSave = () => {
    if (!title || !author || !year) return;
    onUpdate({ ...editBook, title, author, year });
    setEditBook(null);
    setSearch('');
  };

  return (
    <div className="book-editor">
      <input
        className="search-input"
        placeholder="Search by title or year"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {editBook ? (
        <div className="edit-form">
          <input
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="form-input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className="form-input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={() => setEditBook(null)}>Cancel</button>
        </div>
      ) : (
        filtered.map((book) => (
          <div key={book._id} className="book-card">
            <h3 className="book-title">{book.title}</h3>
            <p>{book.author} ({book.year})</p>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(book._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookEditor;
