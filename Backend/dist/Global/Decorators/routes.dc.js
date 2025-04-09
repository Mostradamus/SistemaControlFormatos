"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Put = exports.Post = exports.Delete = void 0;
function CreaterowDecorator(method) {
    return function (path) {
        return function (target, propertykey, descriptor) {
            if (!target.routes)
                target.routes = [];
            target.routes.push({ method, path, handler: target[propertykey] });
        };
    };
}
// Exportación de decoradores para cada método HTTP
exports.Delete = CreaterowDecorator("delete"); // Decorador para rutas DELETE
exports.Post = CreaterowDecorator("post"); // Decorador para rutas POST
exports.Put = CreaterowDecorator("put"); // Decorador para rutas PUT
exports.Get = CreaterowDecorator("get"); // Decorador para rutas GET
