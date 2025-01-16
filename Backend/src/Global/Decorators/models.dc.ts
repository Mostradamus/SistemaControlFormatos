/**
 * Decorador para definir el nombre de la tabla en la base de datos
 * @param name - Nombre de la tabla
 * @returns Decorador que asigna el nombre de la tabla a la clase
 */
export function Table(name: string) {
  return function (constructor: Function) {
    // Asigna el nombre de la tabla al prototipo de la clase
    constructor.prototype.tableName = name;
  };
}

/**
 * Decorador para marcar una propiedad como llave primaria de la tabla
 * @returns Decorador que registra la propiedad como llave primaria
 */
export function PrimaryKey() {
  return function (target: any, propertykey: string) {
    // Verifica si ya existe una llave primaria definida
    if (!target.constructor.prototype.primarykey) {
      // Registra la propiedad como llave primaria
      target.constructor.prototype.primarykey = propertykey;
    }
  };
}