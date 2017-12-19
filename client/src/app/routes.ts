import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home';
import {AboutComponent} from './components/about/about';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    }
];
