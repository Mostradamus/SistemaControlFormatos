import "reflect-metadata";
import pool from "../../Core/Connection/db.cn";
import { RowDataPacket, PoolConnection } from "mysql2";

/**
 * Clase genérica para operaciones CRUD en la base de datos
 * @template T - Tipo de entidad con la que trabajará la clase
 */
export class QueryGlobal<T extends object> {
  protected tableName: string; // Nombre de la tabla en la base de datos
  protected primaryKey: string; // Nombre de la columna que es llave primaria

  /**
   * Inicializa una nueva instancia de QueryGlobal
   * @param entity - Constructor de la entidad
   */
  constructor(entity: new () => T) {
    // const entityPrototype = entity.prototype;
    // this.tableName = entityPrototype.tableName;
    // this.primaryKey = entityPrototype.primaryKey;
    this.tableName = Reflect.getMetadata("tableName", entity);
    this.primaryKey = Reflect.getMetadata("primaryKey", entity);
  }

  /**
   * Obtiene todos los registros de la tabla
   * @param transaction - Conexión de transacción opcional
   * @returns Promise con todos los registros
   */
  async getAll(transaction?: PoolConnection) {
    const query = `SELECT * FROM ${this.tableName}`;
    return (await transaction)
      ? transaction?.query(query)
      : this.executeQuery(query);
  }

  /**
   * Crea un nuevo registro en la tabla
   * @param entity - Objeto con los datos a insertar
   * @param transaction - Conexión de transacción opcional
   * @returns Promise con la entidad creada incluyendo su ID
   */
  async create(entity: T, transaction?: PoolConnection): Promise<T> {
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
        .map((key) => (entity as any)[key]);
      // Ejecuta la inserción
      const insertQuery = `INSERT INTO ${this.tableName} (${fields}) VALUES (${placeholders})`;
      const insertResult = transaction
        ? await transaction.query(insertQuery, values)
        : await this.executeQuery(insertQuery,1, values);
      // Obtiene el ID del registro insertado
      const insertId = (insertResult as any).insertId;
      

      // Recupera el registro completo
      const selectQuery = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`;
      const [rows]: any = transaction
        ? await transaction.query(selectQuery,1, insertId)
        : await this.executeQuery(selectQuery,1, insertId);

      return rows as T;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un registro existente
   * @param entity - Entidad con los datos actualizados
   * @param transaction - Conexión de transacción opcional
   */
  async update(entity: T, transaction?: PoolConnection) {
    const fields = Object.keys(entity).filter((key) => key !== this.primaryKey);
    const values = fields.map((field) => (entity as any)[field]);
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const primaryKeyValue = (entity as any)[this.primaryKey];
    const update = `UPDATE ${this.tableName} SET ${setClause} WHERE ${this.primaryKey} = ?`;
    (await transaction)
      ? transaction?.query(update, primaryKeyValue)
      : await this.executeQuery(update,0, ...values, primaryKeyValue);
  }

  /**
   * Elimina un registro por su ID
   * @param id - ID del registro a eliminar
   */
  async delete(id: number) {
    await this.executeQuery(
      `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`,
      id
    );
  }

  /**
   * Busca registros por un campo específico
   * @param field - Campo por el cual buscar
   * @param value - Valor a buscar
   * @param transaction - Conexión de transacción opcional
   * @returns Registro(s) encontrado(s) o null si no hay coincidencias
   */
  async getByField(
    field: keyof T, 
    value: any,
    transaction?: PoolConnection
  ): Promise<T[] | T | null> {
    const getByfiel = `SELECT * FROM ${this.tableName} WHERE ?? = ?`;
    const [rows]: any =  (await transaction)
      ? transaction?.query(getByfiel, field, value)
      :await  this.executeQuery(getByfiel,0, field, value);
    if (!rows || rows.length === 0) {
      return null;
    }
    if (rows.length === 1) {
      return rows[0] as T;
    }

    return rows as T[];
  }
  // async selectQuery(query : string , ...params: any[]): Promise<T[] | T | null>{
  //   const getByfiel = `${query}`;
  //   const conn = await pool.getConnection();
  //   const [rows]: any = await  conn.query(getByfiel, params);
  //   if (!rows || rows.length === 0) {
  //     return null;
  //   }
  //   if (rows.length === 1) {
  //     return rows[0] as T;
  //   }

  //   return rows as T[];
  // }
  async selectQuery(query: string, ...params: any[]): Promise<T[] | T | null> {
    const conn = await pool.getConnection(); // Obtiene una conexión
    try {
      const [rows]: any = await conn.query(query, params);
      if (!rows || rows.length === 0) return null;
      return rows.length === 1 ? rows[0] as T : rows as T[];
    } catch (error) {
      console.error("Error en selectQuery:", error);
      return null;
    } finally {
      conn.release(); // Libera la conexión para que el pool no se sature
    }
  }
  

  /**
   * Ejecuta una consulta SQL con parámetros
   * @param query - Consulta SQL
   * @param params - Parámetros para la consulta
   * @returns Promise con el resultado de la consulta
   */
  public async executeQuery(
    query: string ,tipo: number = 0,
    ...params: any[]
  ): Promise<RowDataPacket[]> {
    const conn = await pool.getConnection();
      let insert = tipo == 1 ? params[0] : params;
    try {
      const [result] = await conn.query(query, insert);
      return result as RowDataPacket[];
    } finally {
      conn.release();
    }
  }
}
