const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8000;

// Middleware to parse JSON
app.use(express.json());

//  Logging Middleware (runs on every request)
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') return res.end(); // No Content
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile('logs.txt', log, (err) => {
    if (err) console.error(' Error writing to logs.txt:', err);
  });
  next();
});

//  In-memory array for todos
let todos = [
  { id: 1, task: "Learn Node.js" },
  { id: 2, task: "Learn Express.js" }
];
// Home
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});
// About
app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

//  GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

//  GET a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

//  POST a new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PATCH (update) an existing todo
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (todo) {
    if (req.body.task) {
      todo.task = req.body.task;
    }
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

//  DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// 404 Middleware - if no route matched
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist. Try <a href="/">Home</a> or <a href="/about">About</a>.</p>
  `);
});

//  Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

//  Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
