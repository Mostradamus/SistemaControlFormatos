import {CanActivateFn, Router} from '@angular/router'
export const LoginGuard: CanActivateFn= (route, state) =>{
    const logeo = localStorage.getItem('token');
    if(logeo){
        const router: Router = new Router()
        router.navigate(["/Dashboard/Home"])
        return false;
    }
    return true
}