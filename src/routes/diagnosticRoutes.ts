import { Router , type Response } from "express"

export const diagnosticRoutes = Router();

diagnosticRoutes.get("/", (res: Response) => {
  res.status(200).json({status: "alive"})
})
