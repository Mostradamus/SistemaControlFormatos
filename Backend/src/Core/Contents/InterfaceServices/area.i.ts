import { Request, Response } from "express";

export interface IAreaService {
    getAllArea(res: Response): void;
}