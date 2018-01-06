import {Routes} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {DebugComponent} from './components/debug/debug.component';
import {FeaturesComponent} from './components/features/features.component';

export const INFO_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/about',
    },
    {
        path: 'about',
        component: AboutComponent,
        data: {
            title: 'About',
        },
    }, {
        path: 'debug',
        component: DebugComponent,
        data: {
            title: 'Debug',
        }
    },
    {
        path: 'features',
        component: FeaturesComponent,
        data: {
            title: 'Features',
        },
    }
];
