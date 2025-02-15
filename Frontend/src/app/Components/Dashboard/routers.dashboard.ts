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
    },{
        path: 'Formatos',
        loadComponent: ()=> import("./Formatos/Formatos.component")

    }
    
    ,{
        path: 'Formatos/Lista',
        loadComponent: ()=> import('./Formatos/lista/lista.component'),
    }
    ,{
        path: 'Formatos/Registro',
        loadComponent: ()=> import('./Formatos/Registro/Registro.component'),
    }
    ,{
        path: 'Control',
        loadComponent: ()=> import('./Control/Control.component'),
    }
    ,{
        path: 'Control/Revision',
        loadComponent: ()=> import('./Control/Revision/Revision.component'),
    }
    ,{
        path: 'Control/Areas',
        loadComponent: ()=> import('./Control/Areas/Areas.component'),
    }
    ,{
        path: 'Control/CompararFormatos',
        loadComponent: ()=> import('./Control/CompararFormatos/CompararFormatos.component'),
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