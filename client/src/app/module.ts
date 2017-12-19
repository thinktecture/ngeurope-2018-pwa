import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {RootComponent} from './components/root/root';
import {DisplayTextPipe} from './pipes/displayText';
import {ROUTES} from './routes';
import {APP_SERVICES} from './services';
import {APP_COMPONENTS} from './components';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
    DisplayTextPipe
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
