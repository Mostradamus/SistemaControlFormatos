import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
    {
        path:'',
        redirectTo: '/Dashboard/Home',
        pathMatch:'full'
    },
    {
        path:'Home',
        loadComponent: ()=> import('./Home/Home.component')
    }
    ,{
        path: 'Registro',
        loadComponent: ()=> import('./Registro/Registro.component')
    }
    ,{
        path: 'Detalle',
        loadComponent: ()=> import('./Detalle/Detalle.component')
    }
    ,{
        path: 'Reportes',
        loadComponent: ()=> import('./Reportes/Reportes.component')
    }
]