const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow only your frontend to connect
    methods: ["GET", "POST"]
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data); // Broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

 // Check connection to backend
 socket.on("connect", () => {
      console.log("Connected to the server!");
  });

  // Handle disconnection
  socket.on("disconnect", () => {
      console.log("Disconnected from the server.");
  });

// Serve static files (optional, if frontend is included)
app.use(express.static("public"));

// Handle API routes (if needed)
app.get("/", (req, res) => {
  res.send("Chat App Server is Running!");
});

// Start server on Vercel-friendly port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
