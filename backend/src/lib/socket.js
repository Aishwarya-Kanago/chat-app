import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const onlineUsers = new Map();

export function getReceiverSocketId(userId) {
  return onlineUsers.get(userId);
}

io.on("connection", (socket) => {
  console.log("connection successful", socket.id);

  socket.on("newActiveUser", (user) => {
    if (user?._id) {
      onlineUsers.set(user._id, socket.id);
      console.log(onlineUsers, "Updated Online Users");

      io.emit("newActiveUserResponse", Array.from(onlineUsers.keys()));
    }
  });

  socket.on("removeActiveUser", (user) => {
    if (user?._id) {
      onlineUsers.delete(user._id);
      console.log(onlineUsers, "Updated Online Users");

      io.emit("newActiveUserResponse", Array.from(onlineUsers.keys()));
    }
  });

  socket.on("sendMessage", (socketId, receiverId, senderUserId, message) => {
    console.log(`Message from ${socketId} to ${receiverId}: ${message}`);

    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("responseMessage", message, senderUserId);
    } else {
      console.log(`User ${receiverId} is not online`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { app, server };
