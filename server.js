weconst express = require("express");
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


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);


  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data); 
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
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
