import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-mauve-ten.vercel.app/api",
  withCredentials: true,
});
