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
  port: 3306
});

// Exporta el pool para que pueda ser utilizado en otros módulos.
export default pool;
const testConnection = async () => {
  try {
    const pool = mysql.createPool({
      database: env.DB,
      host: env.HOST_DB, // Host de la base de datos, definido en las variables de entorno.
      user: env.USER_DB, // Usuario de la base de datos, definido en las variables de entorno.
      password: env.PS_DB, // Contraseña del usuario, definido en las variables de entorno.
      waitForConnections: true, // Espera conexiones si el pool está saturado.
      port: 3306
    });
    console.log(env.DB)
    const conn = await pool.getConnection();

    // Parámetros de entrada para el SP
    const id_area = 1;
    const id_status = 1;
    const fechaInicio = "2025-02-21";
    const fechaFin = "2025-03-11";

    // Llamar al Stored Procedure
    console.log("Ejecutando SP...");
    const [results] = await conn.query("CALL GetFormatDetailsByAreaAndDate(?, ?, ?, ?)", [
      id_area,
      id_status,
      fechaInicio,
      fechaFin
    ]);

    console.log("✅ SP ejecutado correctamente:", results);
    console.log("✅ Conectado a MySQL correctamente");
    await pool.end();
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error);
  }
};

testConnection();