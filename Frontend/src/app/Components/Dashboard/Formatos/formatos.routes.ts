import { Routes } from "@angular/router";

export const FORMATOS_ROUTES: Routes = [
    {
        path:'',
        redirectTo: '/Dashboard/Formatos',
        pathMatch:'full'
    }
    ,{
        path: '',
        loadComponent: ()=> import()
    }
    ,{
        path: 'Detalle',
        loadComponent: ()=> import('./Registro/Registro.component')
    }
]