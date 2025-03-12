"use strict";
/**
 * Configuración del pool de conexiones para MySQL utilizando la biblioteca mysql2/promise.
 * Este módulo exporta una instancia de un pool de conexiones reutilizable para realizar
 * operaciones en la base de datos de manera eficiente.
 *
 * Requiere configuración previa de variables de entorno que definen los detalles de la conexión.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise")); // Importa la biblioteca mysql2 con soporte para promesas.
const env_1 = require("../../Global/Environment/env"); // Importa las variables de entorno definidas.
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
const pool = promise_1.default.createPool({
    database: env_1.env.DB,
    host: env_1.env.HOST_DB, // Host de la base de datos, definido en las variables de entorno.
    user: env_1.env.USER_DB, // Usuario de la base de datos, definido en las variables de entorno.
    password: env_1.env.PS_DB, // Contraseña del usuario, definido en las variables de entorno.
    waitForConnections: true, // Espera conexiones si el pool está saturado.
    port: 3306
});
// Exporta el pool para que pueda ser utilizado en otros módulos.
exports.default = pool;
