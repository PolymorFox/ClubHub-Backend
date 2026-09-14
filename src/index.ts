import express from "express";
import { diagnosticRoutes } from "./routes/diagnosticRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import dotenv from "dotenv"
import cors from 'cors'

// Load env variables from .env file
dotenv.config()

const app = express();
app.use(express.json());

// Use cors only accepts request from vite dev server, or from frontend dev server
const corsOptions: object = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(cors(corsOptions))

// Mount routes for a diagnostic checks on root path
app.use("/", diagnosticRoutes);
app.use("/users", userRoutes);

console.log("Listening on port 3000");
app.listen(3000)
