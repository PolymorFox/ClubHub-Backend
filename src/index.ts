import express from "express";
import { diagnosticRoutes } from "./routes/diagnosticRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

// Mount routes for a diagnostic checks on root path
app.use("/", diagnosticRoutes);
app.use("/users", userRoutes);

console.log("Listening on port 3000");
app.listen(3000)
