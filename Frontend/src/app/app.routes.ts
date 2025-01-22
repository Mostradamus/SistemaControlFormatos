import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/Home.component';
import { LoginGuard } from './Utils/logeo.guard';
import { LogeoGuard } from './Utils/login.guard';

export const routes: Routes = [
  { path: 'Login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'Home', component: HomeComponent, canActivate:[LogeoGuard]},
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full',
  },  
];