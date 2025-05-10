const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a new book
router.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  const book = new Book({ title, author, year });
  await book.save();
  res.json(book);
});

// Update a book
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Book.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

// Delete a book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
