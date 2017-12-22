import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home';
import {AboutComponent} from './components/about/about';
import {FeaturesComponent} from './components/features/features.component';

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
        component: AboutComponent,
    },
    {
        path: 'features',
        component: FeaturesComponent,
    },
];
