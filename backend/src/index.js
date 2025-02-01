import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
// import { connectDB } from "./lib/db.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
export var corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, PATCH, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("error while connecting to DB", error));
db.once("open", () => console.log("Connected to Database"));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, async () => {
  console.log("Server is running on PORT: ", PORT);
});
