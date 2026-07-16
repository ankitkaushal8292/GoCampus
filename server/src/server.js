import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import rideRequestRoutes from "./routes/rideRequestRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/ride-requests", rideRequestRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("🚀 GoCampus Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});