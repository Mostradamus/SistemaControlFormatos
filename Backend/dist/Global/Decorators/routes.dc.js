"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
/**
 * Función factory para crear decoradores de rutas HTTP
 * @param method - Método HTTP ('get', 'post', 'put', 'delete')
 * @returns Función decoradora que registra la ruta y su manejador
 */
function CreaterowDecorator(method) {
    return function (path) {
        return function (target, // Clase objetivo donde se aplica el decorador
        propertykey, // Nombre del método decorado
        descriptor // Descriptor de la propiedad
        ) {
            // Inicializa el array de rutas si no existe
            if (!target.routes)
                target.routes = [];
            // Registra la nueva ruta con su método, path y handler
            target.routes.push({ method, path, handler: target[propertykey] });
        };
    };
}
// Exportación de decoradores para cada método HTTP
exports.Get = CreaterowDecorator("get"); // Decorador para rutas GET
exports.Post = CreaterowDecorator("post"); // Decorador para rutas POST
exports.Put = CreaterowDecorator("put"); // Decorador para rutas PUT
exports.Delete = CreaterowDecorator("delete"); // Decorador para rutas DELETE
