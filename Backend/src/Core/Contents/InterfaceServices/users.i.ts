import { Request, Response } from "express"; // Importa los tipos de Express para manejar solicitudes y respuestas.
export interface IusersService {
  getAllUsers(res: Response): void;
  insertUsers(req: Request, res: Response): void;
  updateUsers(req: Request, res: Response): void;
  findUsersById(req: Request, res: Response): void;
  deleteUsersById(req: Request, res: Response): void;
  loginValid(req: Request, res: Response): void;
}
