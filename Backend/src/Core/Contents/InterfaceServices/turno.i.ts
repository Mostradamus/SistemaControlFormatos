import { Request, Response } from "express";
export interface ITurnoService {
    getAllTurno(res: Response): void;
}