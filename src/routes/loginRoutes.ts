import { Router, type Response, type Request } from "express";
import { db } from "../db.js";
import { error } from "console";

export const loginRoutes = Router();

loginRoutes.post("/", (req: Request, res: Response) => {
  // Let's check if the user record returns any rows in the db
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // TODO Implement comparing password with hashes instead of raw plain text compare
    const user = db
      .prepare("SELECT * FROM users WHERE email = ? AND password = ?")
      .get(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
});
