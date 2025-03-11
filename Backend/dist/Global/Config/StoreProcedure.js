"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProcedure = void 0;
// Importamos el pool de conexión a la base de datos desde un archivo centralizado.
// También importamos tipos específicos de la biblioteca mysql2.
const db_cn_1 = __importDefault(require("../../Core/Connection/db.cn"));
// Clase StoreProcedure que proporciona métodos para ejecutar procedimientos almacenados.
class StoreProcedure {
    /**
     * Ejecuta un procedimiento almacenado que devuelve un único resultado (objeto).
     *
     * @template T - Tipo genérico para el objeto resultante.
     * @param spName - Nombre del procedimiento almacenado.
     * @param params - Parámetros para el procedimiento almacenado.
     * @param entity - (Opcional) Clase para mapear el resultado a una entidad.
     * @returns Un objeto del tipo T o null si no hay resultados.
     */
    executeStoredProcedureForGet(spName_1) {
        return __awaiter(this, arguments, void 0, function* (spName, params = [], entity) {
            try {
                console.log(params);
                // Construcción dinámica de la consulta con placeholders para los parámetros.
                const query = `CALL ${spName}(${params.map(() => "?").join(", ")})`;
                const result = yield this.executeQuery(query, 1, params);
                const q = result; // Primera parte del resultado.
                // Si el resultado es válido y tiene datos.
                if (Array.isArray(result) && result.length > 0) {
                    const rows = result[0]; // Obtiene las filas resultantes.
                    return entity
                        ? rows.map((row) => this.mapToEntity(row, entity)) // Mapea a la entidad si está definida.
                        : rows; // Retorna las filas sin mapear.
                }
                else {
                    return q;
                }
            }
            catch (error) {
                // Manejo de errores con registro en consola y lanzamiento de excepción.
                console.error(`Error al ejecutar el procedimiento almacenado '${spName}':`, error);
                throw new Error(`No se pudo obtener el resultado del procedimiento almacenado.`);
            }
        });
    }
    /**
     * Ejecuta un procedimiento almacenado que devuelve una lista de resultados.
     *
     * @template T - Tipo genérico para los objetos de la lista.
     * @param spName - Nombre del procedimiento almacenado.
     * @param params - Parámetros para el procedimiento almacenado.
     * @param entity - (Opcional) Clase para mapear cada resultado a una entidad.
     * @returns Una lista de objetos del tipo T.
     */
    executeStoredProcedureForList(spName_1, tipo_1) {
        return __awaiter(this, arguments, void 0, function* (spName, tipo, params = [], entity) {
            // Construcción dinámica de la consulta.
            const query = `CALL ${spName}(${params.map(() => "?").join(", ")})`;
            console.log(query);
            const result = yield this.executeQuery(query, tipo, params);
            // Si hay resultados, los mapea o los retorna directamente.
            if (Array.isArray(result) && result.length > 0) {
                let ress;
                if (tipo == 1) {
                    ress = result;
                }
                else {
                    ress = result[0];
                }
                const rows = ress;
                return entity
                    ? rows.map((row) => this.mapToEntity(row, entity))
                    : rows;
            }
            else {
            }
            return []; // Retorna una lista vacía si no hay resultados.
        });
    }
    /**
     * Método protegido para ejecutar consultas en la base de datos.
     *
     * @param query - Consulta SQL a ejecutar.
     * @param params - Parámetros para la consulta.
     * @returns Resultados de la consulta como un array de RowDataPacket.
     */
    executeQuery(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, tipo = 0, ...params) {
            // Obtiene una conexión del pool.
            const conn = yield db_cn_1.default.getConnection();
            try {
                // Ejecuta la consulta con los parámetros.
                if (tipo == 1 || tipo == 2) {
                    params = params[0];
                }
                else {
                }
                const [result] = yield conn.query(query, params);
                console.log(result);
                // const result = Array.isArray(rows) ? rows[0] : rows;
                if (tipo == 1) {
                    console.log(result);
                    const [resT] = result; // Suponiendo que el primer elemento de `result` es el objeto que necesitas.
                    return resT;
                }
                else if (tipo == 0) {
                    console.log(23);
                    const f = result; // `result` ya es un arreglo
                    return f;
                }
                else {
                    return result;
                }
            }
            finally {
                // Libera la conexión al finalizar.
                conn.release();
            }
        });
    }
    /**
     * Mapea un objeto de fila a una instancia de una entidad específica.
     *
     * @template T - Tipo genérico de la entidad.
     * @param row - Objeto de la base de datos.
     * @param entity - Clase para crear la instancia de la entidad.
     * @returns Instancia de la entidad mapeada con los valores de la fila.
     */
    mapToEntity(row, entity) {
        const entityInstance = new entity(); // Crea una nueva instancia de la entidad.
        for (const key in entityInstance) {
            if (row.hasOwnProperty(key)) {
                entityInstance[key] = row[key]; // Asigna valores de la fila a la instancia.
            }
        }
        return entityInstance; // Retorna la instancia mapeada.
    }
}
exports.StoreProcedure = StoreProcedure;
