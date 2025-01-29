import { io, Socket } from "socket.io-client";
import { User } from "../store/authSlice";

export const socket: Socket = io("http://localhost:5001");

export const emitActiveUsers = (response: User) => {
  socket.emit("newActiveUser", response);
};

export const emitRemoveActiveUser = (response: User) => {
  socket.emit("removeActiveUser", response);
};
