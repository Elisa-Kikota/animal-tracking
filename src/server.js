const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send tracking data every second
  setInterval(() => {
    const data = {
      id: 'animal-123',
      location: { lat: Math.random() * 100, lng: Math.random() * 100 },
      timestamp: new Date().toISOString(),
    };
    socket.emit('trackingData', data);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
