import { Router, type Response, type Request } from "express";
import { db } from "../db.js";
import bcrypt from "bcrypt";

export const loginRoutes = Router();

interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  club: string;
}

loginRoutes.post("/", async (req: Request, res: Response) => {
  // Let's check if the user record returns any rows in the db
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // TODO Implement comparing password with hashes instead of raw plain text compare
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as UserRow | undefined;
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password_hash, ...safeUser } = user;

    return res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
});
