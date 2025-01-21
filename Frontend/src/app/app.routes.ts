import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/Home.component';

export const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent},
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full',
  },  
];