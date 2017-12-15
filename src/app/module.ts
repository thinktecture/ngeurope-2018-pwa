import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HeaderComponent} from './components/header/header';
import {HomeComponent} from './components/home/home';
import {MenuComponent} from './components/menu/menu';
import {RootComponent} from './components/root/root';
import {DisplayTextPipe} from './pipes/displayText';
import {ROUTES} from './routes';
import {NotificationService} from './services/notification';
import {WindowRef} from './services/windowRef';
import {ShareService} from './services/share';

@NgModule({
    declarations: [
        RootComponent,
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        DisplayTextPipe
    ],
    imports: [
        environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, {useHash: true})
    ],
    bootstrap: [RootComponent],
    providers: [
        WindowRef,
        NotificationService,
        ShareService,
    ]
})
export class AppModule {
}
