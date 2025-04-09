
function CreaterowDecorator(method: "get" | "post" | "put" | "delete") {
  return function (path: string) {
    return function (target: any, propertykey: string,descriptor: PropertyDescriptor){
      if (!target.routes) target.routes = [];
      target.routes.push({ method, path, handler: target[propertykey] });
    };
  };
}

// Exportación de decoradores para cada método HTTP
export const Delete = CreaterowDecorator("delete"); // Decorador para rutas DELETE
export const Post = CreaterowDecorator("post");     // Decorador para rutas POST
export const Put = CreaterowDecorator("put");       // Decorador para rutas PUT
export const Get = CreaterowDecorator("get");       // Decorador para rutas GET
