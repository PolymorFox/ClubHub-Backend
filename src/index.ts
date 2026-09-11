import express, { type Request, type Response, type NextFunction } from "express";
import { diagnosticRoutes } from "./routes/diagnosticRoutes.js";

const app = express();
app.use(express.json());

// Mount routes for a diagnostic checks on root path
app.use("/", diagnosticRoutes);
