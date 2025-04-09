// Importamos el pool de conexión a la base de datos desde un archivo centralizado.
// También importamos tipos específicos de la biblioteca mysql2.
import pool from "../../Core/Connection/db.cn";
import { RowDataPacket, PoolConnection } from "mysql2";

// Clase StoreProcedure que proporciona métodos para ejecutar procedimientos almacenados.
export class StoreProcedure {

  async executeStoredProcedureForGet<T extends object>(spName: string,params: any[] = [],entity?: new () => T): Promise<T | null> {
    try {
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

  async executeStoredProcedureForList<T extends object>( spName: string, tipo: number,params: any[] = [],entity?: new () => T): Promise<T[]> {
    
    const query = `CALL ${spName}(${params.map(() => "?").join(", ")})`;
    const result = await this.executeQuery(query,tipo, params);
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

  public async executeQuery( query: string,tipo: number = 0, ...params: any[] ): Promise<RowDataPacket[]> {

    const conn = await pool.getConnection();
    try {
      if(tipo == 1 || tipo == 2){
        params = params[0]
      }

      const [result]: any[] = await conn.query(query, params);
      if(tipo == 1){
        const [resT]:any[] = result;  
    
        return resT; 
      }else if(tipo == 0){
        const f = result;  // `result` ya es un arreglo
        return f as RowDataPacket[]; 
      }else{
        return result;
      }
    } finally {
      // Libera la conexión al finalizar.
      conn.release();
    }
  }
 
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
