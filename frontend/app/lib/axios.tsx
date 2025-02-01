import axios from "axios";

export const BASEURL = "https://chat-app-eta-kohl.vercel.app";
// export const BASEURL = "http://localhost:5001";

export const axiosInstance = axios.create({
  baseURL: `${BASEURL}/api`,
  withCredentials: true,
});
