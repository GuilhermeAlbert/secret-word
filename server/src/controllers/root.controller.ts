import { Request, Response } from "express";

export function getRoot(_: Request, res: Response) {
  res.json({ message: "System is working!" });
}
