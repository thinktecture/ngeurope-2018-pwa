import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {FeaturesComponent} from './components/features/features.component';
import {DebugComponent} from './components/debug/debug.component';

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
    {
        path: 'debug',
        component: DebugComponent,
    }
];
