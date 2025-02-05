import { Request, Response } from "express";
export interface IAreaService {
    getAllArea(res: Response): void;
    getAreasRevision(res: Response): void;
    getAreasRevisionDetalle(req: Request, res: Response): void;
}