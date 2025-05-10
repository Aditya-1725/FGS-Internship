const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
app.use(express.json());

//  Logger Middleware 
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') return res.status(204).end();
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile('logs.txt', log, (err) => {
    if (err) console.error(' Error writing to logs.txt:', err);
  });
  next();
});

//  MongoDB Connect 
mongoose
  .connect('mongodb://localhost:27017/todo_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(' MongoDB Connected'))
  .catch((err) => console.error(' MongoDB connection error:', err));

//  Mongoose Schema 
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);

//  Routes 
// Home
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});
// About
app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add todo
app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo({ title: req.body.title });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid todo data' });
  }
});

// Update todo
app.patch('/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid update' });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid delete' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>This route doesn't exist.</p>
  `);
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
