import { Router , type Request ,type Response } from "express"

export const diagnosticRoutes = Router();

diagnosticRoutes.get("/", (req: Request ,res: Response) => {
  res.status(200).json({status: "alive"})
})
