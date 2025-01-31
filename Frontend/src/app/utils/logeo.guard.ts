import { CanActivateFn, Router } from '@angular/router';

export const LogeoGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("token_expiration");
  const router = new Router();

  if (token && expiration) {
    const now = new Date().getTime();
    const expiresIn = parseInt(expiration, 10);

    if (now > expiresIn) {
      // Token expirado, eliminar datos y redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("token_expiration");
      router.navigate(["/Login"]);
      return false;
    }
    return true; // Token válido
  }

  router.navigate(["/Login"]);
  return false;
};