import { Request, Response } from "express";

export interface IService {
  [key: string]: (req: Request, res: Response) => void;
}
