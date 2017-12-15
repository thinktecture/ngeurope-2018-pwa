import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PokemonDetailComponent} from './components/detail/pokemonDetail';
import {StarWarsDetailComponent} from './components/detail/starWarsDetail';
import {HeaderComponent} from './components/header/header';
import {HomeComponent} from './components/home/home';
import {PokemonListComponent} from './components/list/pokemonList';
import {StarWarsListComponent} from './components/list/starWarsList';
import {MenuComponent} from './components/menu/menu';
import {RootComponent} from './components/root/root';
import {DisplayTextPipe} from './pipes/displayText';
import {ROUTES} from './routes';
import {NotificationService} from './services/notification';
import {PokemonService} from './services/pokemon';
import {StarWarsService} from './services/starWars';
import {WindowRef} from './services/windowRef';
import {ShareService} from './services/share';

@NgModule({
    declarations: [
        RootComponent,
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        StarWarsListComponent,
        StarWarsDetailComponent,
        PokemonListComponent,
        PokemonDetailComponent,
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
        StarWarsService,
        PokemonService,
        NotificationService,
        ShareService,
    ]
})
export class AppModule {
}
