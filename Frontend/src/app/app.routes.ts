import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Login.component';
import { AppComponent } from './app.component';
// import { HomeComponent } from './Components/Dashboard/Home/Home.component';
import { LogeoGuard} from './Utils/login.guard';
import { LoginGuard } from './Utils/logeo.guard';

export const routes: Routes = [
  {
     path: 'Login',
      component: LoginComponent, 
      canActivate:[LoginGuard] 
  },
  // { path: 'Home', component: HomeComponent, canActivate:[LogeoGuard]},
  { path: 'Dashboard', 
    canActivate:[LogeoGuard],
    loadComponent: ()=> import('./Shared/navbar/navbar.component'),

    loadChildren: ()=> import('./Components/Dashboard/routers.dashboard').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full',
  },  
];