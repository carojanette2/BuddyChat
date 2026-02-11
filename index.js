const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/:room", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});

io.on("connection", (socket) => {
  // socket.on('chat message', (msg) => {
  //   console.log('message: ' + msg);
  // });
});

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("chat-message", ({ room, message }) => {
    console.log(room, message);
    io.to(room).emit("chat message", { room, message });
  });
  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', msg);
  // });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
