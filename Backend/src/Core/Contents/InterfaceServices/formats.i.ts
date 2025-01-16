import { Request, Response } from "express";

/**
 * Interfaz que define los métodos para el servicio de formatos
 * Define las operaciones CRUD y sus parámetros requeridos
 */
export interface IformastsService {
  /**
   * Obtiene todos los formatos disponibles
   * @param res - Objeto Response para enviar la respuesta
   */
  getAllFormats(res: Response): void;

  /**
   * Inserta un nuevo formato
   * @param req - Objeto Request con los datos del formato
   * @param res - Objeto Response para enviar la respuesta
   */
  insertFormats(req: Request, res: Response): void;

  /**
   * Actualiza un formato existente
   * @param req - Objeto Request con los datos actualizados
   * @param res - Objeto Response para enviar la respuesta
   */
  updateFormats(req: Request, res: Response): void;

  /**
   * Busca un formato por su ID
   * @param req - Objeto Request con el ID del formato
   * @param res - Objeto Response para enviar la respuesta
   */
  findFormatsById(req: Request, res: Response): void;

  /**
   * Elimina un formato por su ID
   * @param req - Objeto Request con el ID del formato
   * @param res - Objeto Response para enviar la respuesta
   */
  deleteFormatsById(req: Request, res: Response): void;
}
