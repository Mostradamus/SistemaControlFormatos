import { CanActivateFn, Router } from '@angular/router';

export const LoginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("token_expiration");
  const router = new Router();

  if (token && expiration) {
    const now = new Date().getTime();
    const expiresIn = parseInt(expiration, 10);

    if (now > expiresIn) {
      // Si el token ha expirado, permitir el acceso al login
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("token_expiration");
      return true;
    }

    // Si el token es válido, redirigir al Dashboard
    router.navigate(["/Dashboard/Home"]);
    return false;
  }

  return true; // Permitir acceso al login si no hay sesión activa
};
