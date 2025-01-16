"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
exports.PrimaryKey = PrimaryKey;
require("reflect-metadata");
/**
 * Decorador para definir el nombre de la tabla en la base de datos
 * @param name - Nombre de la tabla
 * @returns Decorador que asigna el nombre de la tabla a la clase
 */
function Table(name) {
    return function (constructor) {
        // Asigna el nombre de la tabla al prototipo de la clase
        // constructor.prototype.tableName = name;
        Reflect.defineMetadata("tableName", name, constructor);
    };
}
/**
 * Decorador para marcar una propiedad como llave primaria de la tabla
 * @returns Decorador que registra la propiedad como llave primaria
 */
function PrimaryKey() {
    return function (target, propertykey) {
        // Verifica si ya existe una llave primaria definida
        // if (!target.constructor.prototype.primarykey) {
        //   // Registra la propiedad como llave primaria
        //   target.constructor.prototype.primarykey = propertykey;
        // }
        Reflect.defineMetadata("primaryKey", propertykey, target.constructor);
    };
}
