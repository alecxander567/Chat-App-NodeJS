const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://chat-app-nodejs-txw9.onrender.com", 
    methods: ["GET", "POST"]
  }
});

let users = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

socket.on("register", (username) => {
  users[username] = socket.id;
  io.emit("userList", Object.keys(users)); 
});

socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data); 
  });

socket.on("privateMessage", ({ sender, receiver, text }) => {
  const receiverSocketId = users[receiver]; 
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("privateMessage", { sender, text });
    }
});

socket.on("disconnect", () => {
    let userToRemove = Object.keys(users).find((key) => users[key] === socket.id);
    if (userToRemove) {
      delete users[userToRemove];
      io.emit("userList", Object.keys(users)); 
    }
    console.log(`User ${socket.id} disconnected`);
  });
}); 

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Chat App Server is Running!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
