/**
 * Interfaz para la capa de servicios de usuarios.
 * Define las operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * que se pueden realizar sobre los usuarios.
 */

import { Request, Response } from "express"; // Importa los tipos de Express para manejar solicitudes y respuestas.

/**
 * Interfaz IusersService
 *
 * Proporciona la definición de los métodos que deben ser implementados
 * para gestionar los usuarios en el sistema.
 */
export interface IusersService {
  /**
   * Obtiene todos los usuarios.
   *
   * @param {Response} res - Objeto de respuesta de Express para enviar los datos al cliente.
   * @returns {void}
   */
  getAllUsers(res: Response): void;

  /**
   * Inserta un nuevo usuario en el sistema.
   *
   * @param {Request} req - Objeto de solicitud de Express que contiene los datos del usuario a insertar.
   * @param {Response} res - Objeto de respuesta de Express para enviar la confirmación o errores al cliente.
   * @returns {void}
   */
  insertUsers(req: Request, res: Response): void;

  /**
   * Actualiza la información de un usuario existente.
   *
   * @param {Request} req - Objeto de solicitud de Express que contiene los datos del usuario a actualizar.
   * @param {Response} res - Objeto de respuesta de Express para enviar la confirmación o errores al cliente.
   * @returns {void}
   */
  updateUsers(req: Request, res: Response): void;

  /**
   * Encuentra un usuario por su ID.
   *
   * @param {Request} req - Objeto de solicitud de Express que contiene el ID del usuario a buscar.
   * @param {Response} res - Objeto de respuesta de Express para enviar los datos del usuario o errores al cliente.
   * @returns {void}
   */
  findUsersById(req: Request, res: Response): void;

  /**
   * Elimina un usuario por su ID.
   *
   * @param {Request} req - Objeto de solicitud de Express que contiene el ID del usuario a eliminar.
   * @param {Response} res - Objeto de respuesta de Express para enviar la confirmación o errores al cliente.
   * @returns {void}
   */
  deleteUsersById(req: Request, res: Response): void;

  loginValid(req: Request, res: Response): void;
}
