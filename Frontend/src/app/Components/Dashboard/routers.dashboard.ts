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
        path: 'Formatos',
        // loadComponent: ()=> import('./Formatos/Formatos.component'),
        loadChildren: ()=> import('./Formatos/formatos.routes').then(m => m.FORMATOS_ROUTES)
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