import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login').then((c) => c.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./home').then((c) => c.HomeComponent),
  },
  {
    path: 'album/:id',
    loadComponent: () => import('./album').then((c) => c.AlbumComponent),
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./artist').then((c) => c.ArtistComponent),
  },
];
