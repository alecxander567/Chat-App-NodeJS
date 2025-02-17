const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// Handle client connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Receive and broadcast messages
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
