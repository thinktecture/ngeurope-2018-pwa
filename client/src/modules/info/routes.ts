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
    }, {
        path: 'debug',
        component: DebugComponent,
    },
    {
        path: 'features',
        component: FeaturesComponent,
    }
];
