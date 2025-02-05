import { Request, Response } from "express";

/**
 * Interfaz que define los métodos para el servicio de formatos
 * Define las operaciones CRUD y sus parámetros requeridos
 */
export interface IformatsService {
  getAllFormats(res: Response): void;
  insertFormats(req: Request, res: Response): void;
  findFormatsById(req: Request, res: Response): void;
  deleteFormatsById(req: Request, res: Response): void;
  getAllFormatSp(res: Response): void;
  updateFormatsDetails(req: Request, res: Response):void;
  comprobarFormatos(req:Request, res: Response): void;
}
