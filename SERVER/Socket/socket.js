const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust as necessary
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = [];

io.on("connection", (socket) => {
  console.log("Connected at server...");

  if (userId && userId.trim() !== "") {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(Object.keys(userSocketMap));
  }
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    if (userSocketMap[userId]) {
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id
      );

      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId};
