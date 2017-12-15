import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
];
