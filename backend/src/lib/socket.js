import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const onlineUsers = new Map();

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

  socket.on("sendMessage", (socketId, receiverId, message) => {
    console.log(`Message from ${socketId} to ${receiverId}: ${message}`);

    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("responseMessage", message);
    } else {
      console.log(`User ${receiverId} is not online`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // for (const [userId, socketId] of onlineUsers.entries()) {
    //   if (socketId === socket.id) {
    //     onlineUsers.delete(userId);
    //     io.emit("newActiveUserResponse", Array.from(onlineUsers.keys()));
    //     break;
    //   }
    // }
  });
  // socket.on("sendMessage", (socketId, receiverId, message) => {
  //   console.log(message);
  //   socket.broadcast.emit("responseMessage", message);
  // });

  // socket.on("newActiveUser", (user) => {
  //   onLineUsers.add(user._id);
  //   console.log(onLineUsers, "onLineUsers");
  //   socket.emit("newActiveUserResponse", Array.from(onLineUsers));
  // });

  // socket.on("removeActiveUser", (user) => {
  //   onLineUsers.delete(user._id);
  //   console.log(onLineUsers, "newOnlineUsers");
  //   socket.emit("newActiveUserResponse", Array.from(onLineUsers));
  // });
});

export { app, server };
