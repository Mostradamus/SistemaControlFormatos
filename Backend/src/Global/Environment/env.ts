// Importamos la configuración de variables de entorno
import 'dotenv/config'

// Definición de variables de entorno con valores por defecto
// Si no existe la variable en .env, se usa el valor después del ||
const HOST_DB = process.env.HOST_DB || "localhost";    // Host de la base de datos
const USER_DB = process.env.USER_DB || "root";        // Usuario de la base de datos
const PS_DB = process.env.PS_DB || "";                // Contraseña de la base de datos
const DB = process.env.DB || "db_centroamerica";      // Nombre de la base de datos
const PORT = process.env.PORT || 3000                 // Puerto del servidor

// Exportamos un objeto con todas las variables de configuración
export const env = {HOST_DB, USER_DB, PS_DB, DB, PORT}