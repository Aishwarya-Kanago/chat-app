import axios from "axios";

export const BASEURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://chat-app-gffe.onrender.com";

export const axiosInstance = axios.create({
  baseURL: `${BASEURL}/api`,
  withCredentials: true,
});
