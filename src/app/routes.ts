import { Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/detail/pokemonDetail';
import { StarWarsDetailComponent } from './components/detail/starWarsDetail';
import { HomeComponent } from './components/home/home';
import { PokemonListComponent } from './components/list/pokemonList';
import { StarWarsListComponent } from './components/list/starWarsList';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'starwars',
    children: [
      {
        path: 'list/:model/:page',
        component: StarWarsListComponent
      },
      {
        path: 'detail/:model/:id',
        component: StarWarsDetailComponent
      }
    ]
  },
  {
    path: 'pokemon',
    children: [
      {
        path: 'list/pokemon/:page',
        component: PokemonListComponent
      },
      {
        path: 'detail/pokemon/:id',
        component: PokemonDetailComponent
      }
    ]
  }
];
