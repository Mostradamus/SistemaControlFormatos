import { Request, Response } from "express";
export interface IformatsService {
  getAllFormats(res: Response): void;
  insertFormats(req: Request, res: Response): void;
  findFormatsById(req: Request, res: Response): void;
  deleteFormatsById(req: Request, res: Response): void;
  getAllFormatSp(res: Response): void;
  updateFormatsDetails(req: Request, res: Response):void;
  comprobarFormatos(req:Request, res: Response): void;
}
