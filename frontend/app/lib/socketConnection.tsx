import { io, Socket } from "socket.io-client";
import { User } from "../store/authSlice";
import { messagePayloadType } from "./types";
import toast from "react-hot-toast";
import { axiosInstance, BASEURL } from "./axios";
import axios from "axios";

export const socket: Socket = io(BASEURL, {
  withCredentials: true,
});

export const emitActiveUsers = (response: User) => {
  socket.emit("newActiveUser", response);
};

export const emitRemoveActiveUser = (response: User) => {
  socket.emit("removeActiveUser", response);
};

export const sendMessage = async (
  messageData: messagePayloadType,
  selectedUserId: string | undefined
) => {
  try {
    const res = await axiosInstance.post(
      `/messages/send/${selectedUserId}`,
      messageData
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "An error occurred");
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getMessages = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/messages/${userId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "An error occurred");
    } else {
      toast.error("Something went wrong");
    }
  }
};
