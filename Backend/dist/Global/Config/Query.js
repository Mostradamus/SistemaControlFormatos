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
exports.QueryGlobal = void 0;
const db_cn_1 = __importDefault(require("../../Core/Connection/db.cn"));
/**
 * Clase genérica para operaciones CRUD en la base de datos
 * @template T - Tipo de entidad con la que trabajará la clase
 */
class QueryGlobal {
    /**
     * Inicializa una nueva instancia de QueryGlobal
     * @param entity - Constructor de la entidad
     */
    constructor(entity) {
        const entityPrototype = entity.prototype;
        this.tableName = entityPrototype.tableName;
        this.primaryKey = entityPrototype.primaryKey;
    }
    /**
     * Obtiene todos los registros de la tabla
     * @param transaction - Conexión de transacción opcional
     * @returns Promise con todos los registros
     */
    getAll(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${this.tableName}`;
            return (yield transaction)
                ? transaction === null || transaction === void 0 ? void 0 : transaction.query(query)
                : this.executeQuery(query);
        });
    }
    /**
     * Crea un nuevo registro en la tabla
     * @param entity - Objeto con los datos a insertar
     * @param transaction - Conexión de transacción opcional
     * @returns Promise con la entidad creada incluyendo su ID
     */
    create(entity, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Prepara los campos y valores para la inserción
                const fields = Object.keys(entity)
                    .filter((key) => key !== this.primaryKey)
                    .join(", ");
                const placeholders = Object.keys(entity)
                    .filter((key) => key !== this.primaryKey)
                    .map(() => "?")
                    .join(", ");
                const values = Object.keys(entity)
                    .filter((key) => key !== this.primaryKey)
                    .map((key) => entity[key]);
                // Ejecuta la inserción
                const insertQuery = `INSERT INTO ${this.tableName} (${fields}) VALUES (${placeholders})`;
                const insertResult = transaction
                    ? yield transaction.query(insertQuery, values)
                    : yield this.executeQuery(insertQuery, values);
                // Obtiene el ID del registro insertado
                const insertId = insertResult[0].insertId;
                // Recupera el registro completo
                const selectQuery = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
                const [rows] = transaction
                    ? yield transaction.query(selectQuery, [insertId])
                    : yield this.executeQuery(selectQuery, [insertId]);
                return rows[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Actualiza un registro existente
     * @param entity - Entidad con los datos actualizados
     * @param transaction - Conexión de transacción opcional
     */
    update(entity, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.keys(entity).filter((key) => key !== this.primaryKey);
            const values = fields.map((field) => entity[field]);
            const setClause = fields.map((field) => `${field} = ?`).join(", ");
            const primaryKeyValue = entity[this.primaryKey];
            const update = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`;
            (yield transaction)
                ? transaction === null || transaction === void 0 ? void 0 : transaction.query(update, primaryKeyValue)
                : this.executeQuery(update, ...values, primaryKeyValue);
        });
    }
    /**
     * Elimina un registro por su ID
     * @param id - ID del registro a eliminar
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeQuery(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`, id);
        });
    }
    /**
     * Busca registros por un campo específico
     * @param field - Campo por el cual buscar
     * @param value - Valor a buscar
     * @param transaction - Conexión de transacción opcional
     * @returns Registro(s) encontrado(s) o null si no hay coincidencias
     */
    getByField(field, value, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const getByfiel = `SELECT * FROM ${this.tableName} WHERE ?? = ?`;
            const [rows] = (yield transaction)
                ? transaction === null || transaction === void 0 ? void 0 : transaction.query(getByfiel, field, value)
                : this.executeQuery(getByfiel, field, value);
            console.log(rows);
            if (!rows || rows.length === 0) {
                return null;
            }
            if (rows.length === 1) {
                return rows[0];
            }
            return rows;
        });
    }
    /**
     * Ejecuta una consulta SQL con parámetros
     * @param query - Consulta SQL
     * @param params - Parámetros para la consulta
     * @returns Promise con el resultado de la consulta
     */
    executeQuery(query, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield db_cn_1.default.getConnection();
            try {
                const [result, fields] = yield conn.query(query, params);
                return result;
            }
            finally {
                conn.release();
            }
        });
    }
}
exports.QueryGlobal = QueryGlobal;
