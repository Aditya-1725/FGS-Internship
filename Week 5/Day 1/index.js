const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Hello Aditya Here!\n');
    res.write('Welcome to Node.js server.\n');
    res.write('Here, res.write use for multiple lines.\n');
    res.end('Goodbye!');
});

server.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
