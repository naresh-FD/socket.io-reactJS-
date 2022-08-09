const express = require('express');
const app = express();

const http = require('http');
const { Server } = require('socket.io');
const port = 5000;
const cors = require('cors');

const server = http.createServer(app);
app.use(cors);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('send_message', (data) => {
    console.log('MSG', data);
  });
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });
});

// io.on('connection', function (socket) {
//   console.log('connection');

//   socket.on('CH01', function (from, msg) {
//     console.log('MSG', from, ' saying ', msg);
//   });
// });

server.listen(port);
