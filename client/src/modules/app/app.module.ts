import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ROUTES} from './routes';
import {APP_SERVICES} from './services';
import {APP_COMPONENTS} from './components';
import {RootComponent} from './components/root/root.component';
import {APP_DIRECTIVES} from './directives';
import {environment} from '../../environments/environment';
import {SharedModule} from '../shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    declarations: [
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
    ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        RouterModule.forRoot(ROUTES, { useHash: true }),
        SharedModule.forRoot(),
    ],
    bootstrap: [RootComponent],
    providers: APP_SERVICES,
})
export class AppModule {
}
