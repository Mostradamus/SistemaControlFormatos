import express from "express";

// Define los métodos HTTP permitidos
type httpMethod = "get" | "post" | "put" | "delete";

/**
 * Interface que define la estructura de una ruta
 */
interface RouteDefinition {
  method: httpMethod; // Método HTTP de la ruta
  path: string; // Path de la ruta
  handler: (rec: express.Request, res: express.Response) => void; // Manejador de la ruta
}

/**
 * Registra todas las rutas de los controladores en la aplicación Express
 * @param app - Instancia de la aplicación Express
 * @param controllers - Array de controladores a registrar
 */
export function RegisterRoutes(app: express.Express, controllers: any[]) {
  // Itera sobre cada controlador
  controllers.forEach((controller) => {
    const instace = new controller(); // Crea una instancia del controlador
    const routes: RouteDefinition[] = instace.routes || []; // Obtiene las rutas definidas

    // Registra cada ruta en la aplicación
    routes.forEach((route) => {
      // Registra la ruta con el prefijo '/api/v1' y vincula el manejador a la instancia
      app[route.method](`/api/v1${route.path}`, route.handler.bind(instace));
    });
  });
}
