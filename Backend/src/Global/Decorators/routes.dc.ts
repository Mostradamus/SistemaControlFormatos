/**
 * Función factory para crear decoradores de rutas HTTP
 * @param method - Método HTTP ('get', 'post', 'put', 'delete')
 * @returns Función decoradora que registra la ruta y su manejador
 */
function CreaterowDecorator(method: "get" | "post" | "put" | "delete") {
  return function (path: string) {
    return function (
      target: any,              // Clase objetivo donde se aplica el decorador
      propertykey: string,      // Nombre del método decorado
      descriptor: PropertyDescriptor  // Descriptor de la propiedad
    ) {
      // Inicializa el array de rutas si no existe
      if (!target.routes) target.routes = [];
      
      // Registra la nueva ruta con su método, path y handler
      target.routes.push({ method, path, handler: target[propertykey] });
    };
  };
}

// Exportación de decoradores para cada método HTTP
export const Get = CreaterowDecorator("get");       // Decorador para rutas GET
export const Post = CreaterowDecorator("post");     // Decorador para rutas POST
export const Put = CreaterowDecorator("put");       // Decorador para rutas PUT
export const Delete = CreaterowDecorator("delete"); // Decorador para rutas DELETE
