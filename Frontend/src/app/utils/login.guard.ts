import {CanActivateFn, Router} from '@angular/router'
export const LogeoGuard: CanActivateFn= (route, state) =>{
    const logeo:any = localStorage.getItem('id');
    const bool = logeo == null ? false : true
    if(bool === false){
        const router: Router = new Router()
        router.navigate(["/Login"])
        return false;
    }
    return bool;
}