import { Router, type Response, type Request } from "express";
import { db } from "../db.js";
// Routes meant to implmenent basic crud operations on user data

export const userRoutes = Router();

/**
 * This route returns all the users within the user table
 */
userRoutes.get("/all", (req: Request, res: Response) => {
  try {
    res.status(200).json({users: db.prepare("SELECT * FROM users").all()})
  } catch (error) {
    res.status(500).json({ error: error })
  }
})
