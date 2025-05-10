import React, { useState } from 'react';

function BookForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !year) return;
    onSave({ title, author, year });
    setTitle('');
    setAuthor('');
    setYear('');
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <input
        className="form-input"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-input"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        className="form-input"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button className="form-button" type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
