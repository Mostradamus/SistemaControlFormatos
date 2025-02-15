// Importamos el pool de conexión a la base de datos desde un archivo centralizado.
// También importamos tipos específicos de la biblioteca mysql2.
import pool from "../../Core/Connection/db.cn";
import { RowDataPacket, PoolConnection } from "mysql2";

// Clase StoreProcedure que proporciona métodos para ejecutar procedimientos almacenados.
export class StoreProcedure {
  /**
   * Ejecuta un procedimiento almacenado que devuelve un único resultado (objeto).
   *
   * @template T - Tipo genérico para el objeto resultante.
   * @param spName - Nombre del procedimiento almacenado.
   * @param params - Parámetros para el procedimiento almacenado.
   * @param entity - (Opcional) Clase para mapear el resultado a una entidad.
   * @returns Un objeto del tipo T o null si no hay resultados.
   */
  async executeStoredProcedureForGet<T extends object>(
    spName: string,
    params: any[] = [],
    entity?: new () => T
  ): Promise<T | null> {
    try {
      console.log(params)
      // Construcción dinámica de la consulta con placeholders para los parámetros.
      const query = `CALL ${spName}(${params.map(() => "?").join(", ")})`;
      const result = await this.executeQuery(query, 1,params);
      const q = result; // Primera parte del resultado.


      // Si el resultado es válido y tiene datos.
      if (Array.isArray(result) && result.length > 0) {
        const rows = result[0]; // Obtiene las filas resultantes.
        return entity
          ? (rows.map((row: any) => this.mapToEntity(row, entity)) as T) // Mapea a la entidad si está definida.
          : (rows as T); // Retorna las filas sin mapear.
      }else{
        return q as T
      }
    } catch (error) {
      // Manejo de errores con registro en consola y lanzamiento de excepción.
      console.error(
        `Error al ejecutar el procedimiento almacenado '${spName}':`,
        error
      );
      throw new Error(
        `No se pudo obtener el resultado del procedimiento almacenado.`
      );
    }
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
  async executeStoredProcedureForList<T extends object>(
    spName: string,
    tipo: number,
    params: any[] = [],
    entity?: new () => T
  ): Promise<T[]> {
    // Construcción dinámica de la consulta.
    const query = `CALL ${spName}(${params.map(() => "?").join(", ")})`;
    console.log(query)
    const result = await this.executeQuery(query,tipo, params);
    // Si hay resultados, los mapea o los retorna directamente.
    if (Array.isArray(result) && result.length > 0) {
      let ress;
      if(tipo == 1){
        ress = result
      }else{
        ress = result[0]
      }
      const rows = ress;
      return entity
        ? (rows.map((row: any) => this.mapToEntity(row, entity)) as T[])
        : (rows as T[]);
    }else{

    }
    return []; // Retorna una lista vacía si no hay resultados.
  }

  /**
   * Método protegido para ejecutar consultas en la base de datos.
   *
   * @param query - Consulta SQL a ejecutar.
   * @param params - Parámetros para la consulta.
   * @returns Resultados de la consulta como un array de RowDataPacket.
   */
  public async executeQuery(
    query: string,tipo: number = 0,
    ...params: any[]
  ): Promise<RowDataPacket[]> {
    // Obtiene una conexión del pool.
    const conn = await pool.getConnection();
    try {
      console.log(query)
      console.log(params)
      // Ejecuta la consulta con los parámetros.
      if(tipo == 1){
        params = params[0]
      }else{

      }
      const [result]: any[] = await conn.query(query, params);
      console.log(result)
      console.log(55)
      if(tipo == 1){
        const [resT]:any[] = result;  // Suponiendo que el primer elemento de `result` es el objeto que necesitas.
        console.log(resT);
        console.log(22);
        return resT; 
      }else{
        console.log(23)

        const f = result;  // `result` ya es un arreglo
        return f as RowDataPacket[]; 
      }
    } finally {
      // Libera la conexión al finalizar.
      conn.release();
    }
  }
  

  /**
   * Mapea un objeto de fila a una instancia de una entidad específica.
   *
   * @template T - Tipo genérico de la entidad.
   * @param row - Objeto de la base de datos.
   * @param entity - Clase para crear la instancia de la entidad.
   * @returns Instancia de la entidad mapeada con los valores de la fila.
   */
  private mapToEntity<T>(row: any, entity: new () => T): T {
    const entityInstance = new entity(); // Crea una nueva instancia de la entidad.
    for (const key in entityInstance) {
      if (row.hasOwnProperty(key)) {
        entityInstance[key] = row[key]; // Asigna valores de la fila a la instancia.
      }
    }
    return entityInstance; // Retorna la instancia mapeada.
  }
}
