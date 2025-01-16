/**
 * Configuración del pool de conexiones para MySQL utilizando la biblioteca mysql2/promise.
 * Este módulo exporta una instancia de un pool de conexiones reutilizable para realizar
 * operaciones en la base de datos de manera eficiente.
 *
 * Requiere configuración previa de variables de entorno que definen los detalles de la conexión.
 */

import mysql from "mysql2/promise"; // Importa la biblioteca mysql2 con soporte para promesas.
import { env } from "../../Global/Environment/env"; // Importa las variables de entorno definidas.

/**
 * Configuración del pool de conexiones.
 * El pool permite manejar múltiples conexiones a la base de datos
 * y las reutiliza para optimizar el rendimiento.
 *
 * @param {string} host - Dirección del host donde se encuentra la base de datos.
 * @param {string} user - Usuario de la base de datos.
 * @param {string} password - Contraseña del usuario para la base de datos.
 * @param {boolean} waitForConnections - Indica si las solicitudes deben esperar
 *                                        si no hay conexiones disponibles en el pool.
 */
const pool = mysql.createPool({
  database: env.DB,
  host: env.HOST_DB, // Host de la base de datos, definido en las variables de entorno.
  user: env.USER_DB, // Usuario de la base de datos, definido en las variables de entorno.
  password: env.PS_DB, // Contraseña del usuario, definido en las variables de entorno.
  waitForConnections: true, // Espera conexiones si el pool está saturado.
});

// Exporta el pool para que pueda ser utilizado en otros módulos.
export default pool;
