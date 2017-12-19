import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ROUTES} from './routes';
import {APP_SERVICES} from './services';
import {APP_COMPONENTS} from './components';
import {APP_PIPES} from './pipes';
import {RootComponent} from './components/root/root';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
    ...APP_PIPES
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  bootstrap: [RootComponent],
  providers: APP_SERVICES,
})
export class AppModule {
}